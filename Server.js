import express from  'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import connectdb from './config/db.js'
 import authRoute from './routes/authRoute.js'
 import catagoryRoutes from './routes/catagoryRoutes.js'
 import productRoutes from './routes/productRoutes.js'
import path from "path"


import cors from 'cors'
 // configer env
dotenv.config()

// database config
connectdb()

// rest object
const app=express()

// middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,"./client/dist")))

//routes
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",catagoryRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/payment",productRoutes)

// rest api
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'.client/dist/index.html'))
})

// PORT
const PORT=process.env.PORT||8080

app.listen(PORT,()=>{
    console.log(`server running on localhost:${PORT}`)
})
