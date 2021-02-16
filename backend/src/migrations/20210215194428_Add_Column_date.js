
exports.up = function(knex) {
    return knex.schema.table('infoComissao', table => {
        table.date('createdAt')
    })  
};

exports.down = function(knex) {
    return knex.schema.table('infoComissao'), table => {
        table.dropColumn('createdAt')
    }
};
