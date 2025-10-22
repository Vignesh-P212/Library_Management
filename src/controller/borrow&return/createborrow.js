import borrow from "../../models/borrow&return.js"; 
import books from "../../models/books.js";
import register from "../../models/register.js";
import user from "../../models/user.js";



const createborrow=async(req,res)=>{
try {
    const{    
        borrowdate,
        bookid,
        phonenumber,
    }=req.body;
    
 const student=await register.findOne({phonenumber:phonenumber});
 if(!student){
   return res.status(400).json({sucess:false,message:"Student not found"})
 }

 if(student.limit<1){
  return  res.status(400).json({sucess:false,message:"Student limit is existed please return previous books"})  
 }


const book=await books.findById(bookid);
 if(!book){
    return res.status(400).json({sucess:false,message:"Student not found"})
 }

 if(book.totalcopies<=0){
  return res.status(400).json({sucess:false,message:"Book is out of Stock Now"})  
 }
// Add 10 days to current date
const date = new Date();//14
date.setDate(date.getDate() + 10); //14---> 14+10

const data= new borrow({
        borrowdate:new Date(),
        bookid,
        studendid:student.id,
        phonenumber,
        expectedreturndate:date,
        status:"borrowed",
        approveid:req.user._id

});

await data.save()

student.limit-=1;
student.borrowed.push({
    status:"Borrowed",
    date:new Date()
})
await student.save();

book.totalcopies-=1;
await book.save();

 res.status(200).json({sucess:true,message:"Borrow is created",data})


} catch (error) {
    console.log(error);
     res.status(500).json({sucess:false,message:"Internal server error"})
}
};
export default createborrow;











