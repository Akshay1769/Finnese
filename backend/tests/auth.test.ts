import request from "supertest";
import app from "../src/app";
import connectDatabase from "../src/config/database";
import mongoose from "mongoose";

beforeAll(async () => {
  await connectDatabase();
});

describe("Auth Routes", () => {

  test("GET / should return success", async () => {

    const response =
      await request(app)
        .get("/");

    expect(response.status)
      .toBe(200);

    expect(response.body.success)
      .toBe(true);

  });

  test(
    "POST /api/v1/auth/register should create user",
    async () => {

      const uniqueEmail =
        `test${Date.now()}@gmail.com`;

      const response =
        await request(app)
          .post("/api/v1/auth/register")
          .send({
            firstName: "Test",
            lastName: "User",
            email: uniqueEmail,
            password: "Password123",
            phoneNumber: "9999999999",
          });

      expect(response.status)
        .toBe(201);

      expect(response.body.success)
        .toBe(true);

    }
  );

 test(
  "POST /api/v1/auth/login should return JWT token",
  async () => {

    const uniqueEmail =
      `login${Date.now()}@gmail.com`;

    const password =
      "Password123";

    await request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: "Login",
        lastName: "Test",
        email: uniqueEmail,
        password,
        phoneNumber: "9999999999",
      });

    const response =
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: uniqueEmail,
          password,
        });

    expect(response.status)
      .toBe(200);

    expect(response.body.success)
      .toBe(true);

    expect(response.body.token)
      .toBeDefined();

    }
  );

  test(
  "POST /api/v1/auth/login should fail with wrong password",
  async () => {

    const uniqueEmail =
      `wrong${Date.now()}@gmail.com`;

    await request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: "Wrong",
        lastName: "Password",
        email: uniqueEmail,
        password: "Password123",
        phoneNumber: "9999999999",
      });

    const response =
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: uniqueEmail,
          password: "WrongPassword",
        });

    expect(response.status)
      .toBe(400);

    expect(response.body.success)
      .toBe(false);

  }
);

test(
    "GET /api/v1/auth/profile without token should fail",
    async () => {

      const response =
        await request(app)
          .get("/api/v1/auth/profile");

      expect(response.status)
        .toBe(401);

      expect(response.body.success)
        .toBe(false);

    }
  );

  test(
  "GET /api/v1/auth/profile with valid token should return user",
  async () => {

    const uniqueEmail =
      `profile${Date.now()}@gmail.com`;

    const password =
      "Password123";

    await request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: "Profile",
        lastName: "Test",
        email: uniqueEmail,
        password,
        phoneNumber: "9999999999",
      });

    const loginResponse =
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: uniqueEmail,
          password,
        });

    const token =
      loginResponse.body.token;

    const profileResponse =
      await request(app)
        .get("/api/v1/auth/profile")
        .set(
          "Authorization",
          `Bearer ${token}`
        );

    expect(profileResponse.status)
      .toBe(200);

    expect(profileResponse.body.success)
      .toBe(true);

    expect(profileResponse.body.user)
      .toBeDefined();

  }
);


  afterAll(async()=> {
    await mongoose.disconnect()
  });

});