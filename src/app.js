import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// CORS configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// import the routes

import healthCheckRouter from "./routes/healthcheck.routes.js";

import authRouter from "./routes/auth.routes.js"
import projectRouter from "./routes/project.routes.js"



app.use("/api/v1/healthcheck", healthCheckRouter); 
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/projects",projectRouter);

app.get('/', (req, res) => {
  res.send('Hello hmnsh , this is backend !')
})

app.get("/instagram", (req, res) => {
  res.send("this is an instagram page");
});

export default app;