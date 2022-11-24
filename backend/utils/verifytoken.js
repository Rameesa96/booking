const jwt =require("jsonwebtoken")
const User =require("../models/user")
 const verifyToken =(req,res,next)=>{
    const token =req.cookies.access_token
    if(!token){
        return next(err)
    }
    jwt.verify(token,"secretcode",(err,user)=>{
        if(err) return next(err);
        req.user=user
        next()
       
    })
}
module.exports=verifyToken

const verifyUser =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.Isadmin){
            next()
        }
        else{
            next(err)
        }
    })
}
module.exports=verifyUser

const verifyAdmin =(req,res,next)=>{
    verifyToken(req,res,next ,()=>{
        if(req.user.Isadmin){
            next()
        }
        else{
            next(err)
        }
    })
}
module.exports=verifyAdmin