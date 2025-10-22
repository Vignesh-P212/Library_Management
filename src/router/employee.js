import Employee from "../controller/employee/createEmployee.js";
import getallemployee from "../controller/employee/getallEmployee.js";
import updateEmployee from "../controller/employee/updateEmployee.js";
import deleteemployee from "../controller/employee/deleteEmployee.js";

import {adminonly} from "../utils/role.js";

import express from "express";
import protect from "../utils/authmiddleware.js";
 const router=express.Router();

 router.post("/employee",protect,adminonly,Employee);
 router.get("/alluser",protect,adminonly,getallemployee);
 router.put("/updateusr/:id",protect,adminonly,updateEmployee);
 router.delete("/deleteuser/:id",protect,adminonly,deleteemployee);



 export default router;