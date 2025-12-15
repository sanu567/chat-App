import express from "express";
import { checkAuth, login, signup, updateProfile } from "../conroller/userController.js";
import { proctedRoute } from "../MiddleWare/auth.js";

const authRoute = express.Router();
authRoute.post('/signup',signup);
authRoute.post('/login',login);

authRoute.put('/update-profile',proctedRoute,updateProfile);
authRoute.get('/check-auth',proctedRoute,checkAuth);

export default authRoute;