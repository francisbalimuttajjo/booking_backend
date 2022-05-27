const { Op } = require("sequelize");

// function
exports.getSearchQuery = (query) => {
  let Query = {};

  if (query.name) Query.name = { [Op.like]: `%${query.name}%` };
  if (query.slug) Query.slug = { [Op.like]: `%${query.slug}%` };
  if (query.price) Query.price = parseInt(query.price);
  Query.page = query.page ? query.page : 0;
  Query.limit = query.limit ? query.limit : 4;
  const limit = Query.limit;
  const page = Query.page;

  delete Query["page"];
  delete Query["limit"];

  return { Query, limit, page };
};
