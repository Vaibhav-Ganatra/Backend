const express= require("express");
const router= express.Router();
const mongoose= require("mongoose");
const comment= require("../models/comments");
const currentTime=new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Calcutta"}));

async function addComment(req,res){
   try{
      const newComment= new comment({
         _id: new mongoose.Types.ObjectId(),
         postId:req.body.postId,
         comment:req.body.comment,
         createdAt:currentTime.toLocaleDateString()+" "+currentTime.toTimeString()
      });
      await newComment.save();
      res.status(200).json({
         success:true,
         comment:newComment
      });
   }
   catch(err){
      console.log(err)
      res.status(500).json({
         success:false,
         error:err
      });
   }
}

router.post("/add",addComment);

async function getComments(req,res){
   try{
      const {page=1,limit=2}= req.query;
      const comments=await comment.find({postId:req.params.postId}).limit(limit)
         .skip((page-1)*limit)
         .exec();
         console.log(comments);
      let count;
      await comment.countDocuments({postId:req.params.postId},(err,c)=>{
         count=c;
         res.status(200).json({
            success:true,
            comments:comments,
            totalPages:Math.ceil(count/ limit),
            currentPage:page,
         });
      });
   }
   catch(err){
      res.status(500).json({
         success:false,
         error:err
      });
   }
}

router.get("/all/:postId",getComments);
module.exports=router