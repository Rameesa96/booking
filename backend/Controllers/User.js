const User =require('../models/user')

const CreateUser=async(req,res ,next)=>{
    const newuser=new User(req.body)
  try{
    console.log(newuser)
const saveduser=await newuser.save()
res.status(200).json(saveduser)
  }catch(err){
    next(err)
  }
}
module.exports = CreateUser

const UpdateUser=async(req,res,next)=>{

    try{
      const updateduser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})  
  
  res.status(200).json(updateduser)
    }catch(err){
      next(err)  }
  }
  

module.exports = UpdateUser




