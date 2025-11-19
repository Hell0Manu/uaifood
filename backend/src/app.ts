// src/app.ts

import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);


app.get("/", (req, res) => {
  res.json({ message: "UaiFood API rodando! 🚀" });
});

export default app;