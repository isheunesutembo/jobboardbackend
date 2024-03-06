const mongoose=require('mongoose')
const FavoriteSchema=new mongoose.Schema({
    accepted:{type:Boolean ,default:false},
    company:{type:mongoose.Schema.Types.ObjectId,required:true},
    resume:{type:mongoose.Schema.Types.ObjectId,required:true}

});
module.exports=mongoose.model('Favorite',FavoriteSchema)