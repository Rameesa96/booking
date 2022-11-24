const mongoose = require ('mongoose')
const Usermodel =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
  
  Isadmin:{
        type:Boolean,
      default:false
    }
},{timestamps:true})

module.exports=mongoose.model("User",Usermodel)