var http = require("http")
var url = require("url")
var axios = require("axios")

http.createServer((req,res) => {
    console.log(req.method + " " + req.url);

    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})

    var q = url.parse(req.url,true)
    
    // Página Inicial
    if (q.pathname == "/") {
        res.write("<url>")
        res.write("<li><a href='/alunos'> Lista de Alunos</a></li>")
        res.write("<li><a href='/cursos'> Lista de Cursos</a></li>")
        res.write("<li><a href='/instrumentos'> Lista de Instrumentos</a></li>")
        res.write("</url>")
        res.end()
    }
    // Página da Lista dos Alunos
    else if (q.pathname == "/alunos") {
        axios.get("http://localhost:3000/alunos")
        .then( (resp) => {
            let lista = resp.data

            res.write("<url>")
            for(i in lista) {
                res.write("<li><a href='/alunos/" + lista[i].id + "'>" + lista[i].nome + "</a></li>")
            }
            res.write("</url>")
            res.end()

        }).catch( erro => {
            console.log("Erro: " + erro);
        })
    }
    // Página da Lista dos Cursos
    else if (q.pathname == "/cursos") {
        axios.get("http://localhost:3000/cursos")
        .then( (resp) => {
            let lista = resp.data

            res.write("<url>")
            for(i in lista) {
                res.write("<li><a href='/cursos/" + lista[i].id + "'>" + lista[i].designacao + "</a></li>")
            }
            res.write("</url>")
            res.end()

        }).catch( erro => {
            console.log("Erro: " + erro);
        })
    }
    // Página da Lista dos Instrumentos
    else if (q.pathname == "/instrumentos") {
        axios.get("http://localhost:3000/instrumentos")
        .then( (resp) => {
            let lista = resp.data

            res.write("<url>")
            for(i in lista) {
                res.write("<li><a href='/instrumentos/" + lista[i].id + "'>" + lista[i]["#text"] + "</a></li>")
            }
            res.write("</url>")
            res.end()

        }).catch( erro => {
            console.log("Erro: " + erro);
        })
    }
    // Página de um respetivo Aluno
    else if (q.pathname.startsWith("/alunos/")) {
        var alunoId = q.pathname.slice("/alunos/".length);

        axios.get(`http://localhost:3000/alunos/${alunoId}`)
        .then((resp) => {
            let aluno = resp.data;

            res.write(`<url>`);
            res.write(`<li> ID: ${aluno.id} </li>`);
            res.write(`<li> Nome: ${aluno.nome} </li>`);
            res.write(`<li> Data de Nascimento: ${aluno.dataNasc} </li>`);
            res.write(`<li> Curso: ${aluno.curso} </li>`);
            res.write(`<li> Ano do Curso: ${aluno.anoCurso} </li>`);
            res.write(`<li> Instrumento: ${aluno.instrumento} </li>`);
            res.write(`</url>`);
            res.end();

        }).catch(erro => {
            console.log("Erro: " + erro);
            res.write("Erro ao obter informações do aluno");
            res.end();
        })
    }

    // Página de um respetivo Curso
    else if (q.pathname.startsWith("/cursos/")) {

        var cursoId = q.pathname.slice("/cursos/".length);
    
        axios.get(`http://localhost:3000/cursos/${cursoId}`)
            .then((resp) => {
                let curso = resp.data;
    
                res.write(`<url>`);
                res.write(`<li> ID: ${curso.id} </li>`);
                res.write(`<li> Designação: ${curso.designacao} </li>`);
                res.write(`<li> Duração: ${curso.duracao} anos </li>`);
                res.write(`<li> Instrumento: ${curso.instrumento["#text"]} </li>`);
                res.write(`</url>`);
                res.end();
    
            }).catch(erro => {
                console.log("Erro: " + erro);
                res.write("Erro ao obter informações do curso");
                res.end();
            });
    }

    // Página de um respetivo Intrumento
    else if (q.pathname.startsWith("/instrumentos/")) {

        var instrumentoId = q.pathname.slice("/instrumentos/".length);
    
        axios.get(`http://localhost:3000/instrumentos/${instrumentoId}`)
            .then((resp) => {
                let instrumento = resp.data;
    
                res.write(`<url>`);
                res.write(`<li> ID: ${instrumento.id} </li>`);
                res.write(`<li> Nome: ${instrumento["#text"]} </li>`);
                res.write(`</url>`);
                res.end();
    
            }).catch(erro => {
                console.log("Erro: " + erro);
                res.write("Erro ao obter informações do instrumento");
                res.end();
            });
    }

    else {
        res.write("Operação não é suportada")
        res.end()
    }
}).listen(1902)

console.log("Servidor à escuta na porta 1902...");