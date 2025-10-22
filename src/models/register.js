import mongoose from "mongoose";

const registerschema=new mongoose.Schema({

    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    dept:{type:String,required:false},
    role:{type:String,enum:["Staff","Student"],default:"Student"},
    password:{type:String,required:true},
    phonenumber:{type:Number,required:false},
    limit:{type:Number,required:true,default:1},
    profile:{type:String,required:false},
    
    borrowed:[
        {
            status:{type:String,enum:["Borrowed","Returned","Idle"],default:"Idle"},
            date:{type:Date,default:new Date().now}

        }
    ],



    

});

const register=mongoose.model("register",registerschema);

export default register;