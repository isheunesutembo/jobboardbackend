const router=require('express').Router()
const { Router } = require('express')
const authController=require('../controllers/companyAuthController')

router.post("/registerCompany",authController.createCompany)
router.post("/logInCompany",authController.logInCompany)

module.exports=router