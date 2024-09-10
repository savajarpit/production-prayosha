import mongoose  from "mongoose";

const connectdb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MNGO_URL)
        console.log(`Connected To Mongodb Database`)
    }
    catch(error){
        console.log(`Error in mongodb ${error}`)
    }
}
export default connectdb