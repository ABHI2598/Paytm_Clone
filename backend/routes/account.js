const express = require('express');
const { Account } = require('../db/schemas');
const { userAuthMiddleware } = require('../middleware/userAuthMiddleware');
const mongoose= require('mongoose');


const router  = express.Router();


router.get('/balance', userAuthMiddleware, async(req,res)=>{

    const account = await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance,
    })
});


//TRANSFER OF AMOUNT USING TRANSACTIONS IN MONGODB

router.post('/transfer',userAuthMiddleware, async(req,res) =>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to} = req.body;

    const account = await Account.findOne({userId:req.userId}).session(session);

    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({message: "Insufficient balance"});
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount)
    {
        await session.abortTransaction();
        return res.status(400).json({message: "Invalid Account"});
    }


    await Account.updateOne({userId:req.userId},{ $inc : { balance : -amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance: amount}}).session(session);

    await session.commitTransaction();
    return res.json({message: "Tranfer SuccessFull"});
});


//TRANSFER OF AMOUNT WITHOUT USING TRANSACTIONS

// router.post('/transfer', userAuthMiddleware, async(req,res)=>{
//     const {amount , to } = req.body;

//     const account = await Account.findOne({userId:req.userId});

//     if(!account || account.balance<amount)
//     {
//         return res.status(400).json({message: "Insufficient Balance"});
//     }

//     const toAccount = await Account.findOne({userId:to});

//     if(!toAccount)
//     {
//         return res.status(400).json({message:'invalid Account'});
//     }

//     await Account.updateOne({userId:req.userId}, {$inc:{balance: -amount}});
//     await Account.updateOne({userId:to}, {$inc: { balance: amount }});

//     return res.json({message: "Transfer SuccessFull"});
// });

module.exports = router;