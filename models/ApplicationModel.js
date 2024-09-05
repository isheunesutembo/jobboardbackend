const mongoose=require('mongoose')
const ApplicationSchema=new mongoose.Schema({
    accepted:{type:Boolean ,default:false},
    company:{type:mongoose.Schema.Types.ObjectId,required:true},
    resume:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    vacancyId:{type:mongoose.Schema.Types.ObjectId,required:true}
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