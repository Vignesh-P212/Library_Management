import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connection1 from "./src/config/dbconfig.js";
import student from "./src/router/signup.js";
import employee from "./src/router/employee.js";
import session from "./src/router/session.js"
import notify from "./src/router/notify.js";
import books from "./src/router/booksrouter.js";
import borrows from "./src/router/borrow.js";
import cors from "cors";

import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;

connection1()



const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/api/register/v1",student);
app.use("/api/users/v1",employee);
app.use("/api/notification/v1",notify);
app.use("/api/login/v1",session);
app.use("/api/books/v1",books);
app.use("/api/borrows/v1",borrows);
app.listen(port,()=>{
    console.log(`✅ Server is running on port ${port}`);
})




