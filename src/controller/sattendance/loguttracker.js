import student from "../../models/attendanc.js";


const recordlogut=async(id)=>{

// const id=req.user._id;
// console.log(id);


const today=new Date();
//10/08== 12:00 am 12pm 
const startofday=new Date(today.setHours(0,0,0,0));//12AM after date
const endofday=new Date(today.setHours(23,59,59,59));//11:59PM before data 
//10/08== 12:00 am 12pm 
const existdate= await student.findOne({studentid:id,date:{$gte:startofday,$lte:endofday},});

console.log(existdate);

if(!existdate){
    return {success:false, message:"Error in logout"}
}else{
    
     const length=   existdate.session.length; 
          
    const lastSession = existdate.session[length-1];

    lastSession.logouttime = new Date();  // directly set the logouttime property
    await existdate.save();
    
    return {success:true, message:"Logout recorded successfully"}
}


}
export default recordlogut;
