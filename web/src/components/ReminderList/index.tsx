import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';

interface Reminder {
    ID_REMINDER_REM: number;
    ST_REMINDER_REM: string;
    DT_LEMBRETE_REM: string;
}

const ReminderItem = () => {
    const [reminders, getReminders] = useState<Reminder[]>([]);

    useEffect(() => {
        console.log("passou no get")
        api.get('/reminders').then(response => {
            getReminders(response.data);
        });
    }, []);

    const [formData, setFormData] = useState({
        ID_REMINDER_REM: '',
        ST_REMINDER_REM: '',
        DT_LEMBRETE_REM: '',
    })

    async function handleDelete(id: any) {

        if ( !window.confirm("Excluir?") ) return;

        
        let ID_REMINDER_REM = id;

        // Chamada da api
        await api.delete(`/reminders/${ID_REMINDER_REM}`)
            .then(response => {
                alert(response.data);
            }).catch(error => {
                alert(error);
            });

        document.location.reload();
    }


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        console.log("A")
        console.log(name);
        console.log(value);
        
        setFormData({ ...formData, [name]: value });
    }

    async function handleEdit(idReminder: number) {
        if ( !window.confirm("Deseja alterar?") ) return;

        const {ST_REMINDER_REM, DT_LEMBRETE_REM } = formData;
        
        // Montagem do JSON
        const data = {
            ST_REMINDER_REM: ST_REMINDER_REM,
            DT_LEMBRETE_REM: DT_LEMBRETE_REM
        }

        await api.put(`/reminders/${idReminder}`, data)
            .then(response => {
                alert(response.data.message);
            }).catch(error => {
                alert(error.message);
            });

    }

    return (
        <>
            {reminders.map(reminder => (
                <article className="ReminderItem" key={reminder.ID_REMINDER_REM}>
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
                        <button className="btn edit" onClick={() => handleEdit(reminder.ID_REMINDER_REM)} >Alterar</button>
                        <button className="btn delete" onClick={() => handleDelete(reminder.ID_REMINDER_REM)}>Deletar</button>
                    </footer>
                </article>
            ))}
        </>
    )
}

export default ReminderItem;