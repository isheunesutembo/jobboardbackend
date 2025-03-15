const router=require('express').Router()
const { Router } = require('express')
const authController=require('../controllers/authController')
/**
 * @swagger
 * /api/registerUser/:
 *   post:
 *     summary: register a user
 *     description:  register a user
 *     tags:
 *       - UserAuth
 *     responses:
 *       201:
 *         description: Sign in a user.
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
 *                   username:
 *                     type: string
 *                  
 *                   password:
 *                     type: string
 * 
 */
router.post("/registerUser",authController.createUser)
/**
 * @swagger
 * /api/logInUser/:
 *   post:
 *     summary: LogIn a user
 *     description:  login a user
 *     tags:
 *       - UserAuth
 *     responses:
 *       201:
 *         description: Sign in a user.
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
router.post("/logInUser",authController.logInUser)
router.post("/refresh-token",authController.refreshToken)
router.post("/logout",authController.logout)
module.exports=router