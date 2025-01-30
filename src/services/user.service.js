import { prisma } from "../db/index.js";
import { generateJwtToken } from "../libs/jwt.utilis.js";
import { checkPasword, generateHashPassword } from "../libs/passwordutility.js";

export const getAllUserService = async () => {
  return await prisma.user.findMany({
    omit:{
      password:true
    }
  });
}

export const registerUserService = async (registerUserData) => {
  const hashedPassword = await generateHashPassword(
    registerUserData.password,
  )
  const res = await prisma.user.create({
    data: {
      email: registerUserData.email,
      fullName: registerUserData.fullName,
      password: hashedPassword,
      gender: registerUserData.gender
      
    },
    omit:{
      password:true
    }
  });
  return {message:"Registered Successfully."};
};

export const loginUserService = async (loginData) => {
  console.log(loginData);
  const email = loginData.email;
  const password = loginData.password;
  console.log("Checking Database for login")

  const user = await prisma.user.findUnique({ 
    where:{
      email:email
    }
     });
  if (!user) {
    throw new Error("Invalid Credentials",{cause:"CustomError"})
  }
  const isPasswordsame =await checkPasword(password,user.password);
  
  // const checkPasword = user.password == password;
  if (!isPasswordsame) {
    throw new Error ("Invalid credential",{cause:"CustomError" });
  }
  const token=generateJwtToken(user.id)
  //const checkPasword = user.password == password;
  // const checkPasword=await bcrypt.compare(password,user.password)
  // const isPasswordSame=await checkPassword(password,user.password)
  // if (!isPasswordSame) {
  //   throw new Error("Invalid Credentials",{cause:"Custom Error"})
  // }
  delete user.password
  return { message: "Login successful", user,token };
};
export const deleteAllUserService = async(userData)=>{
  console.log(userData);
  return await prisma.user.deleteMany({where:{fullName: userData.fullName}})
}