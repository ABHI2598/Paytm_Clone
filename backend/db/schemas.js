const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://pandeyabhinav56:Abhi%40202598@cluster0.lvamc5t.mongodb.net/paytm');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        minLength: 4,
        maxLength: 40,
        unique: true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    firstName:{
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    },
    lastName:{
        type:String,
        required: true,
        maxLength:50,
        trim: true,
    }
});


const AccountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    balance:{
        type: Number,
        required:true,
    }
})

const User = mongoose.model('users', UserSchema);
const Account  = mongoose.model('accounts', AccountSchema);

module.exports={
    User,
    Account
};