import { prisma } from "../db/index.js";
export const getPostservice=async()=>{
    const posts=await prisma.post.findMany({include:{User:{omit:{password:true}}}});
    return posts;
}
export const createPostService=async(postData,userId)=>{
    const posts=await prisma.post.create({
       data:{
        content:postData.content,
        userId: userId,
       }
    }
    );
    return posts;
}
export const getPostByIdService = async (user) => {
    const userAndPosts = await prisma.post.findUnique({
      where: { id: user.postId },
    });
    return userAndPosts;
  };
  export const getPostByUserIdService = async (userId) => {
    const posts = await prisma.post.findMany({
      where:{
        userId : userId
      }
    })
    return posts;
  };
  export const UpdatePostService = async (postId, loggedInUserId, updateData) => {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new Error("Post not found", { cause: "NotFoundCustomError" });
    }
    // if (updateData.likeCase == "like") {
    //   post.likesCount += 1;
    // } else if (updateData.likeCase == "unlike") {
    //   if (post.likesCount > 0) {
    //     post.likesCount -= 1;
    //   }
    // }
  
    // if (updateData.content) {
    //   post.content = updateData.content;
    // }
    if (updateData.like) {
      const data = await prisma.post.update({
        where: { id: postId },
        data: {
          likesCount: post.likesCount + 1,
        },
      });
      return data;
    }
    if (post.userId !== loggedInUserId) {
      throw new Error("You cannot perform this Action", {
        cause: "UnauthorizedCustomError",
      });
    } else {
      const userAndPosts = await prisma.post.update({
        where: { id: postId },
        data: {
          content: updateData.content,
        },
      });
      return userAndPosts;
    }
  };
  export const DeletePostByIdService = async (postId,loggedInUseruserId) => {

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new Error("Post not found", { cause: "NotFoundCustomError" });
    }
    if (post.userId !== loggedInUseruserId) {
      throw new Error("You cannot perform this Action", {
        cause: "UnauthorizedCustomError", 
      });
      
    }else {
      const deletedposts = await prisma.post.delete({
        where: { id: postId },
      });
      return deletedposts;
    }
  };
  // if(post.userId==loggedInUserId){
  //   await prisma.post.delete({})
  // }
