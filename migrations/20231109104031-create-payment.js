'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Orders',
          key:'id'
        }
        
      },
      customer_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Customers',
          key:'id'
        }
      },
      date: {
        type: Sequelize.DATE
      },
      method: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};