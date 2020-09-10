import React from 'react';
import './styles.css'


function ReminderItem() {
    return (
        <article className="ReminderItem">
            <header>
                <div>
                    <strong>Lembrete</strong>
                </div>
            </header>
                <p>O Johnny é um viadão</p>

            <footer>
                <p>
                    Data do lembrete
                <strong>19/09/2020</strong>
                </p>
            </footer>
        </article>
    )
}

export default ReminderItem;