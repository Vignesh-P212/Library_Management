import mongoose from 'mongoose'

const connction1=async ()=>{


    try{

        await mongoose.connect(process.env.MongoDB_URI);
        console.log("Database connected successfully");

    }catch(error){
        console.log("Error in DB connection");
    }

    
};


export default connction1;

