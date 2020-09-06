import express, { response } from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json('funfou');
})

export default routes;