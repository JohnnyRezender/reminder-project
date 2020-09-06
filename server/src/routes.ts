import express, { response } from 'express';
import {celebrate, Joi} from 'celebrate';

import RemindersController from '../controllers/RemindersController';

const routes = express.Router();

const remindersController = new RemindersController();

routes.get('/reminders',remindersController.index);
routes.post('/reminders', celebrate({
        body: Joi.object().keys({
            ST_REMINDER_REM: Joi.string().required(),
            DT_LEMBRETE_REM: Joi.string().required()
        })
    }, {abortEarly: false}),
    remindersController.create
);
routes.delete('/reminders', celebrate({
        body: Joi.object().keys({
            ID_REMINDER_REM: Joi.number().required()
        })
    },{abortEarly: false}),
    remindersController.remove
);
routes.put('/reminders/:ID_REMINDER_REM', celebrate({
    body: Joi.object().keys({
        ST_REMINDER_REM: Joi.string().required(),
        DT_LEMBRETE_REM: Joi.string().required()
    })
}, {abortEarly: false}),
remindersController.update);

export default routes;