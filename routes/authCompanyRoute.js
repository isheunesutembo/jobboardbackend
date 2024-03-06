const router=require('express').Router()
const { Router } = require('express')
const authController=require('../controllers/companyAuthController')

router.post("/",authController.createCompany)
router.post("/",authController.logInCompany)

module.exports=Router