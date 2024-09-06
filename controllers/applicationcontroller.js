const Application=require('../models/ApplicationModel')


module.exports={
    createApplication:async(req,res)=>{
        upload(req,res,function (error){
           
              
                const newApplication=new Application({
                    resume:req.body.resume,
                    userId:req.body.userId,
                    company:req.body.company,
                    vacancyId:req.body.vacancyId
                });
                const {application}=req.body
                if(!application){
                    res.status(400).json({status:false,message:"Provide application"})
                }
                try{
                  
                    newApplication.save()
                }catch(error){
                    res.status(500).json({status:false,message:error.message})
                }
          

        })
       
    },
    getApplicationsByVacancy:async(req,res)=>{
        const id=req.params.id;
        try{
            const applications =await Application.find({vacancyId:id})
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
            .populate({path:"vacancy",select:"title description requirements skillTags experience salary benefits"})
            res.status(200).json(applications)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    getCompanyApplications:async(req,res)=>{
        const id=req.params.id;
        try{
            const applications =await Application.find({company:id})
            .populate({path:"user",select:"username email firstname lastname phone profileImage"})
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
    }

}
    