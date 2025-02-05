import { StatusCodes } from "http-status-codes";
import { deleteAllUserService, getAllUserService, loginUserService, registerUserService } from "../services/user.service.js";
import { createUserSchema } from "../schema/user.schema.js";

export const getAllUserController = async (req, res) => {
  try {
    const data = await getAllUserService();
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const registerUserController = async (req, res, next) => {
  try {
    createUserSchema.parse(req.body);
    const data = await registerUserService(req.body);
    res.status(StatusCodes.ACCEPTED).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    const data = await loginUserService(req.body);
    res.status(StatusCodes.ACCEPTED).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUserController = async(req,res,next)=>{
  try {
    const data = await deleteAllUserService(req.body);
    createUserSchema.parse(req.body)
    res.status(StatusCodes.ACCEPTED).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}