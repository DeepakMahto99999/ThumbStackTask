import express from "express";

import {
    userLoginController,
    userLogoutController,
    userRegisterController
} from '../controllers/auth.controller.js';


const authRouter = express.Router();


/**
 * POST /api/auth/register 
 */
authRouter.post("/register", userRegisterController);


/**
 * POST /api/auth/login 
 */
authRouter.post("/login", userLoginController);

/**
 * POST /api/auth/logout 
 */
authRouter.post("/logout", userLogoutController);


export default authRouter;


