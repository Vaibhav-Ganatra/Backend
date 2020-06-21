//Creating App
const express = require("express");
const app= express();

//Adding Middleware
const morgan= require("morgan");
app.use(morgan("dev"));

const bodyParser= require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const dotenv= require("dotenv");
dotenv.config();

//Applying routes
const addPost = require("./routes/addPost");
app.use("/api/post", addPost);
const comment= require("./routes/comments");
app.use("/api/comment",comment);

//Configuring default route
app.get("/",(req,res)=>{
   res.status(200).json({
      message:"Server running"
   });
});

app.use("*", (req,res)=>{
   res.status(404).json({
      message:"Route not found"
   })
})

//Connecting to MongoDB
const mongoose= require("mongoose");
mongoose.connect(process.env.MONGO_URL,{
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
const port= process.env.PORT||3000;
server.listen(port,(err) =>{
   if(err)
      console.log(err);
   else
      console.log(`Server running on port:{port}`);
});

