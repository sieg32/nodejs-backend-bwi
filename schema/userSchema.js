const mongoose = require('mongoose')

const schema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        validate:function(){
           return this.phone.length === 10
        },
   
    },
    email:{
        type:String,
        required:true,
        validate:function (){
            return /\S+@\S+\.\S+/.test(this.email);
        }
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profileImg:{name:String,
        file:{

            type:Buffer,
            required:true
        }
    }
    ,
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('userModel', schema);