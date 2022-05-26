"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user",
        as: "author",
        targetKey: "email",
      });
      this.belongsTo(models.Hotel, {
        foreignKey: "hotel_id",
        as: "hotel",
      });
    }
    toJSON() {
      return {
        ...this.get(),
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Review.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "review must belong to a hotel" },
        },
      },

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
        validate: {
          min: 1,
          max: 5,
        },
      },

      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: "Please provide a valid email" },
          notEmpty: true,
        },
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
