const router=require('express').Router()
const { Router } = require('express')
const upload=require('../middleware/resume.upload')
const resumeController=require('../controllers/resumeContoller')
const {verifyTokenAndAuthorization,authenticateToken}=require('../middleware/verifyToken')
router.post("/" ,resumeController.createResume)
router.get("/:id",verifyTokenAndAuthorization,resumeController.getUserResume)
router.put("/:id",verifyTokenAndAuthorization,resumeController.updateResume)
router.delete("/:id",verifyTokenAndAuthorization,resumeController.deleteResume)

module.exports=router