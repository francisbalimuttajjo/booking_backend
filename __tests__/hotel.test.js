const request = require("supertest");
const app = require("../app");

describe("POST /hotels", () => {
  const hotel = { name: "hotel one" };
  xtest("Should have slug when created and status to be success", async () => {
    const res = await request(app).post("/api/v1/hotels").send(hotel);

    expect(res.body.data).toHaveProperty("slug");
    expect(res.body.status).toBe("success");
  });

  xtest("Should throw an error if its a duplicate entry", async () => {
    const res = await request(app).post("/api/v1/hotels").send(hotel);

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "Hotel  already exists",
    });
  });

  xtest("Should throw an error if  name field is not provided", async () => {
    const res = await request(app).post("/api/v1/hotels").send({});

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "Hotel name cannot be null",
    });
  });

  xtest("Should throw an error if  name value is an empty string", async () => {
    const res = await request(app).post("/api/v1/hotels").send({ name: "" });

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "name is required",
    });
  });
  test("Should throw an error if  priceDiscount more than 10% of the real price", async () => {
    const res = await request(app)
      .post("/api/v1/hotels")
      .send({ name: "another hotel", price: 100, priceDiscount: 12 });

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "discount cannot be more than 10% of the price",
    });
  });
});
