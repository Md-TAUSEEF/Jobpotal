import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user_route.js"
import companyRoute from "./routes/company_route.js"
import jobRoute from "./routes/job_router.js";
import applicationRoute from "./routes/applicatin_route.js";
dotenv.config({})
import connectDB from "./util/db.js";



import path from "path";
const __dirname1 = path.resolve();



const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application", applicationRoute);



// Serve frontend static files
app.use(express.static(path.join(__dirname1, "frontend/build")));

// Catch-all route for React
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname1, "frontend/build", "index.html"));
});




app.listen(PORT, () => {
    connectDB();
    console.log(`listening port ${PORT}`);
});



