var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js');            // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if((req.url == "/compositores")){
                    axios.get("http://localhost:3000/compositores?_sort=id")
                        .then(resp => {
                            var compositores = resp.data
                            res.writeHead(200, {"Content-Type" : "text/html"})
                            res.end(templates.CompositorsListPage(compositores, d));
                        })
                        .catch(erro => {
                            console.error("Error fetching compositores:", erro);
                            res.writeHead(501, {"Content-Type" : "text/html"})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if(/\/compositores\/C[0-9]{1,3}/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.CompositorPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == "/compositores/registo") {
                res.writeHead(200, {'Content-Type': "text/html"})
                res.end(templates.CompositorFormPage(d))
                }
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]{1,3}/.test(req.url)){
                    var partes = req.url.split('/')
                    var idComp = partes[3] // [partes.length -1]
                    axios.get('http://localhost:3000/compositores/' + idComp)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.compositorFormEditPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(520, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })
                }
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C[0-9]{1,3}/.test(req.url)){
                    var partes = req.url.split('/')
                    var idComp = partes[3] // [partes.length -1]
                    axios.delete('http://localhost:3000/compositores/' + idComp)
                    .then(resposta => {
                        res.writeHead(200, {'Content-Type': "text/html"})
                        res.end(templates.CompositorPage(resposta.data, d))
                    })
                    .catch( erro => {
                        res.writeHead(521, {'Content-Type': "text/html"})
                        res.end(templates.errorPage(erro, d))
                    })
                }
                else{
                    res.writeHead(404, {'Content-Type': "text/html;charset=utf-8"})
                    // meter a template mais bonitinha e tal
                    res.end(templates.errorPage(`Pedido Não Suportado: ${req.url}`, d))
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/compositores', result)
                            .then(resposta => {
                                res.writeHead(200, {'Content-Type': "text/html"})
                                res.end(templates.CompositorPage(resposta.data, d))
                            })
                            .catch( erro => {
                                res.writeHead(520, {'Content-Type': "text/html"})
                                res.end(templates.errorPage(erro, d))
                            })

                        } else {
                            res.writeHead(200, {'Content-Type': "text/html"})
                            res.end("<p>Unable to collect data from body...</p>")
                        }
                    })
                }
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]{1,3}/.test(req.url)){
                    var partes = req.url.split('/')
                    var idComp = partes[3] // [partes.length -1]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/compositores/' + idComp, result)
                            .then(resposta => {
                                res.writeHead(200, {'Content-Type': "text/html"})
                                res.end(templates.CompositorPage(resposta.data, d))
                            })
                            .catch( erro => {
                                res.writeHead(522, {'Content-Type': "text/html"})
                                res.end(templates.errorPage(erro, d))
                            })

                        } else {
                            res.writeHead(200, {'Content-Type': "text/html"})
                            res.end("<p>Unable to collect data from body...</p>")
                        }
                    })
                }
                else {
                    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
                    res.write("<p>Método POST não suportado: " + req.method + "</p>")
                    //res.write("<p><a href='/'>" + + "</a>")
                    res.end()
                }
                break
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
                res.write("<p>Método não suportado: " + req.method + "</p>")
                res.end()
        }
    }
})

compositoresServer.listen(3040, ()=>{
    console.log("Servidor à escuta na porta 3040...")
})



