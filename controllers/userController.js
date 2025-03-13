const User=require('../models/UseModel')
const upload=require('../middleware/profile.upload')
module.exports={
    getUser:async(req,res)=>{
        try{
            const id=req.params.id;
            const user=await User.findById(id)
           
            const {password,__v,createdAt,...userData}=user._doc;
            res.status(200).json({...userData})
    
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
       
    },
    updateUser:async(req,res)=>{
        const {username,firstName,lastName}=req.body
        const id=req.params.id
        upload(req,res,async function(error){
            if(error){
                res.status(500).json({status:false,message:error.message})
            }else{
               
                const path=req.file!=undefined?req.file.path.replace(/\\/g,"/"):"";
                const user=User({username:username,firstName:firstName,lastName:lastName,profileImage:path})
                
                try{
                    const updatedUser=await user.findByIdAndUpdate(id,user,{new:true})
                    res.status(201).json({status:true,message:"User updated successfully"})
                }catch(error){
                    res.status(500).json({status:false,message:error.message})
                }
            }
        })
       
    },
    deleteUser:async(req,res)=>{
        try{
            const id=req.params.id;
            await User.findByIdAndDelete(id);
            res.status(200).json({status:false,message:"User deleted successfuly"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    }
    
}