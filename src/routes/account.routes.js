import express from 'express'
import accountMiddleware from '../middlewares/account.middleware.js';
import accountController from '../controllers/account.controller.js';

const router=express.Router();

router.post("/create", accountMiddleware.IsuserAuthenticated, accountController.createUserAccount)


export default router;