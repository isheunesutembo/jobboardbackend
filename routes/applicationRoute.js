const router=require('express').Router()
const { Router } = require('express')
const applicationController=require('../controllers/applicationcontroller')
const {verifyTokenAndAuthorization,authenticateToken,verifyHiringCompany, verifyAdmin}=require('../middleware/verifyToken')
router.post("/",verifyTokenAndAuthorization,applicationController.createApplication)
router.get("applicationsbyvacancy/:id",verifyHiringCompany,applicationController.getApplicationsByVacancy)
router.get("/",applicationController.getApplications)
router.get("applicationsbycompany/:id",verifyHiringCompany,applicationController.getCompanyApplications)
router.get("applicationsbyuser/:id",verifyTokenAndAuthorization,applicationController.getUserApplications)
router.put("/:id",verifyHiringCompany,applicationController.updateApplicationStatus)
router.delete("/:id",verifyHiringCompany,applicationController.deleteApplication)

module.exports=router