import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";

export const app: Express = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
