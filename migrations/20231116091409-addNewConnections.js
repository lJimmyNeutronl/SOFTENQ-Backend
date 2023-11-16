module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.addColumn('Wishlist', 'customer_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
              model:'Customers',
              key:'id'
            }
        }, {
            transaction,
        }),
        queryInterface.addColumn('ShoppingCart', 'customer_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'Customers',
            key:'id'
          }
      }, {
          transaction,
      }),
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.removeColumn('Wishlist', 'customer_id',{transaction}),
        queryInterface.removeColumn('ShoppingCart','customer_id',{transaction})
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
