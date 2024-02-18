const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')
const { secret } = require('../Contollers/usercontroller')
const requireAuth = async (req,res,next)=>
{
    console.log(req.headers)   
    const {Authorization}=req.headers
    
    if(!Authorization)
    {
        return res.status(401).json({error:"Authorization token required"})
    }

    const token = Authorization.split(' ')[1]
   
    try{

        const {_id} = jwt.verify(token,"fjsghjsdbdgfagilglajblgadferwsz")
        req.user = await  User.findOne({_id: _id}).select('_id')
        next()
    }catch(error)
    {
        console.log(error)
        res.status(401).json({error:"Request is not authorized"})
        
    }
}
module.exports =requireAuth

