const router=require('express').Router()
const { Router } = require('express')
const favouriteController=require('../controllers/favoriteController')
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')
/**
 * @swagger
 * /api/favourites/:
 *   post:
 *     summary: Add job vacancy to favourites
 *     description: Add job vacancy to favourites
 *     tags:
 *       - Favourites
 *     responses:
 *       200:
 *         description: Add job vacancy to favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   vacancy:
 *                     type: string
 *                   userId:
 *                     type: string
 *                  
 * 
 */
router.post("/",verifyTokenAndAuthorization,favouriteController.createFavourite)
/**
 * @swagger
 * /api/favourites/:id:
 *   get:
 *     summary: Add job vacancy to favourites
 *     description: Add job vacancy to favourites
 *     tags:
 *       - Favourites
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the favourites to retrieve.
 *     responses:
 *       200:
 *         description: Add job vacancy to favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   vacancy:
 *                     type: string
 *                   userId:
 *                     type: string
 *                  
 * 
 */
router.get("/:id",verifyTokenAndAuthorization,favouriteController.getFavourites)
/**
 * @swagger
 * /api/favourites/:id:
 *   delete:
 *     summary: Delete  favourites
 *     description: Delete favourites
 *     tags:
 *       - Favourites
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the favourites to retrieve.
 *     responses:
 *       200:
 *         description: Delete favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   vacancy:
 *                     type: string
 *                   userId:
 *                     type: string
 *                  
 * 
 */
router.delete("/:id",verifyTokenAndAuthorization,favouriteController.deleteFavourite)

module.exports=router