const express =require ('express')
const app = express()
const mongoose =require('mongoose')
const homerouter = require('./router/home')
const authrouter = require('./router/auth')
const userrouter = require('./router/user')
const roomrouter = require('./router/room')
const bodyparser =require('body-parser')
const cookieparser=require('cookie-parser')
const cors =require('cors')
mongoose.connect('mongodb+srv://admin1:admin1@booking.0b6kdlg.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on("connected" ,()=>{
    console.log("mongodb connectd")
})

mongoose.connection.on("error" ,()=>{
    console.log("mongodb error")
})
 app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser())
app.use(express.json());
app.use('/home', homerouter)
app.use('/auth', authrouter)

app.use('/user', userrouter)

app.use('/room', roomrouter)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage= err.message || "something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})
app.listen(8000,()=>{
    console.log("server started")
})