const express = require('express');
const cors = require('cors');
require("dotenv").config()
const { connection } = require('./Connection/connection');
const { BookRouter } = require('./Routes/Book.Routes');
const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
res.send("Home Route")
})
app.use("/book",BookRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected To Database Succesfully");
    } catch (error) {
        console.log(error);
        console.log("Error While Connecting To The database");
    }
    console.log("Server Is Connected to port 8080");
})
