import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Page from './Page/Page';
import Header from './Header/Header';
import { getDiaryItems } from '../getDiaryItems';


const HealthDiary = () => {
    const [listOfDiaryPages, setListOfDiaryPages] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentUserId = '9121cb64-8bc9-404c-88df-b000e4b74421'; // sessionStorage.getItem('userId')
            
            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8004/diaries/user/${currentUserId}`, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // },
                            });

                setListOfDiaryPages(response.data);             
            } catch(error) {
                console.error('Get Diary Error:', error);
            }
        };
        
        fetchData();
    }, []);

    const handlePageData = async (page, id) => {
        const requestBody = page;

        try {
            const response = await axios.patch('http://'+ window.location.hostname + `:8004/diaries/${page.id}`, requestBody, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            let newList = [...listOfDiaryPages];
            newList[id] = response.data;                
            setListOfDiaryPages(newList);
        } catch(error) {
            console.error('Update Diary Error:', error);
        }
    }

    const updatePage = (data, id) => {
        let newList = [...listOfDiaryPages];
        newList[id] = data;
        setListOfDiaryPages(newList);
    }


    return (
        <>
        <Sidebar />
        {listOfDiaryPages && (
            <div className="container">
            <Head />
                <section className="section">
                    <div className="diary">
                        <Header title={'Дневник здоровья'} />
                        {listOfDiaryPages.map((page, index) =>
                        <Page
                        key={index}
                        pageData={page}
                        pageItems={getDiaryItems(page)}
                        updatePage={data => updatePage(data, index)} 
                        handlePageData={() => handlePageData(page, index)}
                        isPageDiary={true}
                        />   
                        )}
                    </div>
                </section>
            </div>
        )}
        </>
    );
}

export default HealthDiary;