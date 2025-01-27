import { StatusCodes } from "http-status-codes";

export const errorHandler=(error,res,next)=>{
    console.log( "Error logged in error handler:--",error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal service error",
        message: "An unexpected error occured"
    })
    
}
