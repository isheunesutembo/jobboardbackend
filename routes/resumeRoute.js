const router=require('express').Router()
const { Router } = require('express')
const upload=require('../middleware/resume.upload')
const resumeController=require('../controllers/resumeContoller')
const {verifyTokenAndAuthorization,authenticateToken, verifyToken}=require('../middleware/verifyToken')
const { verify } = require('jsonwebtoken')
router.post("/" ,verifyTokenAndAuthorization,resumeController.createResume)
router.get("/:id",verifyTokenAndAuthorization,resumeController.getUserResume)
router.put("/:id",verifyTokenAndAuthorization,resumeController.updateResume)
router.delete("/:id",verifyTokenAndAuthorization,resumeController.deleteResume)

module.exports=router