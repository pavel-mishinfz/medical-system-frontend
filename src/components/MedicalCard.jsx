import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Page from './Page/Page';
import { getMedcardItems } from '../getMedcardItems';
import Button from './Button/Button';
import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';


const MedicalCard = () => {
    const navigate = useNavigate(); 
    const [cardData, setCardData] = useState(null);
    const [familyStatusList, setFamilyStatusList] = useState(null);
    const [educationList, setEducationList] = useState(null);
    const [busynessList, setBusynessList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentUserId = '9121cb64-8bc9-404c-88df-b000e4b74421'; // sessionStorage.getItem('userId')
            
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

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/family_status`, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // },
                            });
                setFamilyStatusList(response.data);             
            } catch(error) {
                console.error('Get Family Status Error:', error);
            }

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/education`, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // },
                            });
                setEducationList(response.data);             
            } catch(error) {
                console.error('Get Education List Error:', error);
            }

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/busyness`, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // },
                            });
                setBusynessList(response.data);             
            } catch(error) {
                console.error('Get Busyness List Error:', error);
            }
        };
        
        fetchData();
    }, []);

    const handlePageData = async () => {
        const requestBody = cardData;

        try {
            const response = await axios.patch('http://'+ window.location.hostname + `:8002/cards/${cardData.id}`, requestBody, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            setCardData(response.data);
        } catch(error) {
            console.error('Update Medcard Error:', error);
        }
    }


    return (
        <>
        <Sidebar />
        {cardData && familyStatusList && educationList && busynessList && (
            <div className="container">
            <Head />
                <section className="section">
                    <div className="medcard">
                        <Header title={'Электронная медицинская карта'} />
                        <Page
                        pageData={cardData}
                        pageItems={getMedcardItems(cardData, familyStatusList, educationList, busynessList)}
                        updatePage={data => setCardData(data)} 
                        handlePageData={handlePageData}
                        /> 
                        <Button text={'Перейти к списку страниц'} onHandleClick={() => navigate(`/medical-card/${cardData.id}/pages`)} />
                    </div>
                </section>
            </div>
        )}
        </>
    );
}

export default MedicalCard;