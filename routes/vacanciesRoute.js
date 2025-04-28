const router=require('express').Router()
const { Router } = require('express')
const vacancyController=require('../controllers/vacancyController')
const {loginLimiter,apiLimiter}=require('../middleware/ratelimiting')
/**
 * @swagger
 * /api/vacancies/:
 *   post:
 *     summary: post vancancy
 *     
 *     description: post vancancy
 *     tags:
 *       - Vacancies
 *     responses:
 *       200:
 *         description: post vancancy
 *         
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   requirements:
 *                     type: string
 *                   skillTags:
 *                     type: array                  
 *                   benefits:
 *                     type: string
 *                   category:
 *                     type: schema
 *                   company:
 *                     type: schema
 *                 
 * 
 */
router.post("/",apiLimiter,vacancyController.createVacancy)
/**
 * @swagger
 * /api/vacancies/:
 *   get:
 *     summary: get vacancies
 *     
 *     description: get vacancies
 *     tags:
 *       - Vacancies
 *     responses:
 *       200:
 *         description: get vacancies
 *         
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   requirements:
 *                     type: string
 *                   skillTags:
 *                     type: array                  
 *                   benefits:
 *                     type: string
 *                   category:
 *                     type: schema
 *                   company:
 *                     type: schema
 *                 
 * 
 */
router.get("/",apiLimiter,vacancyController.getAllVacancies)
/**
 * @swagger
 * /api/vacancies/:
 *   get:
 *     summary: search vacancies
 *     parameters:
 *       - name: search
 *         in: search
 *         required: true
 *         description: search vacancies
 *         
 *     description: search vacancies
 *     tags:
 *       - Vacancies
 *     responses:
 *       200:
 *         description: get vacancies
 *         
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   requirements:
 *                     type: string
 *                   skillTags:
 *                     type: array                  
 *                   benefits:
 *                     type: string
 *                   category:
 *                     type: schema
 *                   company:
 *                     type: schema
 *                 
 * 
 */
router.get("/search",apiLimiter,vacancyController.searchVacancy)
router.get("/filter",apiLimiter,vacancyController.filterVacancy)
router.get("/:id",apiLimiter,vacancyController.getVacancyById)
router.get("/vacancyByCategory/:id",apiLimiter,vacancyController.getVacancyByCategory)

module.exports=router