const Category=require('../models/CategoryModel')
const upload=require('../middleware/category.upload')
module.exports={
    createCategory:async(req,res)=>{
        upload(req,res,function(error){
            if(error){
                res.status(500).json({status:false,message:error.message})
            }else{
                const {title}=req.body;
                const path=req.file!=undefined?req.file.path.replace(/\\/g,"/"):"";
                if(!title||!path){
                    res.status(400).json({status:false,message:"You have a missing field"})
                }
               
                const newCategory=new Category({
                    title:req.body.title,
                    image:path
                })
                try{
                     newCategory.save()
                    res.status(201).json({status:true,message:"category created successfull"})
                }catch(error){
                    res.status(500).json({status:false,message:error.message});
        
                }
            }
        })
        
        
    },

    getAllCategories:async(req,res)=>{
        try{
            const categories=await Category.find({title:{$ne:'more'}},{__v:0})
            res.status(200).json(categories);
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    getRandomCategories:async(req,res)=>{
        try{
            let categories=await Category.aggregate([
                {$match:{title:{$ne:"more"}}},
                {$sample:{size:4}}
            ]);
            const moreCategory=await Category.findOne({value:'more'},{__v:0});
            if(moreCategory){
                categories.push(moreCategory)
            }
            res.status(200).json(categories);
            
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    }
}