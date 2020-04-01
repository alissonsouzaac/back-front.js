const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta = require("./database/perguntas");
const Resposta = require("./database/resposta")
//database

connection.authenticate().then(() =>{
	console.log("conexão feita com o banco de dados");

}).catch((msgErro) => {
	console.log(msgErro);
})


//faz o express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlenconded({extended: false}));
app.use(bodyParser.json());
//rotas
app.get("/",(req,res) => {
	Pergunta.findAll({ raw: true, order:[
			['id','DESC']// ASC = crescente || DESC = decrescente
		]}).then(perguntas => {
		res.render("index",{
			perguntas: perguntas
		});//rendesenha desenha alguma coisa na tela
	});
	
});

app.get("/perguntar",(req,res) => {
	res.render("perguntar");
})

app.post("/salvarpergunta",(req.res) =>{
	var titulo = req.body.titulo;
	var descricao = req.body.descricao;
	Pergunta.create({
		titulo: titulo,
		descricao: descricao
	}).then(() => {
		res.redirect("/");
	});
	res.send("formulario recebido! titulo:" + titulo + "_" + "descricao:" + descricao);
});

app.get("/pergunta/:id",(req, res) => {
	var id = req.params.id;
	pergunta.findOne({
		where: {id: id}
	}).then(pergunta => {
		if(pergunta != undefined){//pergunta encontrada
			
			Resposta.findAll({
				where: {perguntaID: pergnta.id}
				order:[ ['id', 'DESC'] ]
			}).then(respostas => {
				res.render("pergunta", {
				pergunta: pergunta,
				respostas: respostas
			});
		});
			
		}else{//pergunta não encontrada
			res.redirect("/");
		}
	});
});

app.post("/responder",(req, res) => {
	var corpo = req.body.corpo;
	var perguntaID = req.body.pergunta;
	Resposta.create({
		corpo: corpo,
		perguntaID: perguntaID
	}).then(() => {
		res.redirect("/pergunta/" + perguntaID);
	});
});

//abrir o servidor
app.listen(8000,()=>{console.log("Servidor rodando");});
