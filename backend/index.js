const express = require("express");

const app=express(); 
app.use(express.json()); 
const cors=require("cors"); 
const { router } = require("./routes");

app.use(cors()); 
app.use("/api/v1/",router); 
 

app.listen(3000); 