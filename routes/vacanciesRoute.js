const router=require('express').Router()
const { Router } = require('express')
const vacancyController=require('../controllers/vacancyController')
router.post("/",vacancyController.createVacancy)
router.get("/",vacancyController.getAllVacancies)
router.get("/",vacancyController.searchVacancy)
router.get("/:id",vacancyController.getVacancyById)
router.get("/vacancyByCategory:id",vacancyController.getVacancyByCategory)

module.exports=router