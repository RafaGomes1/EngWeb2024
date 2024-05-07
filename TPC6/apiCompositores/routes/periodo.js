var express = require('express')
var router = express.Router()
var Periodo = require('../controllers/periodos');

router.get('/', function(req, res) {
    Periodo.list()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.post('/', function(req, res) {
    Periodo.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

router.delete('/:id', function(req, res) {
    Periodo.delete(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

router.put('/:id', function(req, res) {
    Periodo.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

router.get('/:id', function(req, res) {
    Periodo.findByID(req.params.id)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})