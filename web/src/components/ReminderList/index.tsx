import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import axios from 'axios';
import './styles.css';

interface Reminder {
    ID_REMINDER_REM: number;
    ST_REMINDER_REM: string;
    DT_LEMBRETE_REM: Date;
}

const ReminderItem = () => {
    const [reminders, getReminders] = useState<Reminder[]>([]);

    useEffect(() => {
        api.get('/reminders').then(response => {
            getReminders(response.data);
        });
    }, []);

    console.log(reminders);
    return (
        <>
            {reminders.map(reminder => (         
                <article className="ReminderItem" key={reminder.ID_REMINDER_REM}> 
                  
                    <header>
                        <div>
                            <strong>{reminder.ST_REMINDER_REM}</strong>
                        </div>
                    </header>
                    <footer>
                        <p>
                                Data do lembrete
                        <strong>{reminder.DT_LEMBRETE_REM}</strong>
                        </p>
                    </footer>
                
                </article>
            ))}
        </>
    )
}

export default ReminderItem;