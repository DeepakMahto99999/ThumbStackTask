import express from "express";

import { userLoginController, userRegisterController } from '../controllers/auth.controller.js';


const authRouter = express.Router();


/**
 * POST /api/auth/register 
 */
authRouter.post("/register" , userRegisterController );


/**
 * POST /api/auth/login 
 */
authRouter.post("/login" , userLoginController );


export default authRouter;


