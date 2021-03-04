const tempo = new Date().toLocaleString()

exports.up = function(knex) {
    return knex.schema.table('infoComissao', table => {
        table.date('created_at').defaultTo(tempo)
    })  
};

exports.down = function(knex) {
    return knex.schema.table('infoComissao'), table => {
        table.dropColumn('created_at')
    }
};
