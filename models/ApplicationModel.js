const mongoose=require('mongoose')
const ApplicationSchema=new mongoose.Schema({
    status:{type:String ,default:"Pending",enum:["Pending", "Accepted","Rejected"]},
    company:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Company"},
    resume:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Resume"},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
    vacancy:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Vacancy"}
},{timestamps:true},
{
    toJSON:{
        transform:function (doc,ret){
            ret.applicationId=ret._id.toString();
            delete ret._id;
            delete ret._v;
        }
    }
});
module.exports=mongoose.model('Application',ApplicationSchema)