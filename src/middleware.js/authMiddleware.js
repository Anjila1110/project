export const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    const authToken =authHeader.split(" ")[1];
    console.log(authToken);
}