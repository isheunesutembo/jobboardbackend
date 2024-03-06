const mongoose=require('mongoose')
const CompanySchema=new mongoose.Schema({
    name:{type:String ,required:true},
    address:{type:String ,required:true},
    logo:{type:String},
    phoneNumber:{type:String,required:true},
    siteLink:{type:String,},
    email:{type:String,required:true,unique:true},
    approved:{type:Boolean,default:false},
    password:{type:String,required:true},
    userType:{type:String,required:true,default:'HiringCompany',enum:['User','Admin','HiringCompany']},
},{timestamps:true});
module.exports=mongoose.model('Company',CompanySchema)