/**
 * Criação das rotas para funcionamento em SPA
 * Autor: Johnny Rezende & Vinicius Ramos
 * Data: 09/09/2020
 */

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import ReminderForm from './pages/ReminderForm';
import ReminderList from './pages/ReminderList';
// import TeacherList from './pages/TeacherList';
// import TeacherForm from './pages/TeacherForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" component={Landing} exact />
            <Route path="/reminder" component={ReminderForm} />
            <Route path="/reminder-list" component={ReminderList} /> 
        </BrowserRouter>
    );
}

export default Routes;

