var express = require('express')
var router = express.Router()
var compositor = require('../controllers/compositores');

// GET da Lista de todos os Compositores
router.get('/', function(req, res) {
    compositor.list()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// POST para criar um novo Compositor
router.post('/', function(req, res) {
    compositor.create(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// DELETE para eliminar um Compositor
router.delete('/:id', function(req, res) {
    compositor.delete(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

  // PUT atualizar a info de um Compositor
router.put('/:id', function(req, res) {
    compositor.update(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// GET para buscar um Compositor pelo ID
router.get('/:id', function(req, res) {
    compositor.findByID(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
})

module.exports = router;