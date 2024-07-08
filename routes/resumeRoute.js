const router=require('express').Router()
const { Router } = require('express')
const upload=require('../middleware/resume.upload')
const resumeController=require('../controllers/resumeContoller')
router.post("/",upload,resumeController.createResume)
router.get("/:id",resumeController.getUserResume)
router.put("/:id",resumeController.updateResume)
router.delete("/:id",resumeController.deleteResume)

module.exports=router