const express =require("express")
const router =express.Router();


const verifyAdmin = require("../utils/verifytoken");
const verifyUser = require("../utils/verifytoken")
const Room =require("../models/rooms")
const Hotel =require("../models/home");

router.post("/:hotelid",async (req,res,next)=>{
    const hotelId=req.params.hotelid
    const newroom = new Room(req.body)
 
  
    try{
       
        const savedroom = await newroom.save()
    
        try{
await Hotel.findByIdAndUpdate(hotelId,{$push :{rooms:savedroom._id}})
        }
        catch(err){
next(err)
        }
res.status(200).json(savedroom)
    }
catch(err){
    next(err)
}
})

router.put("/:id",verifyAdmin,async (req,res,next)=>{
    const roomid=req.params.id;
    try{
        const updateroom= await Room.findByIdAndUpdate(roomid,{$set:req.body},{new:true})
        res.status(200).json(updateroom)
        }
        catch(err){
            next(err)
        }
    

}) 

router.delete("/:id",verifyAdmin,async(req,res,next)=>{
    const deleteid =req.params.id
    try{
await Room.findByIdAndDelete(deleteid)
res.status(200).send("deleted")
    }
    catch(err){
next(err)
    }
})

  router.get("/", async(req,res,next)=>{

    try{
  const rooms= await Room.find()  
  
  res.status(200).json(rooms)
    }catch(err){
      next(err)
    }
  })

  router.get("/:id",async(req,res,next)=>{
    try{
const room = Room.findById(req.params.id)
res.status(200).json(room)
    }
    catch(err){
next(err)
    }
})


router.get("/getrooms/:id", async(req,res,next)=>{
   
    try{
        const hotels= await Hotel.findById(req.params.id)  
  
        

        const list = await Promise.all(hotels.rooms.map((room)=>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }
    catch(err){
next(err)
    }
})
  module.exports = router