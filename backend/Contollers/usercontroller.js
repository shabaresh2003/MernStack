const User = require('../models/usermodel')
const jwt = require("jsonwebtoken")
require('dotenv').config();

const createToken = (_id)=>
{
    return jwt.sign({_id},"fjsghjsdbdgfagilglajblgadferwsz",{expiresIn:'3d'})
}

const loginuser = async (req,res)=>
{
    const {email,password} = req.body;
    console.log("inside login")
    try
    {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.status(200)
        res.json({email,token})
        
    }

    catch(error){
        console.log("inside error")
        console.log(error);
        res.status(400);
        res.json({error : error.message});
    }
}
const signupuser = async (req,res)=>
{

    try
    {
        const {email,password}=req.body
        const user = await User.signup(email, password);
        console.log("user created")
        const token = createToken(user._id);
        res.status(200);
        res.json({email,token})
        
    }
    catch(error){
        console.log(error);
        res.status(400);
        res.json({error : error.message});
    }
    
}



module.exports={signupuser ,loginuser}