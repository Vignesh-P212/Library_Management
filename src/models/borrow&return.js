import mongoose from "mongoose";
import books from "./books.js"
import register from "./register.js";
import user from "./user.js";
const boorowschema =new mongoose.Schema({      

borrowdate:{type:Date,required:true}, 
status:{type:String,enum:["borrowed","returned","lost","renewed"],default:"borrowed"}, 
approveid:{type:mongoose.Schema.ObjectId,ref:user,required:true}, 
bookid:{type:mongoose.Schema.ObjectId,ref:books,required:true},     
studendid:{type:mongoose.Schema.ObjectId,ref:register,required:true},   
phonenumber:{type:Number},

returndate:{type:Date,required:false},          
returnapprovedby:{type:mongoose.Schema.ObjectId,ref:user}, 
expectedreturndate:{type:Date,required:true},   


renewdate:{type:Date,required:false}, 
renewdapprovedby:{type:mongoose.Schema.ObjectId,ref:user},
renewhistory:[
    {
        renewdate:{type:Date},
        newduedate:{type:Date},
        approveby:{type:mongoose.Schema.ObjectId,ref:user}
    }
],
noofdays:{type:Number}, 

penalty:{

haspeanlty:{type:Boolean},
amount:{type:Number},
reason:{type:String}, 
status:{type:String,enum:["Unpaid","Paid"]},
paymentmethod:{type:String},
paiddate:{type:Date},

},
updatedby:{type:mongoose.Schema.ObjectId,ref:user}, 
});

const borrow=mongoose.model("Borrow&return",boorowschema);


export default borrow;