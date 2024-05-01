import React, { useState, useEffect, useMemo, createContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Page from './Page/Page';
import Header from './Header/Header';
import { getDiaryItems } from '../getDiaryItems';
import Pagination from './Pagination/Pagination';
import Button from './Button/Button';


const PageSize = 5;
export const HealthDiaryContext = createContext();

const HealthDiary = () => {
    const [addNewPage, setAddNewPage] = useState(false);
    const [templateNewPage, setTemplateNewPage] = useState(
        {
            pulse: '',
            temperature: '',
            upper_pressure: '',
            lower_pressure: '',
            oxygen_level: '',
            sugar_level: '',
            comment: '',
        }
    ); 
    const [listOfDiaryPages, setListOfDiaryPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    const currentPageData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return listOfDiaryPages.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, listOfDiaryPages]);

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

    const handlePageData = async (page) => {
        const requestBody = page;

        try {
            const response = await axios.patch('http://'+ window.location.hostname + `:8004/diaries/${page.id}`, requestBody, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            let newList = [...listOfDiaryPages];
            const idx = listOfDiaryPages.indexOf(page);
            newList[idx] = response.data;                
            setListOfDiaryPages(newList);
        } catch(error) {
            console.error('Update Diary Error:', error);
        }
    }

    const updatePage = (data, page) => {
        let newList = [...listOfDiaryPages];
        const idx = listOfDiaryPages.indexOf(page);
        newList[idx] = data;
        setListOfDiaryPages(newList);
    }

    const deletePageDiary = async (id) => {
        try {
            const response = await axios.delete('http://'+ window.location.hostname + `:8004/diaries/${id}`, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            window.location.reload();
        } catch(error) {
            console.error('Delete Page Diary Error:', error);
        }
    }

    const createPageDiary = async () => {
        const currentUserId = '9121cb64-8bc9-404c-88df-b000e4b74421';
        const requestBody = templateNewPage;

        try {
            const response = await axios.post('http://'+ window.location.hostname + `:8004/diaries/user/${currentUserId}`, requestBody, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            window.location.reload();
        } catch(error) {
            console.error('Delete Page Diary Error:', error);
        }
    }


    return (
        <>
        <Sidebar />
        {currentPageData.length > 0 && (
            <div className="container">
            <Head />
                <section className="section">
                    <div className="diary">
                        <Header title={'Дневник здоровья'} />
                        {!addNewPage && currentPage === 1 && (
                            <Button text={'+ Добавить новую запись'} onHandleClick={() => setAddNewPage(true)}/>
                        )}
                        {addNewPage && (
                            <HealthDiaryContext.Provider
                            value={{
                                isPageDiary: true
                            }}
                            >

                                <Page
                                pageData={templateNewPage}
                                pageItems={getDiaryItems(templateNewPage)}
                                updatePage={data => setTemplateNewPage(data)} 
                                handlePageData={() => createPageDiary()}
                                setAddNewPage={state => setAddNewPage(state)}
                                isNewPage={true}
                                />
                
                            </HealthDiaryContext.Provider>
                        )}
                        {currentPageData.map((page, index) =>
                            <HealthDiaryContext.Provider
                            key={index}
                            value={{
                                isPageDiary: true
                            }}
                            >

                                <Page
                                pageData={page}
                                pageItems={getDiaryItems(page)}
                                updatePage={data => updatePage(data, page)} 
                                handlePageData={() => handlePageData(page)}
                                deletePage={() => deletePageDiary(page.id)}
                                />   

                            </HealthDiaryContext.Provider>
                        )}
                        <div className="pagination">
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={listOfDiaryPages.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )}
        </>
    );
}

export default HealthDiary;