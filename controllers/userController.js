const User=require('../models/UseModel')

module.exports={
    getUser:async(req,res)=>{
        try{
            const user=await User.findById(req.user.id)
            const {password,__v,createdAt,...userData}=user.__doc;
    
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
       
    },
    updateUser:async(req,res)=>{
        try{
            const user=await User.findByIdAndUpdate(req.user.id)
            const {password,__v,createdAt,...userData}=user.__doc;
    
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
       
    },
    deleteUser:async(req,res)=>{
        try{
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json({status:false,message:"User deleted successfuly"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    }
    
}