import { Router } from "express";
import { getUserHandler, loginHandler, logoutHandler, refreshHandler, registerHandler } from "../controllers/auth.controller";
import authenticate from "../middleware/authenticate";


const authRoutes = Router();

// prefix: /auth

authRoutes.post("/register", registerHandler)
authRoutes.post("/login", loginHandler)
authRoutes.get("/refresh", refreshHandler)
authRoutes.get("/logout", logoutHandler)
authRoutes.get("/user", authenticate, getUserHandler)

export default authRoutes

