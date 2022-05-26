// const request = require("supertest");
// const app = require("../app");

// describe("POST /users/register", () => {
//   const user = {
//     firstName: "bafra",
//     lastName: "1 ",
//     password: "francis",
//     passwordConfirm: "francis",
//     email: "bafrna@gmail.cyo",
//   };

//   test("Should confirm that no empty fields are passed in ", async () => {
//     const res = await request(app).post("/api/v1/users/register").send(user);
//     expect(res.body.status).toBe("fail");
//   });

//   test("should confirm if right email type is provided ", async () => {
//     const res = await request(app).post("/api/v1/users/register").send(user);
//     expect(res.body).toStrictEqual({
//       status: "fail",
//       data: "Please provide a valid email",
//     });
//   });

//   test("password and passwordConfirm must be the same ", async () => {
//     const res = await request(app).post("/api/v1/users/register").send(user);
//     expect(res.body).toStrictEqual({
//       status: "fail",
//       data: "passwords must be the same",
//     });
//   });

//   test("checking no duplicate email ", async () => {
//     const res = await request(app).post("/api/v1/users/register").send(user);

//     expect(res.body).toStrictEqual({
//       status: "fail",
//       data: "User  already exists",
//     });
//   });

//   test("checking if user is created ", async () => {
//     const res = await request(app).post("/api/v1/users/register").send(user);
//     expect(res.body.status).toBe("success");
//     expect(res.body.data).toHaveProperty("photo");
//   });
// });
