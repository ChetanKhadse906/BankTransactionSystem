import express from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router=express.Router();

router.post("/register",authMiddleware.userExists, authController.registerUser)
router.post("/login", authMiddleware.isUserValid,authController.loginUser)

export default router;