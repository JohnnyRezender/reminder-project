import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('REMINDERS', table => {
        table.increments('ID_REMINDER_REM').primary();
        table.string('ST_REMINDER_REM').notNullable();
        table.dateTime('DT_VENCIMENTO_REM').notNullable();
        table.dateTime('DT_LEMBRETE_REM').notNullable();
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('REMINDERS');
}