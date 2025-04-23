const vacancyModel = require('../models/vacancyModel');
const Vacancy=require('../models/vacancyModel')

module.exports={
    createVacancy:async(req,res)=>{
       
        const {title,description,category,salary}=req.body;
        if(!title||!description||!category||!salary){
            res.status(400).json({status:false,message:"You have a missing field"})
        }
        try{
            const newVacancy=new Vacancy(req.body)
            await newVacancy.save()
            res.status(201).json({status:true,message:"Vacancy has been created successfully!"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    },
    searchVacancy:async(req,res)=>{
        const {query}=req.query
        if(!query){
            return res.status(400).json({message:"Query parameters required"})
        }
        try{
            const results=await Vacancy.find({$text:{$search:query}})
            res.json(results)
        }catch(error){
            res.status(500).json({message:"Error searching",error})
        }
     
    },
    
    getAllVacancies:async(req,res)=>{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
      
        const skip = (page - 1) * limit;
        try{
            const vacancies=await Vacancy.find({title:{$ne:'more'}},{__v:0}).skip(skip)
            .limit(limit)
            .populate({path:"company",select:"name address logo phoneNumber email"})
            .populate({path:"category",select:"image title"})
            Vacancy.countDocuments()
            const totalPages = Math.ceil(total / limit);
           
            
            res.status(200).json({vacancies,pagination: {
                page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
              }})
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    
    getVacancyById:async(req,res)=>{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
      
        const skip = (page - 1) * limit;
        const id=req.params.id;
        try{
         const vacancy=await Vacancy.findById(id).
         skip(skip).limit(limit).
         populate("category","title image").
         populate({path:"company",select:"name address logo phoneNumber email"});
         Vacancy.countDocuments()
         const totalPages = Math.ceil(total / limit);
         res.status(200).json({vacancy,pagination: {
            page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          }})

        }catch(error){
        res.status(500).json({status:false,message:error.message});
        }
    },
    getVacancyByCategory:async(req,res)=>{
        const id=req.params.id;
        try{
            const vacancies=await Vacancy.find({category:id});
            res.status(200).json(vacancies)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    filterVacancy:async(req,res)=>{
        try{
            let{title,minSalary,maxSalary,requirements}=req.query;
            let filter={}
    
            if(title)filter.title=new RegExp(title,"i");
            if(requirements)filter.requirements=new RegExp(title,"i");
    
            if(minSalary||maxSalary){
                filter.salary={};
                if(minSalary)filter.salary.$gte=parseInt(minSalary);
                if(maxSalary)filter.salary.$lte=parseInt(maxSalary)
            }
    
            const vacancies=await vacancyModel.find(filter)
            res.json(vacancies)
        }catch(error){
            res.status(500).json({message:"Error fetchinng vacancies",error})
        }
       

    }
    

}