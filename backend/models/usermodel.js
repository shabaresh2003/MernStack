const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const Schema =  mongoose.Schema
var validator = require('validator');
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password :{
        type:String,
        required:true
    }
})

userSchema.statics.signup = async function(email,password)
{
    if(!email || !password)
    {
        throw Error("All fields must be filled");
    }
    if(!validator.isEmail(email))
    {
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password))
    {
        throw Error("Password is not strong enough")
    }
    const exists = await  this.findOne({email:email})
     if(exists) throw Error("User already exists")
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({email,password:hash})
    return user;
}



userSchema.statics.login = async function(email,password)
{
    if(!email || !password)
    {
        throw Error("All fields must be filled");
    }
    const user = await  this.findOne({email:email})
     if(!user)
     {
        throw Error("Incorrect email");
     }
     const match = await bcrypt.compare(password,user.password)
     if(!match)
     {
        throw Error("Incorrect password")
     }
     return user
     
    

}

module.exports= mongoose.model('User',userSchema)