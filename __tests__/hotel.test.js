const request = require("supertest");
const app = require("../app");

describe("POST /hotels", () => {
  const hotel = {
    name: "e hotel",
    price: 0,
    priceDiscount: 0,
    description: "the amazing hotel",
    mainImage: "ghhd",
    services: ["cooking", "bakery"],
    contacts: [{ phone: 7847589, email: "bafra@gmail.com" }],
  };
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

  xtest("Should throw an error if  any  field is not provided", async () => {
    const res = await request(app).post("/api/v1/hotels").send(hotel);
    console.log(res.body);
    expect(res.body.status).toBe("fail");
  });

  xtest("Should throw an error if  any field value is an empty string", async () => {
    const res = await request(app).post("/api/v1/hotels").send({ name: "" });

    expect(res.body.status).toBe("fail");
  });
  xtest("Should throw an error if  priceDiscount more than 10% of the real price", async () => {
    const res = await request(app).post("/api/v1/hotels").send(hotel);

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "discount cannot be more than 10% of the price",
    });
  });

  test("Should throw an error if  price is 0", async () => {
    const res = await request(app).post("/api/v1/hotels").send(hotel);
    console.log(res.body);
    expect(res.body).toStrictEqual({
      status: "fail",
      data: "Hotel price cannot be 0",
    });
  });
});
