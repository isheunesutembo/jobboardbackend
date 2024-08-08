const router=require('express').Router()
const { Router } = require('express')
const categoryController=require('../controllers/categoryController')
const upload=require('../middleware/category.upload')
router.post("/",categoryController.createCategory)
router.get("/",categoryController.getAllCategories)
router.get("/",categoryController.getRandomCategories)

module.exports=router