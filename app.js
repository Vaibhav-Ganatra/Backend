//Creating App
const express = require("express");
const app= express();

//Adding Middleware
const morgan= require("morgan");
app.use(morgan("dev"));

const bodyParser= require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// const multer=require("multer");
// app.use(multer({dest:"./Uploads"}).any());

//Applying routes
const addPost = require("./routes/addPost");
app.use("/api/post", addPost);
const comment= require("./routes/comments");
app.use("/api/comment",comment);

//Configuring default route
app.get("/",(req,res)=>{
   res.status(200).json({
      message:"Server running at localhost:3000"
   });
});

app.use("*", (req,res)=>{
   res.status(404).json({
      message:"Route not found"
   })
})

//Connecting to MongoDB
const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://Vaibhav_Ganatra:password987@cluster0-ddxhy.mongodb.net/InstagramClone",{
   useNewUrlParser:true,
   useUnifiedTopology:true
},
   (err) =>{
      if(err)
         console.log(err);
      else
         console.log("Connected to MongoDB");
   });

//Creating Server
const http= require("http");
const server= http.createServer(app);
server.listen(3000,(err) =>{
   if(err)
      console.log(err);
   else
      console.log("Server running on port 3000");
});

