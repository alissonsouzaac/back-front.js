const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
	corpo: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	perguntaID:{
		type: Sequelize.INTERGER,
		allowNull: false
	}
});

Resposta.sync({force:false});

module.exports = Resposta;