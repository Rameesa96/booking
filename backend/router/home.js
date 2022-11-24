const express =require("express");
const Deletehotel = require("../Controllers/home");
const Updatehotel = require("../Controllers/home");
const Createhotel = require("../Controllers/home");
const Getallhotel = require("../Controllers/home");
const Geteachhotel = require("../Controllers/home");
const Hotel =require("../models/home")
const router =express.Router();
const verifyAdmin = require('../utils/verifytoken')


router.post("/",async(req,res ,next)=>{
  const newhotel=new Hotel(req.body)
try{
  console.log(newhotel)
const savedhotel=await newhotel.save()
res.status(200).json(savedhotel)
}catch(err){
  next(err)
}
})

router.put("/:id",verifyAdmin,Updatehotel)

router.delete("/:id",async(req,res,next)=>{

  try{
await Hotel.findByIdAndDelete(req.params.id)  

res.status(200).json("deleted")
  }catch(err){
    next(err)
  }}
)

  router.get("/", async(req,res,next)=>{
const {featured}=req.query
    try{
  const hotels= await Hotel.find({featured}).limit(req.query.limit)
  
  res.status(200).json(hotels)
    }catch(err){
      next(err)
    }
  })
  router.get("/gethotels", async(req,res,next)=>{
    
        try{
      const hotels= await Hotel.find()
      
      res.status(200).json(hotels)
        }catch(err){
          next(err)
        }
      })

  router.get("/city", async(req,res,next)=>{
    const {city}=req.query
        try{
      const hotels= await Hotel.find({city}).limit(req.query.limit)
      
      res.status(200).json(hotels)
        }catch(err){
          next(err)
        }
      })

  router.get("/find/:id",async(req,res, next)=>{

    try{
  const hotel= await Hotel.findById(req.params.id)  
  
  res.status(200).json(hotel)
    }catch(err){
next(err)
    }
  })



router.get("/countbyid", async(req,res,next)=>{
const cities = req.query.cities.split(",")
  try{
const list= await Promise.all(cities.map(city=>{
return Hotel.countDocuments({city:city})})) 

res.status(200).json(list)
  }catch(err){
    next(err)
  }
})
router.get("/countbytype", async(req,res,next)=>{
  
    try{
  const hotelcount= await  Hotel.countDocuments({type:"hotel"})
  const apartmentcount= await  Hotel.countDocuments({type:"apartment"})
  const villascount= await  Hotel.countDocuments({type:"villa"})
  const resortcount= await  Hotel.countDocuments({type:"resort"})
  const cabincount= await  Hotel.countDocuments({type:""})
  
  res.status(200).json([{type:"hotel",count:hotelcount},
  {type:"villas",count:villascount},
  {type:"apartment",count:apartmentcount},
  {type:"resort",count:resortcount},
  {type:"cabin",count:cabincount}])
    }catch(err){
      next(err)
    }
  })

module.exports = router