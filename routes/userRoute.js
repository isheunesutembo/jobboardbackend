const router=require('express').Router()
const { Router } = require('express')
const userController=require('../controllers/userController')
const {verifyTokenAndAuthorization,authenticateToken}=require('../middleware/verifyToken')
/**
 * @swagger
 * /api/users/:id:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   verification:
 *                     type: boolean
 *                   phone:
 *                     type: string
 *                   userType:
 *                     type: string
 *                   profileImage:
 *                     type: string
 *                   password:
 *                     type: string
 * 
 */
router.get("/:id",verifyTokenAndAuthorization,userController.getUser)
/**
 * @swagger
 * /api/users/:id:
 *   put:
 *     summary: Retrieve a list of users
 *     description: Get a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                  
 *                   lastName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *           
 *                   profileImage:
 *                     type: string
 *                 
 * 
 */
router.put("/:id",verifyTokenAndAuthorization,userController.updateUser)
/**
 * @swagger
 * /api/users/:id:
 *   delete:
 *     summary: Retrieve a list of users
 *     description: Get a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                  
 *                   lastName:
 *                     type: string
 *                   firstName:
 *                     type: string
 *           
 *                   profileImage:
 *                     type: string
 *                 
 * 
 */
router.delete("/:id",verifyTokenAndAuthorization,userController.deleteUser)

module.exports=router