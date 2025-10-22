
import users from "../../models/user.js";
import bcrypt from "bcrypt" 

const updateEmployee=async(req,res) =>{
    try{

        const {
            firstname,
            lastname,
            email,
            dept,
            password,
            phonenumber,
            employeeid
        }=req.body;

        const {id}=req.params;


        const user=await users.findById(id);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        
        if(!firstname ||!lastname||! email || !dept || !password  || !phonenumber){
            return res.status(400).json({success:false,message:"All fields are required"});
        }

        if(firstname===user.firstname && lastname===user.lastname &&email === user.email && dept === user.dept 
            && phonenumber === user.phonenumber && bcrypt.compare(password,user.password)){

            return res.status(400).json({success:false,message:"No Changes are Made"});
        }


        const hashedpassword=await bcrypt.hash(password,10);

        const updatedata={
            firstname,
            lastname,
            email,
            dept,
            password:hashedpassword,
            phonenumber,
            employeeid
        };
           
 
      await users.findByIdAndUpdate(id,updatedata,{
            new:true,
            runValidators:true
        });

        res.status(200).json({success:true,message:"User updated successfully",data:updatedata})
        

    }
    catch(error){
        console.log("Error",error);
        res.status(500).json({sucess:false,message:"Internal server error"})
    }
}
export default updateEmployee;