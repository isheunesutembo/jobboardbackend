const Application=require('../models/ApplicationModel')


module.exports={

    getUserApplications:async(req,res)=>{
        const id=req.params.id;
        try{
            const applications =await Application.find({userId:id})
            res.status(200).json(applications)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    getCompanyApplications:async(req,res)=>{
        const id=req.params.id;
        try{
            const applications =await Application.find({company:id})
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
    }

}
    