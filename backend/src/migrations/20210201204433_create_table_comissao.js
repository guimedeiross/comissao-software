
exports.up = function(knex) {
    return knex.schema.createTable('infoComissao', table => {
        table.increments('id').primary()
        table.string('empresa').notNull()
        table.float('preco').notNull().unique()
        table.string('cliente').notNull()
        table.integer('numeroTicket').notNull()
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('infoComissao')
};
