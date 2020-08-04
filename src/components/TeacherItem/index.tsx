import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'

const TeacherItem = () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/60406156?s=460&u=67aea5d34fd4bfcb041547cf229ed55422d3bb58&v=4" alt="Patric Pippi"/>
                <div>
                    <strong>Patric Pippi</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                <br /><br />
                Quas totam rerum quis fuga commodi eum saepe cupiditate, quasi soluta reprehenderit ipsam labore exercitationem rem voluptatibus! Perferendis itaque dolorum repellendus odit!
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 20,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;
