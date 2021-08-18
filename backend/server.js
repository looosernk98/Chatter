// import express from "express";
const express = require("express");
const  Mongoose  = require("mongoose");
// app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());

//DB config
const connection_url = 'mongodb+srv://admin:0GJ4M01jgLeUeLNs@cluster0.0cydv.mongodb.net/ChatterDB?retryWrites=true&w=majority'
Mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// api rouutes

app.get('/',(req,res)=>res.status(200).send("hello world!"))

// listen

app.listen(port, ()=>{
    console.log(`listening at localhost:${port}`)
})

//0GJ4M01jgLeUeLNs