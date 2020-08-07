import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';





function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        {
            week_day: 0,
            from: '',
            to: '',
        }
    ]);


    function addNewScheduleItem() {
            setScheduleItems([
                ...scheduleItems,
                {
                    week_day: 0,
                    from: '',
                    to: ''
                }
            ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })

        setScheduleItems(newScheduleItem);
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
        .then(() => {
            history.push('/')
        })
        .catch(() => {
            alert('Ocorreu algum erro no cadastro!')
        })
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher este formulário de inscrição"
            />
                <main>
                    <form onSubmit={handleCreateClass}>
                        <fieldset>
                            <legend>Seus dados</legend>

                            <Input 
                                type="text"
                                name="name"
                                label="Nome completo"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <Input
                                type="text" 
                                name="avatar" 
                                label="Avatar"
                                value={avatar}
                                onChange={e => setAvatar(e.target.value)}
                            />
                            <Input 
                                type="text" 
                                name="whatsapp" 
                                label="WhatsApp"
                                value={whatsapp}
                                onChange={e => setWhatsapp(e.target.value)}
                            />
                            <TextArea 
                                name="bio" 
                                label="Biografia"
                                value={bio}
                                onChange={e => setBio(e.target.value)} 
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Sobre as aulas</legend>

                            <Select
                                name="subject" 
                                label="Máteria" 
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                options={[
                                    {value: 'Artes', label: 'Artes'},
                                    {value: 'Física', label: 'Física'},
                                    {value: 'Química', label: 'Química'},
                                    {value: 'Matemática', label: 'Matemática'},
                                    {value: 'Educação física', label: 'Educação física'},
                                    {value: 'Português', label: 'Português'}
                                ]}
                            />
                            <Input 
                                name="cost" 
                                label="Custo da sua hora por aula"
                                value={cost}
                                onChange={e => setCost(e.target.value)}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>
                                Horários disponíveis
                                <button 
                                    type="button"
                                    onClick={addNewScheduleItem}
                                >
                                + Novo horário
                                </button>
                            </legend>

                            {
                                scheduleItems.map((scheduleItem, index) => (
                                    <div key={scheduleItem.week_day} className="schedule-item">
                                        <Select
                                            name="week_day" 
                                            label="Dia da semana"
                                            value={scheduleItem.week_day}
                                            onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)} 
                                            options={[
                                                {value: '0', label: 'Domingo'},
                                                {value: '1', label: 'Segunda-feira'},
                                                {value: '2', label: 'Terça-feira'},
                                                {value: '3', label: 'Quarta-feira'},
                                                {value: '4', label: 'Quinta-feira'},
                                                {value: '5', label: 'Sexta-feira'},
                                                {value: '6', label: 'Sábado'}
                                            ]}
                                        />
                                        <Input 
                                            type="time" 
                                            name="from" 
                                            label="Das"
                                            value={scheduleItem.from}
                                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
                                        />
                                        <Input 
                                            type="time" 
                                            name="to" 
                                            label="Até"
                                            value={scheduleItem.to}
                                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                                        />
                                    </div>
                                ))
                            }
                            
                        </fieldset>

                        <footer>
                            <p>
                                <img src={warningIcon} alt="Aviso importante" />
                                Importante! <br />
                                Preencha todos os dados
                            </p>

                            <button type="submit">
                                Salvar cadastros
                            </button>
                        </footer>
                    </form>
                </main>
        </div>
    )
}

export default TeacherForm;
