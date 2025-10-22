import borrow from "../../models/borrow&return.js"; 
import books from "../../models/books.js";
import register from "../../models/register.js";
import user from "../../models/user.js";



const updateborrow=async(req,res)=>{
try {
    const{ 
         id,
         status, 
    }=req.body;
    


const existdate=await borrow.findById(id);

if(!existdate){
    return res.status(400).json({sucess:false,message:"No boorowschema is found and check the id"});
}

if(existdate.status!=="borrowed"&&existdate.status!=="renewed"){
    return res.status(400).json({sucess:false,message:"Book is already retuned "});
}

const phonenumber=existdate.phonenumber;
 const student=await register.findOne({phonenumber:phonenumber});
 if(!student){
   return res.status(400).json({sucess:false,message:"Student not found"})
 }



const bookid=existdate.bookid;
const book=await books.findById(bookid);
 if(!book){
    return res.status(400).json({sucess:false,message:"book not found"})
 }

//core module
const today=new Date();//15
const nextdate = new Date();//16,18,24,23 

nextdate.setDate(nextdate.getDate() + 10);

if(status==="returned"){

//14 to 24 no peanlty


// 15>24 
if(today>existdate.expectedreturndate){
existdate.penalty.haspeanlty=true;
existdate.noofdays= Math.ceil((today - new Date(existdate.expectedreturndate)) / (1000 * 60 * 60 * 24));

existdate.penalty.amount=existdate.noofdays*10;
existdate.penalty.reason="Due date and late return"
existdate.penalty.paymentmethod="Unpaid";
const fineAmount=existdate.penalty.amount;



await createTransaction({
      transactionType: "Incoming", // Library receives money
      category: "OverdueFine",
      amount: fineAmount,
      student: existdate.student._id,
      borrowRecord: existdate._id,
      book: existdate.book._id,
      paymentMode: "Cash", // or "Pending" if not paid yet
      paymentStatus: "Paid",
      approvedBy: req.user._id,
      description: `Fine for ${noofdays} days late return.`,
    });

}

// still in retured

existdate.status="returned";
existdate.returndate=today;
existdate.returnapprovedby=req.user._id;
await existdate.save();


student.limit+=1;
student.borrowed.pop();
await student.save();

book.totalcopies+=1;
await book.save();

return res.status(200).json({sucess:true,message:"Book is returned Successfully ",existdate})
}


else if(status==="renewed"){


if(today>existdate.expectedreturndate){

existdate.noofdays= Math.ceil((today - new Date(existdate.expectedreturndate)) / (1000 * 60 * 60 * 24));
existdate.penalty.haspeanlty=true;
existdate.penalty.amount=existdate.noofdays*10;
existdate.penalty.reason="Due date and late renewed"
existdate.penalty.paymentmethod="Unpaid";

}

existdate.renewdate=today;
existdate.status="renewed";
existdate.expectedreturndate=nextdate;
existdate.renewdapprovedby=req.user._id;
existdate.renewhistory.push({
        renewdate:today,
        newduedate:nextdate,
        approveby:req.user._id
});

await existdate.save();
return res.status(200).json({sucess:true,message:"Book is renewed Successfully ",existdate})
}
//no returns 
else if(status==="lost"){

if(today>existdate.expectedreturndate){
console.log(existdate.expectedreturndate);
existdate.noofdays= Math.ceil((today - new Date(existdate.expectedreturndate)) / (1000 * 60 * 60 * 24));
existdate.penalty.amount=existdate.noofdays*10+book.price;//140+40=180
existdate.penalty.reason="Due Date and lost book";

}else{

    existdate.penalty.amount=book.price; //140
    existdate.penalty.reason="lost book";

}

existdate.status="lost";
existdate.penalty.haspeanlty=true;
existdate.penalty.paymentmethod="Unpaid";
existdate.updatedby=req.user._id;
await existdate.save();

return res.status(200).json({sucess:true,message:"Book is lost and reported Successfully ",existdate})
}


  res.status(400).json({sucess:false,message:"Invalid Status choose the correct "});


} catch (error) {
    console.log(error);
     res.status(500).json({sucess:false,message:"Internal server error"})
}
};
export default updateborrow;











