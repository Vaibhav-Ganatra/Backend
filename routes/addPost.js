const express=require("express");
const router= express.Router();
const formidable = require("formidable");
const mongoose=require("mongoose");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
   cloud_name:"dqkm1ywmb",
   api_key:"273258214592328",
   api_secret:"XOOJRIKZvtEThwzbN9MxfHs7aNU"
});

const post= require("../models/posts"); 
router.post("/add",async (req,res) =>{
   let urls=[];
   let caption;
   const form = new formidable({multiples:true});
   form.parse(req, (err, fields, files) => {
      if(!(fields.caption && files.image1 && files.image2)){
         res.status(400).json({
            success:false,
            message:"2 images and a caption is mandatory"
         });
      }
      else{
      caption=fields.caption;
      cloudinary.uploader.upload(files.image1.path,{
         public_id:newMongoId(),
         folder:"Posts"
      },(error,result)=> {
         if(err){
            res.status(500).json({
               success:false
               ,error:err
            });
         }
         else{
            console.log(result);
            urls.push(result.secure_url);
            cloudinary.uploader.upload(files.image2.path,{
               public_id:newMongoId(),
               folder:"Posts"
            }, async (error,result)=> {
               if(err){
                  res.status(500).json({
                     success:false
                     ,error:err
                  });
               }
               else{
                  console.log(result);
                  urls.push(result.secure_url);
                  console.log(req.body.caption);
                  try{
                  const doc=new post({
                     _id:new mongoose.Types.ObjectId(),
                     imageUrls:urls,
                     caption:caption
                  }) ;
                  await doc.save();  
                  res.status(200).json({
                     success:true,
                     post:doc
                  });
               }
               catch(err){
                  res.status(500).json({
                     success:false,
                     error:err
                  });
               }
               }
            });
         }
      });
   }
   });
});

module.exports = router;

function newMongoId(){
   return new mongoose.Types.ObjectId();
}

router.get("/all",paginatedViews);

async function paginatedViews(req,res){
   try{

      const {page=1,limit=2}= req.query;
      const posts= await post.find().select("-__v").limit(limit)
         .skip((page-1)*limit)
         .exec();
      let count;
      await post.countDocuments({},(err,c)=>{
         count=c;
         res.status(200).json({
            success:true,
            posts:posts,
            totalPages:Math.ceil(count/ limit),
            currentPage:page,
         });
      });
   }
   catch(err){
      console.log(err);
      res.status(500).json({
         success:false,
         error:err
      });
   }
}