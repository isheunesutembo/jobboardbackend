const Company=require('../models/companyModel')

module.exports={
    getCompany:async(req,res)=>{
        try{
            const company=await Company.findById(req.company.id)
            const {password,__v,createdAt,...userData}=company.__doc;
    
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
       
    },
    updateCompany:async(req,res)=>{
        try{
            const company=await Company.findByIdAndUpdate(req.company.id)
            const {password,__v,createdAt,...companyData}=company.__doc;
    
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
       
    },
    deleteUser:async(req,res)=>{
        try{
            await Company.findByIdAndDelete(req.company.id);
            res.status(200).json({status:false,message:"Company deleted successfuly"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    }
    
}