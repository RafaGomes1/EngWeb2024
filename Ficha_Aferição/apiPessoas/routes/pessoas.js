var express = require('express')
var router = express.Router()
var Pessoa = require('../controllers/pessoas')

// GET para buscar a lista de pessoas
router.get('/', function(req, res) {
    Pessoa.list()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// POST de uma pessoa
router.post('/', function(req, res) {
  Pessoa.create(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// DELETE de uma pessoa
router.delete('/:id', function(req, res) {
  Pessoa.delete(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// PUT de uma pessoa
router.put('/:id', function(req, res) {
  Pessoa.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// GET de uma pessoa singular
router.get('/:id', function(req, res) {
  Pessoa.findByID(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// GET lista de modalidades
router.get('/modalidades', function(req,res) {
  Pessoa.listaModalidades()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// GET de atletas de uma modalidade
router.get('/modalidades/:modalidade', function(req, res){
  Pessoa.listaAtletasModalidade(req.params.modalidade)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});


module.exports = router