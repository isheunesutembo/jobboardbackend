const Company=require('../models/companyModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const RefreshTokenModel = require('../models/RefreshTokenModel')

module.exports={
    createCompany:async(req,res)=>{
        const emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegEx.test(req.body.email)){
            return res.status(400).json({status:false,message:'Email is not valid'})

        }
        const minPasswordLength=8;
        if(req.body.password<minPasswordLength){
            return res.status(400).json({status:false,message:"Password should be at least"+minPasswordLength+"characters long"})
        }
        try{
            const emailExist=await Company.findOne({email:req.body.email})
            if(emailExist){
                return res.status(400).json({status:false,message:"Email already exists"})
            }
            const encryptedPassword=await bcrypt.hash(req.body.password,10)
            const newCompany=Company({
                name:req.body.name,
                address:req.body.address,
                phoneNumber:req.body.phoneNumber,
                email:req.body.email,
                userType:"HiringCompany",
                password:encryptedPassword
            })
            await newCompany.save()
            res.status(200).json({status:true,message:"New company created successfully"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }

       
    },
    logInCompany:async(req,res)=>{
        const emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegEx.test(req.body.email)){
            return res.status(400).json({status:false,message:'Email is not valid'})

        }
        const minPasswordLength=8;
        if(req.body.password<minPasswordLength){
            return res.status(400).json({status:false,message:'Password should be at least'+minPasswordLength+'characters long'}) 
        }

        try{
            const company=await Company.findOne({email:req.body.email})
            if(!company){
                return res.status(400).json({status:false,message:"User not found"})
            }
            if(company&&(await bcrypt.compare(req.body.password,company.password))){
                const accessToken=jwt.sign({
                    id:company._id,
                    userType:company.userType,
                    email:company.email
                },
                
                process.env.JWT_SECRET,{expiresIn:"30d"})
                const{password,otp,...others}=company._doc;
                 const refreshToken=jwt.sign({
                                    id:company._id,
                                    userType:company.userType ,
                                    email:company.email, 
                                },
                                process.env.REFRESH_KEY,{expiresIn:"90d"})
                                 await RefreshTokenModel.create({token:refreshToken,userId:company._id})
                res.status(200).json({...others,accessToken,refreshToken})
            }
           
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }

    },
       refreshToken:async(req,res)=>{
            const {refreshToken}=req.body;
            if(!refreshToken)return res.status(401).json({message:"Refresh token is required"})
                try{
            const decoded=jwt.verify(refreshToken,process.env.REFRESH_KEY)
            const sharedToken=await RefreshTokenModel.findOne({token:refreshToken,userId:decoded.id})
             if(!sharedToken)return res.status(403).json({message:"Invalid refresh token"})
             const userToken=jwt.sign({id:decoded.id},process.env.REFRESH_KEY,
            {expiresIn:"30d"})
            res.status(200).json({userToken})
        
            }catch(error){
                res.status(403).json({ error: 'Invalid refresh token' });
            }
            },
    
}