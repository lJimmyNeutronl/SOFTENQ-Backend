'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasOne(models.Payment)
      Order.belongsTo(models.OrderItem, {foreignKey:'order_item_id'})
    }
  }
  Order.init({
    order_item_id: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    date: DataTypes.DATE,
    state: DataTypes.ENUM('заказ создан','на подтверждении','продавец собирает заказ','товары отправлены','товар можно забрать','получена'),
    country: DataTypes.STRING,
    zip_code: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};