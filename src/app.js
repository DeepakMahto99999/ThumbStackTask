import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import booksRouter from "./routes/book.routes.js";
import dashboardRouter from "./routes/dashboard.route.js";



const app = express()


app.use(express.json())
app.use(cookieParser())


app.use("/api/auth" , authRouter);
app.use("/api/books", booksRouter);
app.use("/api/dashboard", dashboardRouter);

export default app;