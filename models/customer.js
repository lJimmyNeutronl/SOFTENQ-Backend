'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsToMany(models.Role,
        {
          through: 'UserRoles', 
          foreignKey: 'userId',
          as: 'roles'
        })
      Customer.hasMany(models.Payment,
        {
          foreignKey:'customer_id',
          as:'payments'
        })
      Customer.hasOne(models.Wishlist)
      Customer.hasOne(models.ShoppingCart)
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};