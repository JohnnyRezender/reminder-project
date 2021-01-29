import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';


function Landing() {
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="ReminderJobs" />
                    <h2>Sua plataforma de lembretes integrada.</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Plataforma de lembretes"
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/reminder-list" className="study">
                            Listar Lembretes
                        </Link>

                    <Link to="/reminder" className="give-classes">
                            Cadastrar Lembretes
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;