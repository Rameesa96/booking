const express =require("express");
const Login = require("../Controllers/auth");
const Register = require("../Controllers/auth");
const router =express.Router();
const User =require('../models/user')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post("/register", async(req,res,next)=>{
    try{
       
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
        const newuser=new User({
            username:req.body.username,
           email:req.body.email,
           password:hash
        })
        const usernew = await newuser.save()
        res.status(200).json(usernew)
        
    }catch(err){
    next(err)
    console.log(err)
    }
    })
router.post("/login",async(req,res,next)=>{
    try{
       
    const user = await User.findOne({username:req.body.username})
      if(!user){
        next(err)
      }  
    const ispassword= bcrypt.compareSync(req.body.password,user.password);
        if(!ispassword){
            next(err)
          }  
          const{password,Isadmin,...Otherdetails}=user

        const token =jwt.sign({id:user._id,Isadmin:user.Isadmin},"secretcode")
          res.cookie("access_token",token,{
            httpOnly :true}).status(200).json(Otherdetails)
    }catch(err){
    next(err)
    }
    })



module.exports = router