import express from "express"
import 'dotenv/config'
import statusCodes from "http-status-codes"
import userRouter from "./routes/user.routes.js"
import { errorHandler } from "./libs/errorhandler.js"
import bodyParser from "body-parser"
import { connectDB } from "./db/index.js"
const app = express()
const PORT = process.env.PORT
console.log(PORT)

app.use(bodyParser.json())
app.get('/',(req,res) =>{
    res.status(statusCodes.OK).json({message: "Welcome to my app"})
})

app.use('/api/users',userRouter);
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is runnning at port ${PORT}`)
    connectDB();
})