const mongoose= require("mongoose");

const postSchema= mongoose.Schema({
   _id:mongoose.SchemaTypes.ObjectId,
   caption:{
      type:String,
      required:true
   },
   imageUrls:{
      type:Array,
      required:true
   }
});

module.exports= mongoose.model("Post",postSchema,"Posts");

