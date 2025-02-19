const router=require('express').Router()
const { Router } = require('express')
const favouriteController=require('../controllers/favoriteController')
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')
router.post("/",verifyTokenAndAuthorization,favouriteController.createFavourite)
router.get("/:id",verifyTokenAndAuthorization,favouriteController.getFavourites)
router.delete("/:id",verifyTokenAndAuthorization,favouriteController.deleteFavourite)

module.exports=router