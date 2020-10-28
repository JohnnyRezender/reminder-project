import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

interface Reminder {
    ID_REMINDER_REM: number;
    ST_REMINDER_REM: string;
    DT_LEMBRETE_REM: string;
}

const ReminderItem = () => {
    const [reminders, getReminders] = useState<Reminder[]>([]);

    useEffect(() => {
        api.get('/reminders').then(response => {
            getReminders(response.data);
        });
    }, []);

    const [formData, setFormData] = useState({
        ID_REMINDER_REM: '',
        ST_REMINDER_REM: 'teste',
        DT_LEMBRETE_REM: 'teste',
    })

    const history = useHistory();

    async function handleDelete(id: any) {

        if ( !window.confirm("Excluir?") ) return;

        const data = {
            ID_REMINDER_REM: id
        }

        // Chamada da api
        api.delete('/reminders', {data})
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });

        history.push('/');
    }


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        // Recepção dos dados do form
        const { ST_REMINDER_REM, DT_LEMBRETE_REM } = formData;
        
        // Montagem do JSON
        const data = {
            ST_REMINDER_REM,
            DT_LEMBRETE_REM
        }

        // Chamada da api
        await api.post('/reminders', data)
            .then(response => {
                alert(response.data);
            }).catch(error => {
                alert(error);
            });

        history.push('/');
    }

    return (
        <>
            {reminders.map(reminder => (
                <form onSubmit={handleSubmit} className="ReminderItem" key={reminder.ID_REMINDER_REM}>
                    <header>
                        <div className="field">
                            <label htmlFor="textReminder">Lembrete</label>
                            <input
                                className="reminderInput"
                                type="text"
                                name="ST_REMINDER_REM"
                                id="ST_REMINDER_REM"
                                defaultValue={reminder.ST_REMINDER_REM}
                                onChange={handleInputChange}
                                required />
                        </div>
                    </header>
                    <footer>
                        <div className="field">
                            <label htmlFor="dateReminder">Data do lembrete</label>
                            <input
                                className="dateInput"
                                type="datetime-local"
                                name="DT_LEMBRETE_REM"
                                id="DT_LEMBRETE_REM"
                                defaultValue={reminder.DT_LEMBRETE_REM}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <button className="btn edit" type="submit">Alterar</button>
                        <button className="btn delete" onClick={() => handleDelete(reminder.ID_REMINDER_REM)}>Alterar</button>
                    </footer>
                </form>
            ))}
        </>
    )
}

export default ReminderItem;