import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
export const errorHandler = (error, req, res, next) => {
  console.error("Error logged in error handler:--", error?.message);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        res.status(StatusCodes.CONFLICT).json({
          error: `Unique constraint failed on ${
            error.meta?.target || "unknown field"
          }`,
          message: `${error.meta?.target || "unknown field"} already exists`,
        });
        return;
      case "P2025": // Record not found
        res.status(StatusCodes.NOT_FOUND).json({
          error: "Not Found",
          message: "The requested resource could not be found.",
        });
        return;
        case "P2005": // invalid argument
        res.status(StatusCodes.NOT_FOUND).json({
          error: "Invalid Argument",
          message: "Invalid argument error",
        });
        return;
      default:
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
        return;
    }
  }
  if (error?.cause == "CustomError") {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized error!!",
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((issue) => ({
      message: `${issue.path.join(".")} is ${issue.message}`,
    }));
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid data", message: errorMessages });
  }

  // Catch-all for unexpected errors
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred!!!.",
  });
};
  // if(error instanceof ZodError){
  //   res.status(StatusCodes.BAD_REQUEST).json({
  //     error:"invalid error",
  //     message:"Invalid data: $(error?.path)"
  //   })
  // }

//     if(error instanceof ZodError){
//       const errorMessages = error.errors.map((issue)=>({
//         message: '${issue.path.join(".")} is ${issue.message}',
// }));
// res.status(StatusCodes.BAD_REQUEST).json({error:"Invalid data",message: errorMessages});
//     }
    

//     if (error?.cause == "CustomError"){
//       res.status(StatusCodes.UNAUTHORIZED).json({
//       error: "Authorized Error",
//       message: error.message,
//     });
//   };


//   //Catch-all for unexpected errors
//   if(error)
//   res.status(StatusCodes.UNAUTHORIZED).json({
//     error: "Authorized Error",
//     message: error.message,
//   });
// };