"use strict";
const { Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const { createOtherError } = require("../utils/utils");

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {}
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Hotel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { args: true, msg: "name is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "price is required" },
        },
      },
      priceDiscount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "price discount is required" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
    },

    {
      sequelize,
      modelName: "Hotel",
    }
  );
  SequelizeSlugify.slugifyModel(Hotel, {
    source: ["name"],
  });

  Hotel.beforeCreate((hotel) => {
    if (hotel.priceDiscount > 0.1 * hotel.price) {
      let err = createOtherError(
        "discount cannot be more than 10% of the price"
      );

      throw err;
    }
  });
  return Hotel;
};
