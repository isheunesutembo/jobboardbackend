const jwt =require('jsonwebtoken')

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization']
   
   
        const token= authHeader.split(" ")[1]
        if(!token){
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        jwt.verify(token,process.env.JWT_SECRET),async(err,user)=>{
            if(err){
                res.status(403).json({status:false,message:"Invalid or expired token"})
            }
            req.user=user
            next();
        }
    
  

}
const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
  
        const token=authHeader&&authHeader.split(" ")[1]
        if(!token){
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        jwt.verify(token,process.env.JWT_SECRET,async(err,user)=>{
            if(err){
                return res.status(403).json({status:false,message:"invalid token"})
            }
            req.user=user;
            next();
        })
    
    

};
const verifyTokenAndAuthorization=(req,res,next)=>{
   verifyToken(req,res,()=>{
    if(req.user.userType==="Admin"||
        req.user.userType==="User"||
        req.user.userType==="Company"
    ){
        next();
    }else{
        return res.status(403).json({status:false,message:"You're not allowed to do so"})
    }
   })
}

const verifyHiringCompany=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.userType==="Admin"||
            req.user.userType==="Company"
        ){
            next();
        }else{
            return res.status(403).json({status:false,message:"You're not allowed to do so"})
        }
       })

}
const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.userType==="Admin"
        
        ){
            next();
        }else{
            return res.status(403).json({status:false,message:"You're not allowed to do so"})
        }
       })

}

module.exports={verifyToken,verifyTokenAndAuthorization,verifyHiringCompany,verifyAdmin,authenticateToken}