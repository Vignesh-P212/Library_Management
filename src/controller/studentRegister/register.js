import register from "../../models/register.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";


const Student= async(req,res) => {
   
try{
    const{
        firstname,
        lastname,
        email,
        password,
        dept,
        role,
        phonenumber,
    }=req.body;


    if(!firstname || !lastname || !email || !password||!dept){
        return res.status(400).json({sucess:false,message:"All fields are required"})
    }
    let value;
    if(role=="Student"){
        value=3;
    }else{
        value=5;
    }

   const existinguser= await register.findOne({email:email});
    
   if(existinguser){
    return res.status(400).json({sucess:false,message:"User Email is already exist"});
    }
        
    const hashedpassword=await bcrypt.hash(password,10);

    const data=new register({
       firstname,
        lastname,
        email,
        dept,
        role,
        password:hashedpassword,
        phonenumber,
        limit:value, 
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
        Subject:"Library Account created",
        text:`Hello ${firstname},\n\n Your are successfully registered with Library Management .\n\n Thanks & Regards,\n Your College`
    
    };
        
        //step 3 send mail      
        await transporter.sendMail(mailoption);



   
}catch(error){
    console.log("Error",error);
    res.status(500).json({sucess:false,message:"Internal server error"})
}   
};
export default Student;