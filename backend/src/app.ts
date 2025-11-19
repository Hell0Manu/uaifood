// src/app.ts

import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
const app = express();

app.use(cors());
app.use(express.json());


app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.json({ message: "UaiFood API rodando! 🚀" });
});

export default app;