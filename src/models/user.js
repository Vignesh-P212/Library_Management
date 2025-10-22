import mongoose from "mongoose";

const userschema=new mongoose.Schema({

    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    role:{type:String,enum:["Employee","Admin"],default:"Employee"},
    password:{type:String,required:true},
    phonenumber:{type:Number,required:false},
    employeeid:{type:String,required:true},
    profile:{type:String},
    createdby:{type:mongoose.Schema.ObjectId,required:false}


});

const user =mongoose.model("users",userschema);

export default user;