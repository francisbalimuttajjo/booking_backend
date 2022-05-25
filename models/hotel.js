"use strict";
const { Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

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
  return Hotel;
};
