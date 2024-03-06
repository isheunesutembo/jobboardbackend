const router=require('express').Router()
const { Router } = require('express')
const authController=require('../controllers/authController')

router.post("/",authController.createUser)
router.post("/",authController.logInUser)

module.exports=Router