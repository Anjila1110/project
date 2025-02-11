import { Router } from "express";
import { deleteUserController, getAllUserController, getUserProfile, registerUserController, userLoginController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware.js/authMiddleware.js";

const userRouter = Router();

userRouter.get("/", getAllUserController);
userRouter.post("/register",registerUserController)
userRouter.post("/login", userLoginController);
//userRouter.post("/login", userLoginController);
userRouter.post("/delete", deleteUserController);
userRouter.get("/:userId", authMiddleware,getUserProfile);

export default userRouter;