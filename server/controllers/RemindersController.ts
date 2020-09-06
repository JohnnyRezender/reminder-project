import {Request, Response} from 'express';
import knex from '../database/connection';

class RemindersController
{
    /**
    * Endpoint para retornar todos os lembretes cadastrados
    * 
    * @param request
    * @param response
    * 
    * @return json
    */
    async index (request: Request, response: Response)
    {
        const reminders = 
            await knex('REMINDERS')
            .select('REMINDERS.*');

        return response.status(200).json(reminders);
    }

    /**
     * Endpoint para criar um lembrete
     *  
     * @param request
     * @param response
     * 
     * @return success
     * @throws error
     */
    async create (request: Request, response: Response)
    {
        const  {ST_REMINDER_REM} = request.body;
        const  {DT_LEMBRETE_REM} = request.body;

        const transaction = await knex.transaction();

        const reminderExists = 
            await transaction('REMINDERS')
            .where('ST_REMINDER_REM', ST_REMINDER_REM)
            .andWhere('DT_LEMBRETE_REM', DT_LEMBRETE_REM)
            .first();

        if (reminderExists) {
            await transaction.rollback();
            return response
                .status(400)
                .json({error: 'Lembrete já criado!'});
        };

        const reminder = await transaction("REMINDERS").insert(request.body);

        await transaction.commit();

        return response
            .status(200)
            .json(`Lembrete#${reminder} criado com sucesso!`)
    }

    /**
     * Endpoint para remover um lembrete
     *  
     * @param request
     * @param response
     * 
     * @return success
     * @throws error
     */
    async remove (request: Request, response: Response)
    {
        const {ID_REMINDER_REM} = request.body;

        const reminder = await knex('REMINDERS').where('ID_REMINDER_REM', ID_REMINDER_REM).del();

        if (reminder == 0) {
            return response
                .status(200)
                .json('Lembrete já deletado!');    
        }

        return response
            .status(200)
            .json('Lembrete deletado!');
    }

    /**
     * Endpoint para editar um lembrete
     *  
     * @param request
     * @param response
     * 
     * @return success
     * @throws error
     */
    async update(request: Request, response: Response) 
    {
        const {ID_REMINDER_REM} = request.params;

        const {ST_REMINDER_REM, DT_LEMBRETE_REM} = request.body;

        const transaction = await knex.transaction();
        const idReminderExists = 
            await transaction('REMINDERS')
            .where('ID_REMINDER_REM', ID_REMINDER_REM)
            .first();

        if (! idReminderExists) {
            await transaction.rollback();

            return response
                .status(400)
                .json({error: "Lembrete não encontrado!"});
        }

        const reminderExists = 
            await transaction('REMINDERS')
            .where('ST_REMINDER_REM', ST_REMINDER_REM)
            .andWhere('DT_LEMBRETE_REM', DT_LEMBRETE_REM)
            .whereNot('ID_REMINDER_REM', ID_REMINDER_REM)
            .first()
            .select('*');

        if (reminderExists) {
            await transaction.rollback();
            return response
                .status(400)
                .json({error: 'Lembrete já existe!'});
        }

        const reminder = 
            await transaction('REMINDERS')
            .update({
                ST_REMINDER_REM,
                DT_LEMBRETE_REM
            })
            .where('ID_REMINDER_REM', ID_REMINDER_REM);

            await transaction.commit();

            return response.status(200).json(`Lembrete#${reminder} alterado com sucesso!`)
    }
}

export default RemindersController;