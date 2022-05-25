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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "description is required" },
        },
      },
      mainImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "mainimage is required" },
        },
      },
      services: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
        get() {
          return this.getDataValue("services");
        },
      },
      contacts: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: [],
        get() {
          return this.getDataValue("contacts");
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
    } else if (hotel.price <= 0) {
      let err = createOtherError("Hotel price cannot be 0");

      throw err;
    }
  });
  return Hotel;
};
