import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <img src={logoImg} alt="Reminder Jobs" />

                <Link to="/">
                    <FiArrowLeft />
                        Voltar para Home
                </Link>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>

                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;