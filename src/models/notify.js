import mongoose from "mongoose";

const notificaion= new mongoose.Schema({
    title:{type:String, required:true},
    message:{type:String, required:true},
    adminread:{type:Boolean, default:false},
    wardenred:{type:Boolean, default:false},
    photo:{type:String}
    },{
        timestamps:true
});

const Notify = mongoose.model("Notify", notificaion);
export default Notify;