import getallnotifify from "../controller/notification/getnotification.js";
import {markNotificationAsRead} from "../controller/notification/updatenotification.js";
// import updateimage from "../controller/signup/image.js";


import express from "express";
import protect from "../utils/authmiddleware.js";
 const router=express.Router();

 router.get("/getnotify",getallnotifify);
 router.put("/updateseen",markNotificationAsRead);
//  router.put("/upload",updateimage);



 export default router;