const mongoose=require('mongoose')
const FavoriteSchema=new mongoose.Schema({
    accepted:{type:Boolean ,default:false},
    company:{type:mongoose.Schema.Types.ObjectId,required:true},
    resume:{type:mongoose.Schema.Types.ObjectId,required:true}

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