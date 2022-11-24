const Hotel =require("../models/home")

const Createhotel=async(req,res ,next)=>{
    const newhotel=new Hotel(req.body)
  try{
    console.log(newhotel)
const savedhotel=await newhotel.save()
res.status(200).json(savedhotel)
  }catch(err){
    next(err)
  }
}
module.exports = Createhotel 

const Updatehotel=async(req,res,next)=>{

    try{
      const updatedhotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})  
  
  res.status(200).json(updatedhotel)
    }catch(err){
      next(err)  }
  }

module.exports = Updatehotel





 