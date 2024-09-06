const mongoose=require('mongoose')
const VacancySchema=new mongoose.Schema({
    title:{type:String ,required:true},
    description:{type:String ,required:true},
    requirements:{type:String},
    skillTags:{type:Array,required:true},
    experience:{type:String,required:true},
    salary:{type:String,required:true},
    benefits:{type:String,},
    category:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Category"},
    company:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Company"}
},{
    toJSON:{
        transform:function (doc,ret){
            ret.vacancyId=ret._id.toString();
            delete ret._id;
            delete ret.__v;
        }
    }
});
VacancySchema.indexes({title:"text",description:"text",requirements:"text",skillTags:"text"})
module.exports=mongoose.model('Vacancy',VacancySchema)