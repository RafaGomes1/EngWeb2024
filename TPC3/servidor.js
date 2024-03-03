var http = require("http")
var fs = require(("fs"))
var url = require("url")
var axios = require("axios")

http.createServer((req,res) => {
    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})

    var q = url.parse(req.url,true)

    if(q.pathname == "/") {
        res.write("<url>")
        res.write("<li><a href='/filmes'> Lista de Filmes</a></li>")
        res.write("<li><a href='/atores'> Lista de Atores</a></li>")
        res.write("<li><a href='/generos'> Lista de Géneros</a></li>")
        res.write("</url>")
        res.end()
    }
    else if(q.pathname == "/filmes") {
        axios.get("http://localhost:3000/filmes")
        .then((resp) => {
            let lista = resp.data

            res.write("<url>")
            for (i in lista) {
                res.write("<li><a href='/filmes/" + lista[i].id + "'>" + lista[i].title + "</a></li>")
            }
            res.write("</url>")
            res.end()
        }).catch(erro => {
            console.log("Erro: " + erro)
        })
    }
    else if(q.pathname == "/atores") {
        axios.get("http://localhost:3000/atores")
        .then((resp) => {
            let lista = resp.data

            res.write("<url>")
            for (i in lista) {
                res.write("<li><a href='/atores/" + lista[i].id + "'>" + lista[i].ator + "</a></li>")
            }
            res.write("</url>")
            res.end()
        }).catch(erro => {
            console.log("Erro: " + erro)
        })
    }
    else if(q.pathname == "/generos") {
        axios.get("http://localhost:3000/generos")
        .then((resp) => {
            let lista = resp.data

            res.write("<url>")
            for (i in lista) {
                res.write("<li><a href='/generos/" + lista[i].id + "'>" + lista[i].genero + "</a></li>")
            }
            res.write("</url>")
            res.end()
        }).catch(erro => {
            console.log("Erro: " + erro)
        })
    }
    else if(q.pathname.startsWith("/filmes/")) {

        var filmeId = q.pathname.slice("/filmes/".length)

        axios.get(`http://localhost:3000/filmes/${filmeId}`)
        .then((resp) => {
            let filme = resp.data
            res.write(`<url>`)
            res.write(`<li> ID: ${filme.id} </li>`);
            res.write(`<li> Título: ${filme.title} </li>`);
            res.write(`<li> Ano: ${filme.year} </li>`);

            res.write('<li> Atores:');
            res.write("<ul>")
            for (let ator of filme.cast) {
                res.write(`<li>${ator}</li>`);
            }
            res.write('</ul></li>');

            res.write('<li> Género: <ul>');
            for (let genero of filme.genres) {
                res.write(`<li>${genero}</li>`);
            }
            res.write('</ul></li>');

            res.write(`</url>`)
            res.end()
        }).catch(erro => {
            console.log("Erro: " + erro)
        })
    }
    else if(q.pathname.startsWith("/atores/")) {

        var atorId = q.pathname.slice("/atores/".length)

        axios.get(`http://localhost:3000/atores/${atorId}`)
        .then((resp) => {
            let ator = resp.data
            res.write(`<url>`)
            res.write(`<li> ID: ${ator.id} </li>`);
            res.write(`<li> Nome: ${ator.ator} </li>`);

            res.write('</ul></li>');

            res.write('<li> Filmes: <ul>');
            for (let filme of ator.filmes) {
                res.write("<li><a href='/filmes/" + filme["id"] + "'>" + filme["nome"] + "</a></li>");
            }
            res.write('</ul></li>');

            res.write(`</url>`)
            res.end()
        }).catch(erro => {
            console.log("Erro: " + erro)
        })
    }
    else if(q.pathname.startsWith("/generos/")) {

        var generoId = q.pathname.slice("/generos/".length)

        axios.get(`http://localhost:3000/generos/${generoId}`)
        .then((resp) => {
            let genero = resp.data
            res.write("<url>")
            res.write(`<li> ID: ${genero.id} </li>`);
            res.write(`<li> Género: ${genero.genero} </li>`);

            res.write('<li> Filmes: <ul>');
            for (let filme of genero.filmes) {
                res.write("<li><a href='/filmes/" + filme["id"] + "'>" + filme["nome"] + "</a></li>");
            }
            res.write('</ul></li>');

            res.write("</url>")
            res.end()
        }).catch(erro => {
            console.log("Erro: " + erro)
        })
    }
    else {
        res.write("Operação não é suportada")
        res.end()
    }
}).listen(1902)