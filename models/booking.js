"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user",
        as: "booking_owner",
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
  Booking.init(
    {
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: "Please provide a valid email" },
          notEmpty: { args: true, msg: "booking must belong to a user" },
        },
      },
      hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "booking must belong to an hotel" },
        },
      },
      checkin_date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "date is required" },
        },
      },
      nights: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          notEmpty: { args: true, msg: "field is required" },
        },
      },
      cash_paid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "field is required" },
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
