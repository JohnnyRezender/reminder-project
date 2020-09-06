import Knex from 'knex';
import {parseISO,formatISO, startOfMinute, addDays} from 'date-fns';

export async function seed(knex: Knex)
{
    const dtLembrete = formatISO(startOfMinute(addDays(new Date(), 3)));

    await knex('REMINDERS').insert([
        {
            ST_REMINDER_REM: 'Teste de lembrete',
            DT_LEMBRETE_REM: parseISO(dtLembrete)
        }
    ])
}