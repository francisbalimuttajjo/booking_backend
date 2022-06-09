const { Op } = require("sequelize");

// function
exports.getSearchQuery = (query) => {
  let Query = {};

  if (query.name) Query.name = { [Op.like]: `%${query.name}%` };
  if (query.slug) Query.slug = { [Op.like]: `%${query.slug}%` };
  if (query.price) Query.price = parseInt(query.price);
  if (query.location)
    Query.physicalLocation = { [Op.like]: `%${query.location}%` };
  Query.page = query.page ? query.page : 0;
  Query.limit = query.limit ? query.limit : 12;
  const limit = Query.limit;
  const page = Query.page;

  delete Query["page"];
  delete Query["limit"];

  let searchQuery = Query;

  if (query.range) {
    const values = query.range.split("-");
    const new_query = {
      [Op.between]: [parseInt(values[0]), parseInt(values[1])],
    };
    searchQuery = { ...Query, price: new_query };
  }

  return { searchQuery, limit, page };
};
