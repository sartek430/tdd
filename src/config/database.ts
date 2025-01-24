import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";
dotenv.config();

// Ouvrir la base de données
export const openDb = async () => {
  return open({
    filename: process.env.DB_PATH as string,
    driver: sqlite3.Database,
  });
};
