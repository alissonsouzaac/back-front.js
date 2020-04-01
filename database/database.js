const Sequelize = require('sequelize');

const connection = new Sequelize('Nodeproje','root','123456',{
	host: 'localhost',
	dialect: 'mysql'
});

module.exports = connection;