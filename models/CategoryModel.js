const mongoose=require('mongoose')
const CategorySchema=new mongoose.Schema({
    title:{type:String ,required:true,unique:true},
    image:{type:String ,required:true},
});
module.exports=mongoose.model('Category',CategorySchema)