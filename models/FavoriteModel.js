const mongoose=require('mongoose')
const FavoriteSchema=new mongoose.Schema({
   
   vacancy:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Vacancy"},
   userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},

},{
    toJSON:{
        transform:function (doc,ret){
            ret.favoriteId=ret._id.toString();
            delete ret._id;
            delete ret._v;
        }
    }
});
module.exports=mongoose.model('Favorite',FavoriteSchema)