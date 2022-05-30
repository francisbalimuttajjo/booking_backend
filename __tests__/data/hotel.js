const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEyNzY3OGRlLWRkMWEtNDdlMy1hNzlkLWZiOTkwYzUwOGExZiIsImlhdCI6MTY1MzkwMDgzOCwiZXhwIjoxNjU0NzY0ODM4fQ.WGyGNdicN4hd9-xJA2XKst6VwJXvv_guS217pSLTINI";
exports.obj = {
  hotel: {
    name: "test hotel",
    price: 10000,
    priceDiscount: 100,
    description: "the amazing hotel",
    mainImage: "ghhd",
    services: ["cooking", "bakery"],
    contacts: [{ phone: 7847589, email: "bafra@gmail.com" }],
    token,
  },
  hotel1: {
    price: 10000,
    priceDiscount: 100,
    description: "the amazing hotel",
    mainImage: "ghhd",
    services: ["cooking", "bakery"],
    contacts: [{ phone: 7847589, email: "bafra@gmail.com" }],
    token,
  },
  hotel2: {
    name: "",
    price: 10000,
    priceDiscount: 100,
    description: "the amazing hotel",
    mainImage: "ghhd",
    services: ["cooking", "bakery"],
    contacts: [{ phone: 7847589, email: "bafra@gmail.com" }],
    token,
  },

  hotel3: {
    name: "new hotel",
    price: 10000,
    priceDiscount: 1100,
    description: "the amazing hotel",
    mainImage: "ghhd",
    services: ["cooking", "bakery"],
    contacts: [{ phone: 7847589, email: "bafra@gmail.com" }],
    token,
  },

    hotel4: {
        name: "new hotel",
        price: 0,
        priceDiscount: 0,
        description: "the amazing hotel",
        mainImage: "ghhd",
        services: ["cooking", "bakery"],
        contacts: [{ phone: 7847589, email: "bafra@gmail.com" }],
        token
    }
      
};
