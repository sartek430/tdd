import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
