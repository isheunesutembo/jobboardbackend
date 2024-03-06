const Company=require('../models/companyModel')

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
            const emailExist=await User.findOne({email:req.body.email})
            if(emailExist){
                return res.status(400).json({status:false,message:"Email already exists"})
            }
            const newCompany=Company({name:req.body.name,
                address:req.body.address,
                phoneNumber:req.body.phoneNumber,
                email:req.body.email,
                userType:"Company",
                password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
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
            const company=Company.findOne({email:req.body.email})
            if(!company){
                return res.status(400).json({status:false,message:"User not found"})
            }
            const decryptedPassword=CryptoJs.AES.decrypt(company.password,process.env.SECRET_KEY)
            const dePassword=decryptedPassword.toString(CryptoJs.enc.Utf8)

            if(dePassword!==req.body.password){
                return res.status(400).json({status:false,message:"Wrong password"})
            }
            const companyToken=jwt.sign({
                id:company._id,
                userType:company.userType,
                email:company.email
            },
            process.env.JWT_SECRET,{expiresIn:"30d"})
            const{password,otp,...others}=company.doc;
            res.status(200).json({...others,companyToken})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }

    }
    
}