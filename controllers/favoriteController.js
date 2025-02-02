const Favourite=require('../models/FavoriteModel')

module.exports={
    createFavourite:async(req,res)=>{
       
        const {vacancy,userId}=req.body;
       
        if(!vacancy||!userId){
            res.status(400).json({status:false,message:"You have a missing field"})
        }
        try{
            const favourite=new Favourite(req.body)
           const favouriteExist=await Favourite.findOne({vacancy:req.body.vacancy})
           if(favouriteExist){
            return res.status(400).json({status:false,message:"vacancy already exists"})
           }
            await favourite.save()
            res.status(201).json({status:true,message:"Favorite has been created successfully!"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    },
    getFavourites:async(req,res)=>{
        const id=req.params.id;
        try{
            const favourites =await Favourite.find({userId:id})
            .populate({path:"vacancy",select:"title description requirements skillTags experience salary benefits "})
           
            
            
            res.status(200).json(favourites)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    deleteFavourite:async(req,res)=>{
        const id=req.params.id
        try{
            const favorite=await Favourite.findByIdAndDelete(id)
            res.status(200).json({message:"deleted"})
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    }
}