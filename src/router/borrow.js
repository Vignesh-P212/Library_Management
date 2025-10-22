import express from "express";
import protect from "../utils/authmiddleware.js";
import {adminEmp} from "../utils/role.js";
import createborrow from "../controller/borrow&return/createborrow.js";
import updateborrow from "../controller/borrow&return/updateborrow.js";
 const router=express.Router();


router.post("/createborrow",protect,adminEmp,createborrow);
// router.get("/getall",protect,getbook);
// router.get("/getbyid",protect,getbookbyid);
router.put("/updatebook",protect,updateborrow);
// router.delete("/deletebook/:id",protect,deletbook);


 export default router;