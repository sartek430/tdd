import dotenv from "dotenv";
dotenv.config();
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");

import express, { Express } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import { UserController } from "./controllers/userControllers";

export const app: Express = express();
const port = 3000;
const userController = new UserController();

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    printMessage(message: String!): String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  quoteOfTheDay() {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  random() {
    return Math.random();
  },
  rollThreeDice() {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
  },
  printMessage: ({ message }: { message: string }) => {
    return `Message reçu: ${message}`;
  },
};

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
