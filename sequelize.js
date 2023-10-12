const Sequilize = require('sequelize')

const sequelize = new Sequilize('myfirstdatabase', 'arseniy', 'qwerty', {
  host: 'localhost',
  dialect: 'postgres',
})

async function init(){
  try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
  }
}

init();