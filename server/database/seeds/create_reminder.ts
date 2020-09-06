import Knex from 'knex';

export async function seed(knex: Knex)
{
    const date = new Date();
    const dtLembrete = date.setDate(date.getDate() + 2);
    const dtVencimento = date.setDate(date.getDate() + 3);

    await knex('REMINDERS').insert([
        {
            ST_REMINDER_REM: 'Teste de lembrete',
            DT_VENCIMENTO_REM: dtVencimento,
            DT_LEMBRETE_REM: dtLembrete
        }
    ])
}