var compositor = require('../model/compositores');

// Para obter uma Lista de Compositores
module.exports.list = () => {
    return compositor
        .find()
        .sort({nome : 1})
        .exec()
};

// Para encontrar um Compositor pelo seu ID
module.exports.findByID = (id) => {
    return compositor
        .findOne({_id : id})
        .exec()
};

// Para Criar um novo Compositor
module.exports.create = (data) => {
    var newCompositor = new compositor(data)
    return newCompositor.save()
};

// Para Eliminar um Compositor
module.exports.delete = (id) => {
    return pessoa
    .deleteOne({_id : id})
    .exec();
};

// Para Atualizar a info de um Compositor
module.exports.update = (id, newData) => {
    return compositor
    .findByIdAndUpdate(id, newData, {new : true})
    .exec()
};

