import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/images/logo.svg';
import api from '../../services/api';
const axios = require('axios');


const CreateReminder = () => {

    // useState -> limpar os campos
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nameReminder: '',
        reminder: '',
        dateReminder: '',
    })

    const history = useHistory();


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    // Função responsável por comunicar com a endpoint post
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        // Recepção dos dados do form
        const { name, email, nameReminder, reminder, dateReminder } = formData;

        // Montagem do JSON
        const data = {
            name,
            email,
            nameReminder,
            reminder,
            dateReminder
        }

        // Chamada da api
        await api.post('reminders', data);

        alert("Lembrete cadastrado com sucesso!");

        history.push('/');
    }
    
    return (
        <div id="page-create-reminder">
            <header>
                <img src={logoImg} alt="Reminder Jobs" />

                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para Home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro de lembretes </h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange} />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="nameReminder">Nome do lembrete</label>
                            <input
                                type="text"
                                name="nameReminder"
                                id="nameReminder"
                                onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <div className="field">
                                <label htmlFor="textReminder">Lembrete</label>
                                <input
                                    type="text"
                                    name="nameReminder"
                                    id="nameReminder"
                                    onChange={handleInputChange} />
                            </div>
                            <label htmlFor="dateReminder">Data do lembrete</label>
                            <input
                                type="date"
                                name="dateReminder"
                                id="dateReminder"
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>
                <button type="submit">Cadastrar lembrete</button>
            </form>
        </div>
    );
}

export default CreateReminder;