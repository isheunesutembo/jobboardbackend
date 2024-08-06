const jwt =require('jsonwebtoken')

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
   
    if(authHeader){
        const token=authHeader && authHeader.split(' ')[1]
        jwt.verify(token,process.env.JWT_SECRET),async(err,user)=>{
            if(err){
                res.status(403).json({status:false,message:"Invalid Token"})
            }
            req.user=user
            next();
        }
    }else{
        res.status(401).json({status:false,message:"You are not authenticated"})
    }
  

}
const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(' ')[1]
        jwt.verify(token,process.env.JWT_SECRET),async(err,user)=>{
            if(err){
                res.status(403).json({status:false,message:"Invalid Token"})
            }
            req.user=user
            next();
        }
    }else{
        res.status(401).json({status:false,message:"You are not authenticated"})
    }

};
const verifyTokenAndAuthorization=(req,res,next)=>{
   
    authenticateToken(req,res,()=>{
        if(req.user.userType==="User"
        ||req.user.userType==="Admin"
        ||req.user.userType==="HiringCompany"){
            next()
        }else{
            return res.status(403).json({status:false,message:"You are not allowed to access the routes"});
        }
    })
}

const verifyHiringCompany=(req,res,next)=>{
    if(
    req.user.userType==="Admin"
    ||req.user.userType==="HiringCompany"){
        next()
    }else{
        return res.status(403).json({status:false,message:"You are not allowed to access the routes"});
    }

}
const verifyAdmin=(req,res,next)=>{
    if(req.user.userType==="Admin"){
            next()
        }else{
            return res.status(403).json({status:false,message:"You are not allowed to access the routes"});
        }

}

module.exports={verifyToken,verifyTokenAndAuthorization,verifyHiringCompany,verifyAdmin,authenticateToken}