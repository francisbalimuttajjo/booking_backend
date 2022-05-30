const request = require("supertest");
const app = require("../app");
const db = require("../models");
const { obj } = require("./data/user");

describe("POST /users/register", () => {
  test("checking if user is created ", async () => {
    await db.User.destroy({ where: { email: "testuser@gmail.com" } });
    const res = await request(app)
      .post("/api/v1/users/register")
      .send(obj.user);
    expect(res.body.status).toBe("success");
  }, 18000);

  test("Should fail if firstName is missing ", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send(obj.user1);
    expect(res.body.status).toBe("fail");
  });

  test("should confirm if right email type is provided ", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send(obj.user2);
    expect(res.body).toStrictEqual({
      status: "fail",
      data: "Please provide a valid email",
    });
  });

  test("password and passwordConfirm must be the same ", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send(obj.user3);
    expect(res.body).toStrictEqual({
      status: "fail",
      data: "passwords must be the same",
    });
  });

  test("checking no duplicate email ", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send(obj.user);
    expect(res.body.status).toBe("fail");
  });
});
