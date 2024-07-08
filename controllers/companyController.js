const Company=require('../models/companyModel')

module.exports={
    getCompany:async(req,res)=>{
        try{
            const id=req.params.id;
            const company=await Company.findById(id)
            const {password,__v,createdAt,...companyData}=company._doc;
            res.status(200).json({...companyData})
    
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
       
    },
    updateCompany:async(req,res)=>{
        try{
            const id=req.params.id;
            const company=await Company.findByIdAndUpdate(id)
            const {password,_v,createdAt,...companyData}=company._doc;
            res.status(200).json({status:true,message:"Company data updated successfully"})
    
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
       
    },
    deleteUser:async(req,res)=>{
        try{
            const id=req.params.id;
            await Company.findByIdAndDelete(id);
            res.status(200).json({status:false,message:"Company deleted successfuly"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    }
    
}