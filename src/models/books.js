import mongoose from "mongoose";
import user from "./user.js"
const bookschema= new mongoose.Schema({
    
    title:{type:String,required:true},
    authourname:{type:String,required:true},
    publisher:{type:String},
    publishedyear:{type:Number,required:true},
    language:{type:String,default:"English"},
    category:{type:String},
    description:{type:String},
    coveimage:{type:String},
    isbn:{type:String,unique:true,required:true},
    price:{type:Number,default:120},

    totalcopies:{type:Number,default:5},
    availablecopies:{type:Number},
    addedby:{type:mongoose.Schema.ObjectId,ref:user,required:true},
    updatedby:[
        {
            date:{type:Date},
            user:{type:mongoose.Schema.ObjectId,ref:user,required:true},
            _id:false
        }
    ]


});

const books=mongoose.model("bookschema",bookschema);
export default books;