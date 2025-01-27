export const userFirstService = async (args) => {
    console.log("Reached Service layer")
    console.log("Doing some database work")
    const someDataFromDatabase = "MY DATA";
    return someDataFromDatabase;
}

export const loginUserService = async (loginData) => {
    const email = loginData.email;
    const password = loginData.password
    if(email =="anjila@gmail.com" && password=="1234"){
        return {"message": "Login successful"}
    }    else{
        return {"message": "Login unsuccessful"}
    }
}

const usersDataList = [
    {   username:"anjila",  email: "anjila@gmail.com"},
    {   username: "juna",      email: "juna123@gmail.com"} ,
    {   username: 'munu',  email: "munu@gmail.com"}
]
export const allUserService = async () => {
    return usersDataList;
}