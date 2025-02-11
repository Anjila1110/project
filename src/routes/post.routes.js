import { Router } from "express";
import { createPostController, DeletePostByIdController, getAllPostsController, getPostByIdController, getPostByUserIdController, UpdatePostController } from "../controllers/postcontroller.js";
import { authMiddleware } from "../middleware.js/authMiddleware.js";

//api/posts
const postRouter = Router();

postRouter.route("/").get(authMiddleware,getAllPostsController)
postRouter.post("/",authMiddleware,createPostController);
postRouter.route("/:postId").get(authMiddleware,getPostByIdController);
postRouter.route("/user/:userId").get(authMiddleware,getPostByUserIdController);
postRouter.patch("/:postId", authMiddleware,UpdatePostController);
// postRouter.route("/:postId").delete(authMiddleware,DeletePostByIdController);
postRouter.delete("/:postId",authMiddleware,DeletePostByIdController);
export default postRouter;