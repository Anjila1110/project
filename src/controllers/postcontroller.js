import { StatusCodes } from "http-status-codes";
import { createPostService, DeletePostByIdService, getPostByIdService, getPostByUserIdService, getPostservice, UpdatePostService } from "../services/post.service.js";


export const getAllPostsController =async(req,res,next)=>{
    try{
        const posts= await getPostservice()
        res.status(StatusCodes.OK).json(posts)
    }
    catch(error){
        next(error)
    }
}

    export const createPostController =async(req,res,next)=>{
    try{
        const posts= await createPostService(req.body,req.userId)
        res.status(StatusCodes.OK).json(posts)
    }
    catch(error){
        next(error)
    }};
    export const getPostByIdController = async (req, res, next) => {
        try {
          const data = await getPostByIdService(req.params);
          res.status(StatusCodes.ACCEPTED).json(data);
        } catch (error) {
          console.log(error);
          next(error);
        }
      };
      export const getPostByUserIdController = async (req, res, next) => {
        try{
          const userId=req.params.userId;
          const data = await getPostByUserIdService(userId);
          res.status(StatusCodes.OK).json(data);}
          catch(error){
            next(error);
          }
      };

      export const UpdatePostController = async (req, res, next) => {
        try {
          const data = await UpdatePostService(req.params.postId,
            req.userId,
            req.body);
          res.status(StatusCodes.ACCEPTED).json(data);
        } catch (error) {
          console.log(error);
          next(error);
        }
      };
      export const DeletePostByIdController = async (req, res, next) => {
        try {
          const postId = req.params.postId;
          const loggedInUser = req.userId;
          const data = await DeletePostByIdService(postId,loggedInUser);
          res.status(StatusCodes.ACCEPTED).json({message:"Post Deleted Successfully"});
        } catch (error) {
          console.log(error);
          next(error);
        }
      };

// export const getPostByIdController =async(req,res,next)=>{
//     try{
//         const postId= req.params.postId;
//         const posts= await createPostService(req.body,req.userId)
//         res.status(StatusCodes.OK).json(posts)
//     }
//     catch(error){
//         next(error)
//     }
   
// }