import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
