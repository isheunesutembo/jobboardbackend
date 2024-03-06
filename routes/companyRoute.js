const router=require('express').Router()
const { Router } = require('express')
const companyController=require('../controllers/companyController')
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')
router.get("/:id",verifyTokenAndAuthorization,companyController.getCompany)
router.delete("/:id",companyController.deleteUser)
router.put("/:id",verifyTokenAndAuthorization,companyController.updateCompany)

module.exports=Router