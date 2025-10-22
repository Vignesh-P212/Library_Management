import express from "express"
import login from "../controller/Session/login.js";
import logout from "../controller/Session/logout.js"; 
import protect from "../utils/authmiddleware.js"; 
 const router=express.Router(); 
 router.post("/login",login);
 router.get("/logout",protect,logout);
 export default router;

