import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/images/logo.svg';
import api from '../../services/api';


const CreateReminder = () => {

    // useState -> limpar os campos
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nameReminder: '',
        ST_REMINDER_REM: '',
        DT_LEMBRETE_REM: '',
    })

    const history = useHistory();


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    // Função responsável por comunicar com a endpoint post
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        console.log("texto qualquer");

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
                alert(response.data.message);
                if (response.data.status == 200) {
                    history.push('/');
                }
            }).catch(error => {
                alert(error.message);
            });

    }

    // Função responsável por comunicar com a endpoint post
    async function handleAlternate(event: FormEvent) {
        event.preventDefault();
        console.log(formData);

        // Recepção dos dados do form
        const { ST_REMINDER_REM, DT_LEMBRETE_REM } = formData;

        // Montagem do JSON
        const data = {
            ST_REMINDER_REM,
            DT_LEMBRETE_REM
        }

        // Chamada da api
        // await api.post('/reminders', data)
        //     .then(response => {
        //         alert(response.data);
        //     }).catch(error => {
        //         alert(error);
        //     });

        history.push('/');
    }

    return (

        <div id="page-create-reminder">
            <header>
                <img src={logoImg} alt="Reminder Jobs" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro de lembretes </h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <div className="field">
                                <label htmlFor="textReminder">Lembrete</label>
                                <input
                                    type="text"
                                    name="ST_REMINDER_REM"
                                    id="ST_REMINDER_REM"
                                    onChange={handleInputChange}
                                    required />
                            </div>
                            <label htmlFor="dateReminder">Data do lembrete</label>
                            <input
                                type="datetime-local"
                                name="DT_LEMBRETE_REM"
                                id="DT_LEMBRETE_REM"
                                onChange={handleInputChange}
                                required />
                        </div>
                    </div>
                </fieldset>
                <button type="submit">Cadastrar lembrete</button>
            </form>
        </div>
    );
}

export default CreateReminder;