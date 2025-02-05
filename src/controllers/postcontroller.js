import { StatusCodes } from "http-status-codes";
import { getPostservice } from "../services/post.service.js";


export const getAllPostsController =async(req,res,next)=>{
    try{
        const posts= await getPostservice()
        res.status(StatusCodes.OK).json(posts)
    }
    catch(error){
        next(error)
    }
}