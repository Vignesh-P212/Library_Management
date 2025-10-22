import student from "../../models/attendanc.js";
import recordlogut from "./loguttracker.js";

const recordlogin=async(id)=>{

const today=new Date();//2025-10-03T14:26:50.434+00:00
const dateonly=new Date(today.getFullYear(),today.getMonth(),today.getDate());//2025-10-03

const startofday=new Date(today.setHours(0,0,0,0));//12AM after date
const endofday=new Date(today.setHours(23,59,59,59));//11:59PM before data 
//10/08== 12:00 am 12pm 
const existdate= await student.findOne({studentid:id,date:{$gte:startofday,$lte:endofday},});



if(!existdate){
    const data=new student({
        studentid:id,
        date:dateonly,
        session:{logintime:new Date()}

    });
    
    await data.save();
}else{

const lastsession=existdate.session[existdate.session.length-1];


if(!lastsession.logouttime){
    //logut is missing 
   lastsession.logouttime = new Date();
}

    existdate.session.push({logintime:new Date()});
    await existdate.save();

}
}
export default recordlogin;
