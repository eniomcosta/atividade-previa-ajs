import { Database } from "sqlite";
import sqlite3 from "sqlite3";

export const db = new Database({
  driver: sqlite3.Database,
  filename: ":memory:",
});
