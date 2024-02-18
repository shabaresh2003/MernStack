const express = require("express");
const router = express.Router();
const { signupuser,loginuser } =require( "../Contollers/usercontroller");


//Login Router 
router.post('/login',loginuser);

//Signup Router 
router.post('/signup',signupuser);


module.exports = router