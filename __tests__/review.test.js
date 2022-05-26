// const request = require("supertest");
// const app = require("../app");

// describe("POST /reviews", () => {
//   const review = {
//     review: "first review",
//     user: "bafrsa@gmail.com",
//     hotel_id: 2,
//     rating: 4,
//   };
//   test("Should fail if no review or user", async () => {
//     const res = await request(app)
//       .post("/api/v1/hotels/3/reviews")
//       .send(review);

//     expect(res.body.status).toBe("fail");
//   });
//   test("Should fail if user has not been to the hotel ", async () => {
//     const res = await request(app)
//       .post("/api/v1/hotels/314/reviews")
//       .send(review);

//     expect(res.body).toStrictEqual({
//       status: "fail",
//       data: "You can only review an hotel you booked",
//     });
//   });
//   test("Should fail if user has already reviewed the hotel ", async () => {
//     const res = await request(app)
//       .post("/api/v1/hotels/314/reviews")
//       .send(review);

//     expect(res.body).toStrictEqual({
//       status: "fail",
//       data: "You can only review an hotel once",
//     });
//   });

//   test("Should fail if ratings is not in 1-5 range ", async () => {
//     const res = await request(app)
//       .post("/api/v1/hotels/314/reviews")
//       .send(review);

//     expect(res.body.status).toBe("fail");
//   });

//   test("Should pass if everything is fine ", async () => {
//     const res = await request(app)
//       .post("/api/v1/hotels/314/reviews")
//       .send(review);

//     expect(res.body.status).toBe("success");
//   });
// });
