const mongoose= require("mongoose");

const commentSchema= mongoose.Schema({
   postId:{
      type:mongoose.SchemaTypes.ObjectId,
      required:true
   },
   comment:{
      type:String,
      required:true
   },
   createdAt:{
      type:String,
      required:true
   }
});
module.exports= mongoose.model("Comment",commentSchema,"Comments");