import { prisma } from "../db/index.js";
export const getPostservice=async()=>{
    const posts=await prisma.post.findMany();
    return posts;
}