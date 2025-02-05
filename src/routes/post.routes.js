import { Router } from "express";
import { getAllPostsController } from "../controllers/postcontroller.js";

//api/posts
const postRouter = Router();

postRouter.route("/").get(getAllPostsController)
// .post(createPostController);
// postRouter.route("/:postId")
// .get(getPostByIdController)
// .patch(updatePostController)
// .delete(deletePostController);


// postRouter.post("/:postId", getPostByIdController);
// postRouter.patch("/:postId", updatePostController);
// postRouter.delete("/:postId", deletePostController);

export default postRouter;