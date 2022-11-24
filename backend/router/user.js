const express =require("express");

const router =express.Router();
const DeleteUser = require("../Controllers/User");
const UpdateUser = require("../Controllers/User");
const CreateUser = require("../Controllers/User");
const GetallUser = require("../Controllers/User");
const GeteachUser = require("../Controllers/User");
const verifyAdmin = require("../utils/verifytoken");
const verifyUser = require("../utils/verifytoken");
const verifyToken  = require("../utils/verifytoken");
const User = require("../models/user")

 
router.post("/",verifyUser,CreateUser)

router.put("/:id",verifyUser,UpdateUser) 

router.delete("/:id",async(req,res,next)=>{

  try{
await User.findByIdAndDelete(req.params.id)  

res.status(200).json("deleted")
  }catch(err){
    next(err)
  }}
)

  router.get("/",async(req,res,next)=>{

    try{
  const users= await User.find()  
  
  res.status(200).json(users)
    }catch(err){
      next(err)
    }
  } )

  router.get("/:id",verifyUser,async(req,res, next)=>{

    try{
  const user= await User.findById(req.params.id)  
  
  res.status(200).json(user)
    }catch(err){
next(err)
    }
  })

//  router.get("/checkauthentication",verifyToken,(req,res,err)=>{
//   res.send("user logged in")
//  })

//  router.get("/checkuser/:id",verifyUser,(req,res,err)=>{
//   res.send("user logged in and can delrete accond")
//  })

//  router.get("/checkadmin/:id",verifyAdmin,(req,res,err)=>{
//   res.send("hello admin  logged in and can delrete  all accond")
//  })
  module.exports = router 