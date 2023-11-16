module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.addColumn('Payments', 'method_new', {
            type: Sequelize.ENUM('картой','наличными','картой при получении'),
            allowNull: true,
        }, {
            transaction,
        }),
        queryInterface.removeColumn('Payments', 'method', {transaction}),
        queryInterface.renameColumn('Payments','method_new','method',{transaction}),

        queryInterface.addColumn(
          'Products',
          'pictires_id', 
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references:{
              model:'Pictures',
              key:'id'
            }
      }, {
          transaction,
      }),

      queryInterface.addColumn('Orders', 'state_new', {
        type: Sequelize.ENUM('заказ создан','на подтверждении','продавец собирает заказ','товары отправлены','товар можно забрать','получена'),
        allowNull: true,
    }, {
        transaction,
    }),
      queryInterface.removeColumn('Orders','state',{transaction}),
      queryInterface.renameColumn('Orders','state_new','state',{transaction}),

      queryInterface.addColumn(
        'Products',
        'SDK', 
        {
          type: Sequelize.STRING,
          allowNull: true,
    }, {
        transaction,
  })
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
        queryInterface.addColumn('Payments ', 'method_new', {
            type: Sequelize.INTEGER,
            allowNull: true,
        }, {
            transaction,
        }),
        queryInterface.removeColumn('Payments','method',{transaction}),
        queryInterface.renameColumn('Payments','method_new','method',{transaction}),

        queryInterface.removeColumn('Products','puctures_id',{transaction}),

        queryInterface.addColumn('Orders', 'state_new', {
          type: Sequelize.INTEGER,
          allowNull: true,
      }, {
          transaction,
      }),
        queryInterface.removeColumn('Orders','state',{transaction}),
        queryInterface.renameColumn('Orders','state_new','state',{transaction}),

        queryInterface.removeColumn('Products','SDK',{transaction})      
      ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
