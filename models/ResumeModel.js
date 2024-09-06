const mongoose=require('mongoose')
const ResumeSchema=new mongoose.Schema({
    resume:{type:String ,},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
   
},{timestamps:true},{
    toJSON:{
        transform:function (doc,ret){
            ret.resumeId=ret._id.toString();
            delete ret._id;
            delete ret._v;
        }
    }
});
module.exports=mongoose.model('Resume',ResumeSchema)