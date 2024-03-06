const mongoose=require('mongoose')
const VacancySchema=new mongoose.Schema({
    title:{type:String ,required:true},
    description:{type:String ,required:true},
    requirements:{type:String},
    skillTags:{type:Array,required:true},
    experience:{type:String,required:true},
    benefits:{type:String,},
    category:{type:mongoose.Schema.Types.ObjectId,required:true,
    company:{type:mongoose.Schema.Types.ObjectId,required:true}}
});
module.exports=mongoose.model('Vacancy',VacancySchema)