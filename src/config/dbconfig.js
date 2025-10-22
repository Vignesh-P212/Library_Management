import mongoose from 'mongoose'

const connction1=async ()=>{


    try{

        await mongoose.connect("mongodb://localhost:27017/Number1");
        console.log("Database connected successfully");

    }catch(error){
        console.log("Error in DB connection");
    }

    
};


export default connction1;

