import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'
import api from '../../services/api';


export interface Data {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}
interface TeacherItemProps {
    data: Data;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ data }) => {

    async function handleConnections() {
        await api.post('connections', {
            user_id: data.id,
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={data.avatar} alt="Avatar"/>
                <div>
                    <strong>{data.name}</strong>
                    <span>{data.subject}</span>
                </div>
            </header>

            <p>{data.bio}</p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {data.cost}</strong>
                </p>
                <a onClick={handleConnections} href={`https://wa.me/${data.whatsapp}`} target="_blank">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;
