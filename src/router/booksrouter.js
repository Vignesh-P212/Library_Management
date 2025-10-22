import book from "../controller/booksmanagement/createbook.js";
import getbook from "../controller/booksmanagement/getbooks.js";
import getbookbyid from "../controller/booksmanagement/getbookbyid.js";
import updatebook from "../controller/booksmanagement/updatebook.js";
import deletbook from "../controller/booksmanagement/deletebook.js";
import express from "express";
import protect from "../utils/authmiddleware.js";
import {adminEmp} from "../utils/role.js";
 const router=express.Router();


router.post("/create",protect,adminEmp,book);
router.get("/getall",protect,getbook);
router.get("/getbyid",protect,getbookbyid);
router.put("/updatebook/:id",protect,updatebook);
router.delete("/deletebook/:id",protect,deletbook);


 export default router;