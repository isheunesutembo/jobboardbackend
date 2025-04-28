const Application=require('../models/ApplicationModel')
const VacancyModel=require("../models/vacancyModel")

module.exports={
    createApplication:async(req,res)=>{
       
        const {vacancyId,resume,company,userId}=req.body;
        const applicationExist=await Application.findOne({vacancyId:req.body.vacancyId})
           if(applicationExist){
            return res.status(400).json({status:false,message:"you have already applied for this vacancy"})
           }
        if(!vacancyId||!resume||!company||!userId){
            res.status(400).json({status:false,message:"You have a missing field"})
        }
        try{
            const newApplication=new Application(req.body)
            await newApplication.save()
            res.status(201).json({status:true,message:"Application has been sent successfully!"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    },
    getApplicationsByVacancy:async(req,res)=>{
        const id=req.params.id;
        try{
            const applications =await (await Application.find({vacancy:id})).atpopulate({path:"company",select:"name address logo email approved "}).
            populate({path:"resume"})
            res.status(200).json(applications)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    
    getUserApplications:async(req,res)=>{
        const id=req.params.id;
        try{
            const applications =await Application.find({userId:id})
            .populate({path:"company",select:"name address logo email approved "})
            .populate({path:"resume"})
            .populate({path:"vacancy"})
          
            res.status(200).json(applications)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    getApplications:async(req,res)=>{
       
        try{
            const applications =await Application.find()
            .populate({path:"company",select:"name address logo email approved "})
            .populate({path:"resume"})
            .populate({path:"vacancy"})
           
            res.status(200).json(applications)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
  
    getCompanyApplications:async(req,res)=>{
        const id=req.params.id;
        try{
            const applications =await Application.find({company:id})
            .populate({path:"userId",select:"username email firstname lastname phone profileImage"})
            .populate({path:'resume',select:"resume"})
            res.status(200).json(applications)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    updateApplicationStatus:async(req,res)=>{
        const id=req.params.id
        try{
            const application=await Application.findByIdAndUpdate({userId:id})
            res.status(200).json(resume)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    deleteApplication:async(req,res)=>{
        const id=req.params.id
        try{
            const applications=await Resume.findByIdAndDelete({userId:id})
            res.status(200).json({message:"deleted"})
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    updateApplicationStatus:async(req,res)=>{
     const id=req.params.id
     const {status}=req.body

     if(!["Pending","Accepted","Rejected"].includes(status)){
        return res.status(400).json({status:false,message:"Invalid status"})
     }
     try{

     const application=await Application.findByIdAndUpdate(id,{status}, {new:true,runValidators:true})
     if(!application){
        return res.status(404).json({status:false,message:"Application not found"})
     }
     res.send(request)
    }catch(error){
        res.status(500).json({status:false,message:error.message});
    }
    }

}
    