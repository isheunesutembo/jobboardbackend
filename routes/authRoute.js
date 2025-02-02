const router=require('express').Router()
const { Router } = require('express')
const authController=require('../controllers/authController')
router.post("/registerUser",authController.createUser)
router.post("/logInUser",authController.logInUser)
router.post("/refresh-token",authController.refreshToken)
router.post("/logout",authController.logout)
module.exports=router