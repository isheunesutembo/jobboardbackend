const mongoose=require('mongoose')
const ResumeSchema=new mongoose.Schema({
    resume:{type:String ,},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true}
},{timestamps:true});
module.exports=mongoose.model('Resume',ResumeSchema)