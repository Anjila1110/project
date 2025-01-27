import {connect, model, Schema} from "mongoose"

export const connectDB =async()=>{
    try{
        await connect(process.env.DB_URL);
        console.log("Database connected successfully");
        const kittySchema = new Schema({
            name : String,
        })
        const kitten = model("Kitten",kittySchema);
    }
catch(error){
    console.log(error)
}
};