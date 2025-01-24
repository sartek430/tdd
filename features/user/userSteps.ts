import {
  binding,
  given,
  then,
  when,
  beforeAll,
  afterAll,
} from "cucumber-tsflow";
import { User } from "../../src/models/userModel";
import { app } from "../../src";
import { openDb } from "../../src/config/database";
import dotenv from "dotenv";
import fs from "fs";
import { assert } from "chai";
const request = require("supertest");
dotenv.config();

@binding()
class UserSteps {
  private user: User = {
    email: "",
    password: "",
  };
  private response: any;

  @beforeAll()
  public async setupDatabase(): Promise<void> {
    const db = await openDb();
    const createTableSql = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`;
    db.run(createTableSql);
  }

  @afterAll()
  public async closeDatabase(): Promise<void> {
    const db = await openDb();
    db.close();
    fs.unlinkSync(process.env.DB_PATH as string);
  }

  @given("my email is {string} and my password is {string}")
  public givenACustomer(email: string, password: string): void {
    this.user.email = email;
    this.user.password = password;
  }

  @when("i register an account")
  public async whenregisterUser(): Promise<void> {
    this.response = await request(app).post("/users/register").send(this.user);
  }

  @then("my account is created")
  public accountCreated(): void {
    assert.equal(this.response.status, 201);
  }
}

export = UserSteps;
