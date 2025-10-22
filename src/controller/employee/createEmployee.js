import user from "../../models/user.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";


const Employee= async(req,res) => {
   
try{
    const{
        firstname,
        lastname,
        email,
        password,
        dept,
        role,
        phonenumber,
        employeeid,
    }=req.body;


    if(!firstname || !lastname || !email || !password){
        return res.status(400).json({sucess:false,message:"All fields are required"})
    }
 

   const existinguser= await user.findOne({email:email});
    
   if(existinguser){
    return res.status(400).json({sucess:false,message:"User Email is already exist"});
    }
        
    const hashedpassword=await bcrypt.hash(password,10);

    const data=new user({
       firstname,
        lastname,
        email,
        dept,
        role,
        password:hashedpassword,
        phonenumber,
        employeeid
    });

  await data.save();

  
    
    res.status(201).json({sucess:true,message:"User successfully registered "});


    //STep 1 initial
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })    

    //Step 2 Format 
    const mailoption={
        from:process.env.EMAIL_USER,
        to:email,
        Subject:"Employee Account ",
        text:`Hello ${firstname},\n\n Welcom to our Library Management.\n\n Thanks & Regards,\n Your College`
    
    };
        
        //step 3 send mail      
        await transporter.sendMail(mailoption);



   
}catch(error){
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})
}   
};
export default Employee;