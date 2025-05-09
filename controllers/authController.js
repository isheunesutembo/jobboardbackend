const User=require('../models/UseModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const RefreshTokenModel = require('../models/RefreshTokenModel')


module.exports={
    createUser:async(req,res)=>{
        const emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(!emailRegEx.test(req.body.email)){ 
            return res.status(400).json({status:false,message:'Email is not valid'})

        }
            
        const minPasswordLength=8;
        if(req.body.password<minPasswordLength){
            return res.status(400).json({status:false,message:"Password should be at least"+minPasswordLength+"characters long"})
        }
        try{
            const emailExist=await User.findOne({email:req.body.email})
            if(emailExist){
                return res.status(400).json({status:false,message:"Email already exists"})
            }
            const encryptedPassword=await bcrypt.hash(req.body.password,10)
            const newUser=User({username:req.body.username,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                userType:"User", 
                password:encryptedPassword
            })
            await newUser.save()
            res.status(201).json({status:true,message:"New user created successfully"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }

       
    },
    logInUser:async(req,res)=>{
        
        const emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegEx.test(req.body.email)){
            return res.status(400).json({status:false,message:'Email is not valid'})

        }
            
        const minPasswordLength=8;
        if(req.body.password<minPasswordLength){
            return res.status(400).json({status:false,message:'Password should be at least'+minPasswordLength+'characters long'}) 
        }

        try{ 
            const user=await User.findOne({email:req.body.email})
            if(!user){
                return res.status(400).json({status:false,message:"User not found"})
            }
            if(user&&(await bcrypt.compare(req.body.password,user.password))){
                const userToken=jwt.sign({
                    id:user._id,
                    userType:user.userType ,
                    email:user.email, 
                },
                process.env.JWT_SECRET,{expiresIn:"30d"})
                const refreshToken=jwt.sign({
                    id:user._id,
                    userType:user.userType ,
                    email:user.email, 
                },
                process.env.REFRESH_KEY,{expiresIn:"90d"})
                 await RefreshTokenModel.create({token:refreshToken,userId:user._id})
                const{password,otp,...others}=user._doc;  
                res.status(201).json({...others,userToken,refreshToken})
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
    logout:async(req,res)=>{
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required' });
      
        try {
          await RefreshTokenModel.deleteOne({ token: refreshToken });
          res.json({ message: 'Logged out successfully' });
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
    }
}
