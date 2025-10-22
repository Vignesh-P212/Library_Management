import getallnotifify from "../controller/notification/getnotification.js";
import updatenotify from "../controller/notification/updatenotification.js";
// import updateimage from "../controller/signup/image.js";


import express from "express";
import protect from "../utils/authmiddleware.js";
 const router=express.Router();

 router.get("/getnotify",getallnotifify);
 router.put("/updateseen",updatenotify);
//  router.put("/upload",updateimage);



 export default router;