const router=require('express').Router()
const { Router } = require('express')
const applicationController=require('../controllers/applicationcontroller')
const {verifyTokenAndAuthorization,authenticateToken,verifyHiringCompany, verifyAdmin}=require('../middleware/verifyToken')
/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Post a new application
 *     description: Post a new application
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: Post a new application
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
 *                   status:
 *                     type: string
 *                   company:
 *                     type: string
 *                   resume:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   vacancyId:
 *                     type: string
 *                 
 * 
 */
router.post("/",verifyTokenAndAuthorization,applicationController.createApplication)
/**
 * @swagger
 * /api/applications/applicationsbyvacancy:id:
 *   get:
 *     summary: get applications by vacancy
 *     description: get applications by vacancy
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: get applications by vacancy
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
 *                   status:
 *                     type: string
 *                   company:
 *                     type: string
 *                   resume:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   vacancyId:
 *                     type: string
 *                 
 * 
 */
router.get("applicationsbyvacancy/:id",verifyHiringCompany,applicationController.getApplicationsByVacancy)
/**
 * @swagger
 * /api/applications/:
 *   get:
 *     summary: get applications 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the application.
 *         schema:
 *          type: string
 *     description: get applications 
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: get applications 
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
 *                   status:
 *                     type: string
 *                   company:
 *                     type: string
 *                   resume:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   vacancyId:
 *                     type: string
 *                 
 * 
 */
router.get("/",applicationController.getApplications)
/**
 * @swagger
 * /api/applications/applicationsbycompany:id:
 *   get:
 *     summary: get applications by company
 *     description: get applications by company
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: get applications by company
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
 *                   status:
 *                     type: string
 *                   company:
 *                     type: string
 *                   resume:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   vacancyId:
 *                     type: string
 *                 
 * 
 */
router.get("/applicationsbycompany/:id",verifyHiringCompany,applicationController.getCompanyApplications)
/**
 * @swagger
 * /api/applications/applicationsbyuser:id:
 *   get:
 *     summary: get user applications
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the application.
 *         schema:
 *          type: string
 *     description: get user applications
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: get user applications
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
 *                   status:
 *                     type: string
 *                   company:
 *                     type: string
 *                   resume:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   vacancyId:
 *                     type: string
 *                 
 * 
 */
router.get("/applicationsbyuser/:id",verifyTokenAndAuthorization,applicationController.getUserApplications)
/**
 * @swagger
 * /api/applications/:id:
 *   put:
 *     summary: update application
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the application.
 *         schema:
 *          type: string
 *     description: update application
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: update application
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
 *                   status:
 *                     type: string
 *                   company:
 *                     type: string
 *                   resume:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   vacancyId:
 *                     type: string
 *                 
 * 
 */
router.put("/:id",verifyHiringCompany,applicationController.updateApplicationStatus)
/**
 * @swagger
 * /api/applications/:id:
 *   delete:
 *     summary: delete application
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the application.
 *         schema:
 *          type: string
 *     description: delete application
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: delete application
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
 *                   status:
 *                     type: string
 *                   company:
 *                     type: string
 *                   resume:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   vacancyId:
 *                     type: string
 *                 
 * 
 */
router.delete("/:id",verifyHiringCompany,applicationController.deleteApplication)
/**
 * @swagger
 * /api/applications/:id:
 *   patch:
 *     summary: Update application status
 *     
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the application.
 *         schema:
 *          type: string
 *     description: Update application status
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: Update application status
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
 *                   status:
 *                   
 *                 
 * 
 */
router.patch("/:id",verifyHiringCompany,applicationController.updateApplicationStatus)

module.exports=router