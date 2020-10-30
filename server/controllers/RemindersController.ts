import {Request, Response} from 'express';
import knex from '../database/connection';
import {startOfTomorrow, isPast} from 'date-fns';
import schedule from 'node-schedule';
import * as dotenv from "dotenv";
import  TelegramBot from 'node-telegram-bot-api';

dotenv.config();

class RemindersController
{
    // Configs bot telegram
    static token  = process.env.API_TOKEN_TELEGRAM!;
    static chatId = process.env.CHATID_TELEGRAM!;
    static bot    = new TelegramBot(RemindersController.token, { polling: true });

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

            const serializedReminders = reminders.map(reminder => {
                return {
                    ID_REMINDER_REM: reminder.ID_REMINDER_REM,
                    ST_REMINDER_REM: reminder.ST_REMINDER_REM,
                    DT_LEMBRETE_REM: reminder.DT_LEMBRETE_REM
                }
            });

        return response.status(200).json(serializedReminders);
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
        const  {ST_REMINDER_REM, DT_LEMBRETE_REM} = request.body;

        const transaction = await knex.transaction();

        //const reminderdateTime = startOfMinute(parseISO(DT_LEMBRETE_REM));
        // const reminderdateTime = startOfMinute(addDays(new Date(DT_LEMBRETE_REM), 3));

        // if (isPast(reminderdateTime)) {
        //     await transaction.rollback();

        //     return response
        //         .status(400)
        //         .json({error: "Não é possivel inserir um lembrete para o passado!"});
        // }
        
        const reminder = {
            ST_REMINDER_REM,
            DT_LEMBRETE_REM: DT_LEMBRETE_REM
        };

        const reminderExists = 
            await transaction('REMINDERS')
            .where('ST_REMINDER_REM', ST_REMINDER_REM)
            .andWhere('DT_LEMBRETE_REM', reminder.DT_LEMBRETE_REM)
            .first();

        if (reminderExists) {
            await transaction.rollback();
            return response
                .status(400)
                .json({error: 'Lembrete já criado!'});
        };

        const reminderCreated = await transaction("REMINDERS").insert(reminder);

        await transaction.commit();

        const a = schedule.scheduleJob(DT_LEMBRETE_REM, function ()
        {
            RemindersController.bot.sendMessage(
                RemindersController.chatId,
                "Lembrete: "+ST_REMINDER_REM
            );
        });

        return response
            .status(200)
            .json(`Lembrete#${reminderCreated} criado com sucesso!`)
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
        const {ID_REMINDER_REM} = request.params;

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

        let reminderUpdate:any = {}

        if (ST_REMINDER_REM) {
            reminderUpdate.ST_REMINDER_REM = ST_REMINDER_REM;
        }

        let stReminder = (ST_REMINDER_REM) ? ST_REMINDER_REM : "";

        const transaction = await knex.transaction();
        const idReminderExists = 
            await transaction('REMINDERS')
            .where('ID_REMINDER_REM', ID_REMINDER_REM)
            .first();

        if (! idReminderExists) {
            await transaction.rollback();

            return response
                .status(500)
                .json({error: "Lembrete não encontrado!"});
        }
        
        if (DT_LEMBRETE_REM) {
            reminderUpdate.DT_LEMBRETE_REM = DT_LEMBRETE_REM;
        } else {
            reminderUpdate.DT_LEMBRETE_REM = startOfTomorrow();
        }

        const reminderdateTime = reminderUpdate.DT_LEMBRETE_REM;

        if (isPast(reminderdateTime)) {
            await transaction.rollback();

            return response
                .status(200)
                .json({status: 500, message: "Não é possivel inserir um lembrete para o passado!"});
        }

        const reminderExists = 
            await transaction('REMINDERS')
            .where('ST_REMINDER_REM', stReminder)
            .andWhere('DT_LEMBRETE_REM', reminderUpdate.DT_LEMBRETE_REM)
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
            .update(reminderUpdate)
            .where('ID_REMINDER_REM', ID_REMINDER_REM);

            await transaction.commit();

            schedule.scheduleJob(reminderUpdate.DT_LEMBRETE_REM, function ()
            {
                RemindersController.bot.sendMessage(
                    RemindersController.chatId,
                    "Lembrete: "+reminderUpdate.ST_REMINDER_REM
                );
            });

            return response.status(200).json({status: 200, message: `Lembrete#${ID_REMINDER_REM} alterado com sucesso!`})
    }
}

export default RemindersController;
