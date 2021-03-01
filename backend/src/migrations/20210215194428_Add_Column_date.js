
exports.up = function(knex) {
    return knex.schema.table('infoComissao', table => {
        table.date('created_at').defaultTo(knex.fn.now())
    })  
};

exports.down = function(knex) {
    return knex.schema.table('infoComissao'), table => {
        table.dropColumn('createdAt')
    }
};
