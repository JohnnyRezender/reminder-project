import React from 'react';

import PageHeader from '../../components/PageHeader';


import './styles.css'
import ReminderList from '../../components/ReminderList';

function TeacherList() {
    return (
        <div id="page-reminder-list" className="container">
            <PageHeader title="Estes são os lembretes cadastrados">
                <form id="search-reminders">
                    <div className="input-block">
                        <label htmlFor="subject">Lembrete</label>
                        <input type="text" id="subject" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="week_day">Data do lembrete</label>
                        <input type="text" id="week_day" />
                    </div>
                </form>
            </PageHeader>

            <main>
                <ReminderList />
                <ReminderList />
            </main>
        </div>
    )
}

export default TeacherList;