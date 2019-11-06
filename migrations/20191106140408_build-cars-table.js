
exports.up = function (knex) {
    return knex.schema.createTable('cars', table => {
        table.increments('id');
        table.integer('vin').unique().notNullable();
        table.text('make').notNullable();
        table.text('model').notNullable();
        table.integer('mileage').notNullable();
        table.string('transmission');
        table.string('status');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars');
};