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
     try{
       /* const result =await Vacancy.aggregate([
            {
                '$search':{
                    'index':'vacancy-search',
                    'text':{
                        'query':req.query.search == ''?'':req.query.search,
                        'path':{
                            'wildcard':'*'
                        }
                    }
                
                }
            }
        ]).limit(5)
        */
       const result=Vacancy.find({'$text':req.query.search})     
           
        res.status(200).send(result)
     }catch(error){
        res.status(500).json({status:false,message:error.message})
     }
    },
    
    getAllVacancies:async(req,res)=>{
        try{
            const vacancies=await Vacancy.find({title:{$ne:'more'}},{__v:0})
            .populate({path:"company",select:"name address logo phoneNumber email"})
            .populate({path:"category",select:"image title"})
           
            
            res.status(200).json(vacancies)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    getVacancyById:async(req,res)=>{
        const id=req.params.id;
        try{
         const vacancy=await Vacancy.findById(id).
         populate("category","title image");
         res.status(200).json(vacancy)

        }catch(error){
        res.status(500).json({status:false,message:error.message});
        }
    },
    getVacancyByCategory:async(req,res)=>{
        const id=req.params.id;
        try{
            const vacancies=await Vacancy.find({category:id})
            res.status(200).json(vacancies)
        }catch(error){
            res.status(500).json({status:false,message:error.message});
        }
    },
    searchVacancy:async(req,res)=>{
        
    }

}