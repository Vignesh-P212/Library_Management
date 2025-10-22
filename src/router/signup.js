import Student from "../controller/studentRegister/register.js";
import getalluser from "../controller/studentRegister/getalluser.js"
import updateuser from "../controller/studentRegister/updateuser.js"
import deleteuser from "../controller/studentRegister/deleteuser.js"

import {adminEmp} from "../utils/role.js";

import express from "express";
import protect from "../utils/authmiddleware.js";
 export const router=express.Router();

 router.post("/signup",Student);
 router.get("/alluser",protect,adminEmp,getalluser);
 router.put("/updateusr/:id",protect,updateuser);
 router.delete("/deleteuser/:id",protect,deleteuser);



  export default router;