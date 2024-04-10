var mongoose = require('mongoose');
var pessoa = require("../model/pessoas");

/* GET da Lista de Pessoas */
module.exports.list = () => {
    return pessoa
        .find()
        .sort({nome : 1})
        .exec()
};

/* GET da pessoa com o id */
module.exports.findByID = (id) => {
    return pessoa
        .findOne({_id : id})
        .exec()
};

/* POST para adicionar pessoa à db*/
module.exports.create = (data) => {
    var newPessoa = new pessoa(data)
    return newPessoa.save()
};

/* DELETE para eliminar uma pessoa da db*/
module.exports.delete = (id) => {
    return pessoa
    .deleteOne({_id : id})
    .exec();
};

/*PUT para atualizar informação de uma pessoa na db*/
module.exports.update = (id, newData) => {
    return pessoa
    .findByIdAndUpdate(id, newData, {new : true})
    .exec()
};

// module.exports.listaModalidades = () => {
// 
    // return pessoa
        // .aggregate([
            // {$unwind: '$desportos'},
            // { $group: { _id: '$desportos', count: { $sum: 1 } } },
            // { $sort: { _id: 1 } }
        // ], (err, modalidades) => {
// 
            // Extrair apenas os nomes das modalidades
            // const modalidadesLista = modalidades.map(modalidade => modalidade._id);
            // res.json(modalidadesLista);
        // }
// )}
// 
module.exports.listaModalidades = () => {
    return pessoa.aggregate([
        { $unwind: "$pessoas" }, 
        { $unwind: "$pessoas.desportos" },
        { $group: { _id: "$pessoas.desportos" } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, nome: "$_id" } },
        { $group: { _id: null, desportos: { $push: "$nome" } } }
    ]).exec().then(result => {
        return result.length > 0 ? result[0].desportos : [];
    });
};

module.exports.listaAtletasModalidade = (modalidade) => {
    return pessoa.aggregate([
        {$unwind : "$pessoas"},
        {$unwind : "$pessoas.desportos"},
        {$match : {"pessoas.desportos" : modalidade}},
        {$group : {_id: "$pessoas.nome"}},
        {$project:{_id: 0, nome: "$_id"}},
        {$sort: {nome: 1}},
        {$group: {_id: null, nomes: {$push: "$nome"}}},
        {$project: {_id: 0, nomes: 1}}
    ])
    .exec().then(result => {
        return result.length > 0 ? result[0].nomes : [];
    });
}
