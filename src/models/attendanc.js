import mongoose from "mongoose";
import register from "./register.js";

const attendance =new mongoose.Schema({

    studentid:{type:mongoose.Schema.ObjectId,ref:register,required:true},
    date:{type:Date,required:true},
    session:[
        {
        logintime:{ type:Date,required:true},
        logouttime:{ type:Date},
    } ,

      
    ],
    
});

const student=mongoose.model("Attendnace",attendance);


export default student;