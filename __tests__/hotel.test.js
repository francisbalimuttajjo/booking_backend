const request = require("supertest");
const app = require("../app");
const db = require("../models");
const { obj,token } = require("../data/hotel");

describe("POST /hotels", () => {
  test("Should have slug when created and status to be success", async () => {
    await db.Hotel.destroy({ where: { name: "test hotel" } });
    const res = await request(app)
      .post("/api/v1/hotels")
      .send(obj.hotel)
      .set({ token });

    expect(res.body.data).toHaveProperty("slug");
    expect(res.body.status).toBe("success");
    expect(res.statusCode).toBe(201);
  }, 9000);

  test("Should throw an error if its a duplicate entry", async () => {
    const res = await request(app)
      .post("/api/v1/hotels")
      .send(obj.hotel)
      .set({ token });
    expect(res.body.status).toBe("fail");
    expect(res.statusCode).toBe(403);
  });

  test("Should throw an error if  name  field is not provided", async () => {
    const res = await request(app)
      .post("/api/v1/hotels")
      .send(obj.hotel1)
      .set({ token });

    expect(res.body.status).toBe("fail");
  });

  test("Should throw an error if  any field value is an empty string", async () => {
    const res = await request(app)
      .post("/api/v1/hotels")
      .send(obj.hotel2)
      .set({ token });

    expect(res.body.status).toBe("fail");
  });
  test("Should throw an error if  priceDiscount more than 10% of the real price", async () => {
    const res = await request(app).post("/api/v1/hotels").send(obj.hotel3).set({ token })

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "discount cannot be more than 10% of the price",
    });
  });
  test("Should throw an error if  price is 0", async () => {
  

    //removing the test hotel from db
    await db.Hotel.destroy({ where: { name: obj.hotel.name } });
    //doing the test
    const res = await request(app)
      .post("/api/v1/hotels")
      .send(obj.hotel4)
      .set({ token });

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "Hotel price cannot be 0",
    });
  });
});
