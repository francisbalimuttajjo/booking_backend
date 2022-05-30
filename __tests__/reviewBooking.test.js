const request = require("supertest");
const app = require("../app");
const db = require("../models");
const { token } = require("../data/hotel");

let id;

const objBooking = {
  booking: {
    user: "test_user_booking@gmail.com",
    checkin_date: "tuesday",
    nights: 2,
    cash_paid: 5000,
    token,
  },
  booking1: {
    checkin_date: "tuesday",
    nights: 2,
    cash_paid: 5000,
    token,
  },
};

const obj = {
  review: {
    review: "first review",
    user: "test_user_booking@gmail.com",
    rating: 4,
  },

  review3: {
    review: "first review",
    user: "booking@gmail.com",
    rating: 7,
  },
};

describe("POST /booking", () => {
  test("Should return success ", async () => {
    await db.Review.destroy({ where: { user: "fbalimuttajjo@gmail.com" } });
    const res = await request(app)
      .post("/api/v1/hotels/1/booking")
      .send(objBooking.booking)
      .set({ token });

    id = res.body.data.id;
    expect(res.body.status).toBe("success");
  });
});

describe("POST /reviews", () => {
  test("Should fail if ratings is not in 1-5 range ", async () => {
    const res = await request(app)
      .post("/api/v1/hotels/1/reviews")
      .send(obj.review3)
      .set({ token });
  
    expect(res.body.status).toBe("fail");
  });

  test("Should pass if everything is fine ", async () => {
    const res = await request(app)
      .post("/api/v1/hotels/1/reviews")
      .send(obj.review)
      .set({ token });
  
    expect(res.body.status).toBe("success");
  });
});

describe("/booking ,DELETE", () => {
  test("Should return success after deleting booking ", async () => {
    const res = await request(app)
      .delete(`/api/v1/booking/${id}`)
      .set({ token });
    expect(res.body.status).toBe("success");
  });
});
