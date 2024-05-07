var Periodo = require('../model/periodos');

module.exports.list = () => {
    return Periodo
        .find()
        .sort({_id : 1})
        .exec()
}

module.exports.insert = (periodo) => {
    var newPeriodo = new Periodo(periodo)
    return newPeriodo.save()
}

module.exports.delete = (id) => {
    return Periodo
        .findByIdAndDelete(id)
        .exec()
}

module.exports.update = (id, periodo) => {
    return Periodo
        .findByIdAndUpdate(id, periodo, {new : true})
        .exec()
}

module.exports.findByID = (id) => {
    return Periodo
        .findOne({_id : id})
        .exec()
};