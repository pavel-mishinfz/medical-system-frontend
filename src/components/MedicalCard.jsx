import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Page from './Page/Page';
import { getMedcardItems } from '../getMedcardItems';
import Button from './Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header/Header';
import { getNewMedicalCard } from '../getNewMedicalCard';


const MedicalCard = () => {
    const navigate = useNavigate(); 
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [cardData, setCardData] = useState(null);
    const [familyStatusList, setFamilyStatusList] = useState(null);
    const [educationList, setEducationList] = useState(null);
    const [busynessList, setBusynessList] = useState(null);
    const [hasMedcard, setHasMedcard] = useState(false);
    const [addMedcard, setAddMedcard] = useState(false);
    const [newCardData, setNewCardData] = useState(getNewMedicalCard());


    const params = useParams();
    const userId = params.id ? params.id : sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/cards/user/${userId}`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setCardData(response.data); 
                setHasMedcard(true);            
            } catch(error) {
                console.error('Get Card Error:', error);
            }

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/family_status`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setFamilyStatusList(response.data);             
            } catch(error) {
                console.error('Get Family Status Error:', error);
            }

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/education`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setEducationList(response.data);             
            } catch(error) {
                console.error('Get Education List Error:', error);
            }

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/busyness`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setBusynessList(response.data);             
            } catch(error) {
                console.error('Get Busyness List Error:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleCreateMedcard = async () => {
        const requestBody = newCardData;

        try {
            const response = await axios.post('http://'+ window.location.hostname + `:8002/cards/user/${userId}`, requestBody, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            setCardData(response.data);
            setHasMedcard(true);
            setAddMedcard(false);
        } catch(error) {
            console.error('Create Medcard Error:', error);
        }
    }

    const handleUpdateMedcard = async () => {
        const requestBody = cardData;

        try {
            const response = await axios.patch('http://'+ window.location.hostname + `:8002/cards/${cardData.id}`, requestBody, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            setCardData(response.data);
        } catch(error) {
            console.error('Update Medcard Error:', error);
        }
    }

    const handleDeleteMedcard = async () => {
        try {
            const response = await axios.delete('http://'+ window.location.hostname + `:8002/cards/${cardData.id}`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            setHasMedcard(false);
            setAddMedcard(false);
        } catch(error) {
            console.error('Delete Medcard Error:', error);
        }
    }


    return (
        <>
        <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen}/>
        <div className="container">
            <Head
                setSidebarIsOpen={setSidebarIsOpen}
                setUserData={(data) => setUserData(data)}
            />
            <section className="section">
                <div className="medcard">
                    <Header title={'Электронная медицинская карта'} />
                    {hasMedcard ? (
                        cardData && familyStatusList && educationList && busynessList && 
                        <Page
                            pageData={cardData}
                            pageItems={getMedcardItems(cardData, familyStatusList, educationList, busynessList)}
                            updatePage={data => setCardData(data)}
                            handlePageData={handleUpdateMedcard}
                            deletePage={() => handleDeleteMedcard()}
                            ownerId={userData.is_superuser && userData.id}
                        />
                    ) : (
                        !addMedcard && (
                            <Button
                                modify={'btn--add-page'}
                                text={<span className="btn">Создать медкарту</span>}
                                onHandleClick={() => setAddMedcard(true)}
                            />
                        )
                    )}
                    {addMedcard && (
                        <Page
                            pageData={newCardData}
                            pageItems={getMedcardItems(newCardData, familyStatusList, educationList, busynessList)}
                            updatePage={data => setNewCardData(data)}
                            isNewPage
                            setAddNewPage={() => setAddMedcard(false)}
                            handlePageData={handleCreateMedcard}
                        />
                    )}
                    {hasMedcard && <Button text={'Перейти к списку страниц'} onHandleClick={() => navigate(`/medical-card/${cardData.id}/pages`)} />}
                </div>
            </section>
        </div>
        </>
    );
}

export default MedicalCard;