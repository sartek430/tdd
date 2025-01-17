import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Ouvrir la base de données
export const openDb = async () => {
  return open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
};
