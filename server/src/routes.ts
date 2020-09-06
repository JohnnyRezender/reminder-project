import express, { response } from 'express';

import RemindersController from '../controllers/RemindersController';

const routes = express.Router();

const remindersController = new RemindersController();

routes.get('/reminders',remindersController.index);
routes.post('/reminders',remindersController.create);
routes.delete('/reminders',remindersController.remove);
routes.put('/reminders/:ID_REMINDER_REM',remindersController.update);

export default routes;