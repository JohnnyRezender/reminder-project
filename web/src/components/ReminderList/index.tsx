import React, { useEffect, useState } from 'react';
import api from '../../services/api';
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

    console.log(reminders[0]);
    return (
        <>
            {reminders.map(reminder => (
                <form className="ReminderItem" key={reminder.ID_REMINDER_REM}>
                    <header>
                        <div className="field">
                            <label htmlFor="textReminder">Lembrete</label>
                            <input
                                type="text"
                                name="ST_REMINDER_REM"
                                id="ST_REMINDER_REM"
                                value={reminder.ST_REMINDER_REM}
                                required />
                        </div>
                    </header>
                    <footer>
                        <div className="field">
                            <label htmlFor="dateReminder">Data do lembrete</label>
                            <input
                                type="datetime-local"
                                name="DT_LEMBRETE_REM"
                                id="DT_LEMBRETE_REM"
                                value={reminder.DT_LEMBRETE_REM}
                                required />
                        </div>
                    </footer>

                </form>
            ))}
        </>
    )
}

export default ReminderItem;