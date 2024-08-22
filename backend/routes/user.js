const express = require('express');
const zod = require('zod');
const {User, Account} = require('../db/schemas');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { userAuthMiddleware } = require('../middleware/userAuthMiddleware');


const router = express.Router();

function validateInputs(obj)
{
    const schema = zod.object({
        username: zod.string().email(),
        password: zod.string().min(6),
        firstName : zod.string(),
        lastName: zod.string(),
    });
    return schema.safeParse(obj);
}

const siginBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});


//SIGNUP REQUEST 
router.post('/signup', async(req,res) =>{
    const response = validateInputs(req.body);
     
    if(!response.success)
    {
        return res.status(411).json({msg: response.error.issues[0].message})
    }
     
    const isUserExists = await User.findOne({username:req.body.username})
    if(isUserExists)
    {
        return res.status(411).json({msg: 'Email already taken'});
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    });

    const userId = user._id;


    await Account.create({
        userId: userId,
        balance: 1 + Math.random()*10000,
    })
    const token = jwt.sign({userId: userId}, JWT_SECRET);
    return res.json({
        msg: 'User created SuccessFully',
        token: token
    });
});

//SIGN IN REQUEST
router.post('/signin', async (req,res) => {
    const {success} = siginBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: "Incorrect inputs"})
    }

    const isUserExists = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if(isUserExists)
    {
        const token = jwt.sign({userId: isUserExists._id}, JWT_SECRET);
        res.json({
            token: token,
        })
        return;
    }

    res.status(411).json({
        msg: 'Error while logging in',
    })


});


//UPDATE USER REQUEST 

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", userAuthMiddleware,async (req,res,next) =>{
    const {success} = updateBody.safeParse(req.body);

    if(!success)
    {
        res.status(411).json({"message" :  "Error while updating information"});
    }

    await User.updateOne({_id:req.userId}, req.body);

    res.json({
        "message": "Updated SuccessFully",
    })

});


//BULK FETCHING OF USER

router.get("/bulk", async (req,res)=>{

    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex": filter,
            }
        },{
            lastName:{
                "$regex": filter,
            }
        }]
    });


    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });

 
})

module.exports = router;