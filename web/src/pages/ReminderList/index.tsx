import React from 'react';

import PageHeader from '../../components/PageHeader';


import './styles.css'
import ReminderList from '../../components/ReminderList';

function TeacherList() {
    return (
        <div id="page-reminder-list" className="container">
            <PageHeader title="Estes são os lembretes cadastrados">
            </PageHeader>
            <main>
                <ReminderList />
            </main>
        </div>
    )
}

export default TeacherList;