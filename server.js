import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const bootstrap = async () => {
  const app = express();
  const server = http.createServer(app);

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));

  await mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(err);
    });

  app.use(bodyParser.json());

  app.use("/tasks", taskRoutes);
  app.use("/users", userRoutes);
  return { app, server };
};

export default bootstrap;
