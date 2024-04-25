import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import PageItemList from './Page/PageItemList';
import { getMedcardItems } from '../getMedcardItems';
import Button from './Button/Button';


const MedicalCard = () => {
    const [openEditForm, setOpenEditForm] = useState(false);
    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentUserId = '89f8467c-550d-4fca-86f2-ad19ed15def5'; // sessionStorage.getItem('userId')
            
            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/cards/user/${currentUserId}`, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // },
                            });
                setCardData(response.data);             
            } catch(error) {
                console.error('Get Card Error:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleUpdateCardData = async () => {
        const requestBody = cardData;

        try {
            const response = await axios.patch('http://'+ window.location.hostname + `:8002/cards/${cardData.id}`, requestBody, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            setCardData(response.data);
            setOpenEditForm(false);
        } catch(error) {
            console.error('Update Medcard Error:', error);
        }
    }


    return (
        <>
        <Sidebar />
        {cardData && (
            <div className="container">
            <Head />
                <section className="section">
                    <div className="medcard">
                        <div className="medcard__header">
                            <h2 className="medcard__h2">Электронная медицинская карта</h2>
                        </div>
                        <PageItemList items={getMedcardItems(cardData)} openEditForm={openEditForm} initCardData={cardData} updateCardData={data => setCardData(data)}/>
                        {openEditForm ? 
                        <div className="medcard__btns">
                            <Button text={'Сохранить'} onHandleClick={handleUpdateCardData}/>
                            <Button modify={'btn--cancel'} text={'Отменить'} onHandleClick={() => setOpenEditForm(false)} />
                        </div>
                        :
                        <Button text={'Редактировать'} onHandleClick={() => setOpenEditForm(true)} />
                        }
                    </div>
                </section>
            </div>
        )}
        </>
    );
}

export default MedicalCard;