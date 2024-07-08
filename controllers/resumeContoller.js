const Resume=require('../models/ResumeModel')
const upload=require('../middleware/resume.upload')

module.exports={
    createResume:async(req,res)=>{
        upload(req,res,function (error){
            if(error){
                res.status(500).json({status:false,message:error.message})
            }else{
                const path=req.file!=undefined?req.file.path.replace(/\\/g,"/"):"";
                const newResume=new Resume({
                    resume:path!=""?"/"+path:"",
                    userId:req.body.userId
                });
                const {resume}=req.body
                if(!resume){
                    res.status(400).json({status:false,message:"Please upload resume"})
                }
                try{
                    const newResume=req.body(Resume)
                    newResume.save()
                }catch(error){
                    res.status(500).json({status:false,message:error.message})
                }
            }

        })
       
    },
    getUserResume:async(req,res)=>{
        const id=req.params.id;
        try{
            const resumes =await Resume.find({userId:id})
            res.status(200).json(resumes)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    updateResume:async(req,res)=>{
        const id=req.params.id
        try{
            const resume=await Resume.findByIdAndUpdate(id)
            res.status(200).json(resume)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    deleteResume:async(req,res)=>{
        const id=req.params.id
        try{
            const resume=await Resume.findByIdAndDelete(id)
            res.status(200).json({message:"deleted"})
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    }

}