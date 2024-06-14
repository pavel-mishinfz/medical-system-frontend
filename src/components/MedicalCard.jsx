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
import Alert from './Alert/Alert';


const MedicalCard = ({currentUserData}) => {
    const navigate = useNavigate(); 
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [cardIsLoading, setCardIsLoading] = useState(false);
    const [cardData, setCardData] = useState(null);
    const [familyStatusList, setFamilyStatusList] = useState(null);
    const [educationList, setEducationList] = useState(null);
    const [busynessList, setBusynessList] = useState(null);
    const [hasMedcard, setHasMedcard] = useState(false);
    const [addMedcard, setAddMedcard] = useState(false);
    const [newCardData, setNewCardData] = useState(getNewMedicalCard());
    const [errors, setErrors] = useState({});


    const params = useParams();
    const paramsId = params.id;
    let url = '';
    if (paramsId && Number.isInteger(Number(paramsId))) {
        url = `http://${window.location.hostname}:8006/cards/${paramsId}`
    } else if (!paramsId) {
        url = `http://${window.location.hostname}:8006/cards/me/${currentUserData.id}`
    }

    useEffect(() => {
        const fetchData = async () => {

            if (url) {
                try {
                    const response = await axios.get(url, {
                                    headers: {
                                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                    },
                                });
                    setCardData(response.data); 
                    setHasMedcard(true);            
                } catch(error) {
                    console.error('Get Card Error:', error);
                }
            }

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8006/family_status`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setFamilyStatusList(response.data);             
            } catch(error) {
                console.error('Get Family Status Error:', error);
            }

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8006/education`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setEducationList(response.data);             
            } catch(error) {
                console.error('Get Education List Error:', error);
            }

            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8006/busyness`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setBusynessList(response.data);             
            } catch(error) {
                console.error('Get Busyness List Error:', error);
            }

            setCardIsLoading(true);
        };
        
        fetchData();
    }, []);

    const handleCreateMedcard = async () => {
        const requestBody = {
            ...newCardData,
            id_user: paramsId
        };

        try {
            const response = await axios.post('http://'+ window.location.hostname + `:8006/cards`, requestBody, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            setCardData(response.data);
            setHasMedcard(true);
            setAddMedcard(false);
            setErrors({});
            return {};
        } catch(error) {
            const errorData = error.response.data;
            const errorDetails = {};
            errorData.detail.forEach((error) => {
                let field = error.loc[1];
                if (field === 'address' || field === 'passport') {
                    field = error.loc[2];
                }
                if (field === 'disability') {
                    if (error.loc[2]) {
                        field = error.loc[2] + field;
                    } else {
                        errorDetails['name' + field] = error.msg.split(',')[1];
                        errorDetails['group' + field] = error.msg.split(',')[1];
                        errorDetails['create_date' + field] = error.msg.split(',')[1];
                    }
                }
                errorDetails[field] = error.msg.split(',')[1];
            });
            setErrors(errorDetails);
            return errorDetails;
        }
    }

    const handleUpdateMedcard = async () => {
        const requestBody = cardData;

        try {
            const response = await axios.patch('http://'+ window.location.hostname + `:8006/cards/${cardData.id}`, requestBody, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            setCardData(response.data);
            setErrors({});
            return {};
        } catch(error) {
            const errorData = error.response.data;
            const errorDetails = {};
            errorData.detail.forEach((error) => {
                let field = error.loc[1];
                if (field === 'address' || field === 'passport') {
                    field = error.loc[2];
                }
                if (field === 'disability') {
                    if (error.loc[2]) {
                        field = error.loc[2] + field;
                    } else {
                        errorDetails['name' + field] = error.msg.split(',')[1];
                        errorDetails['group' + field] = error.msg.split(',')[1];
                        errorDetails['create_date' + field] = error.msg.split(',')[1];
                    }
                }
                errorDetails[field] = error.msg.split(',')[1];
            });
            setErrors(errorDetails);
            return errorDetails;
        }
    }

    const handleDeleteMedcard = async () => {
        try {
            const response = await axios.delete('http://'+ window.location.hostname + `:8006/cards/${cardData.id}`, {
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
            {currentUserData && (
                <>
                    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                    <div className="container">
                        <Head
                            setSidebarIsOpen={setSidebarIsOpen}
                            isAuthenticated
                        />
                        <section className="section">
                            <div className="medcard">
                                <Header title={'Электронная медицинская карта'} />
                                {!hasMedcard && cardIsLoading && !currentUserData.is_superuser && (
                                    <Alert text={
                                        <>
                                        Уважаемый пользователь! У Вас еще нет электронной медицинской карты. Вы можете завести её, если лично посетите наше учреждение. В случае отсутствия данной возможности, Вы всегда можете отправить <a href="/" style={{ color: '#1a5dd0' }}>необходимые документы</a> на почту <a href="/" style={{ color: '#1a5dd0' }}>admin@admin.ru</a>
                                        </>
                                    }/>
                                )}
                                {!hasMedcard && !addMedcard && cardIsLoading && currentUserData.is_superuser && (
                                    <Button
                                        modify={'btn--add-page'}
                                        text={<span className="btn">Создать медкарту</span>}
                                        onHandleClick={() => setAddMedcard(true)}
                                    />
                                )}
                                {hasMedcard && cardIsLoading && (
                                    cardData && familyStatusList && educationList && busynessList &&
                                    <Page
                                        pageData={cardData}
                                        pageItems={getMedcardItems(cardData, familyStatusList, educationList, busynessList)}
                                        updatePage={data => setCardData(data)}
                                        handlePageData={handleUpdateMedcard}
                                        deletePage={() => handleDeleteMedcard()}
                                        ownerId={currentUserData.is_superuser && (currentUserData.id)}
                                        errors={errors}
                                    />
                                )}
                                {addMedcard && (
                                    <Page
                                        pageData={newCardData}
                                        pageItems={getMedcardItems(newCardData, familyStatusList, educationList, busynessList)}
                                        updatePage={data => setNewCardData(data)}
                                        isNewPage
                                        setAddNewPage={() => setAddMedcard(false)}
                                        handlePageData={handleCreateMedcard}
                                        errors={errors}
                                    />
                                )}
                                {hasMedcard && cardIsLoading && !currentUserData.is_superuser && <Button text={'Перейти к списку страниц'} onHandleClick={() => navigate(`/medical-card/${cardData.id}/pages`)} />}
                            </div>
                        </section>
                    </div>
                </>
            )}
            <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
        </>
    );
}

export default MedicalCard;