const checkrole=(...allowedrole)=>{
    return(req,res,next) => {
        const role=req.user.role;
        if(!allowedrole.includes(role)){
           return res.status(402).json({success:false,message:"Acccess Denied"});
        }
        next();
    };
};

export const adminonly=checkrole("Admin")
export const adminEmp=checkrole("Admin","Employee")
export const adminStudent=checkrole("Admin","Student")
export const staffonly=checkrole("Staff")
export const studentonly=checkrole("Student")
export const allrole=checkrole("Admin","Staff","Student")