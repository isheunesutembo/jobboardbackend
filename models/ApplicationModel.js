const mongoose=require('mongoose')
const ApplicationSchema=new mongoose.Schema({
    accepted:{type:Boolean ,default:false},
    company:{type:mongoose.Schema.Types.ObjectId,required:true},
    resume:{type:mongoose.Schema.Types.ObjectId,required:true}

},{timestamps:true});
module.exports=mongoose.model('Application',ApplicationSchema)