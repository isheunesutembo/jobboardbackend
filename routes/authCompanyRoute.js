const router=require('express').Router()
const { Router } = require('express')
const authController=require('../controllers/companyAuthController')
const {loginLimiter,apiLimiter}=require('../middleware/ratelimiting')
/**
 * @swagger
 * /api/registerCompany/:
 *   post:
 *     summary: LogIn a company
 *     description:  register a company
 *     tags:
 *       - CompanyAuth
 *     responses:
 *       201:
 *         description: Sign in a company.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                  
 *                   email:
 *                     type: string
 *                   
 *                  
 *                   password:
 *                     type: string
 * 
 */
router.post("/registerCompany",loginLimiter,authController.createCompany)
/**
 * @swagger
 * /api/logInCompany/:
 *   post:
 *     summary: LogIn a company
 *     description:  register a company
 *     tags:
 *       - CompanyAuth
 *     responses:
 *       201:
 *         description: Sign in a company.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                  
 *                   email:
 *                     type: string
 *                  
 *                   password:
 *                     type: string
 * 
 */
router.post("/logInCompany",loginLimiter,authController.logInCompany)

module.exports=router