const request = require("supertest");
const app = require("../app");

describe("POST /hotels", () => {
  const hotel = { name: "hotel one" };
  test("Should have slug when created and status to be success", async () => {
    const res = await request(app).post("/api/v1/hotels").send(hotel);

    expect(res.body.data).toHaveProperty("slug");
    expect(res.body.status).toBe("success");
  });

  test("Should throw an error if its a duplicate entry", async () => {
    const res = await request(app).post("/api/v1/hotels").send(hotel);

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "Hotel  already exists",
    });
  });

  test("Should throw an error if its a name field is not provided", async () => {
    const res = await request(app).post("/api/v1/hotels").send({});

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "Hotel name cannot be null",
    });
  });

  test("Should throw an error if its a name value is and empty string", async () => {
    const res = await request(app).post("/api/v1/hotels").send({ name: "" });

    expect(res.body).toStrictEqual({
      status: "fail",
      data: "name is required",
    });
  });
});
