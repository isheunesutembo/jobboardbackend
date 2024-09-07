const router=require('express').Router()
const { Router } = require('express')
const favouriteController=require('../controllers/favoriteController')
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')
router.post("/",favouriteController.createFavourite)
router.get("/:id",favouriteController.getFavourites)
router.delete("/:id",favouriteController.deleteFavourite)

module.exports=router