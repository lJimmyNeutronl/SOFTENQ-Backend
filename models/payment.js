'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Customer, {foreignKey:'customer_id'})
      Payment.belongsTo(models.Order,{foreignKey:'order_id'})
    }
  }
  Payment.init({
    order_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    order_id: DataTypes.INTEGER,
    method: DataTypes.ENUM('картой','наличными','картой при получении')
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};