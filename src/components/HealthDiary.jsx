import React, { useState, useEffect, useMemo, createContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Page from './Page/Page';
import Header from './Header/Header';
import { getDiaryItems } from '../getDiaryItems';
import Pagination from './Pagination/Pagination';
import Button from './Button/Button';
import { useParams } from 'react-router-dom';


const PageSize = 5;
export const HealthDiaryContext = createContext();

const HealthDiary = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [addNewPage, setAddNewPage] = useState(false);
    const [templateNewPage, setTemplateNewPage] = useState(
        {
            pulse: '',
            temperature: '',
            upper_pressure: '',
            lower_pressure: '',
            oxygen_level: null,
            sugar_level: null,
            comment: null,
        }
    ); 
    const [listOfDiaryPages, setListOfDiaryPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [errors, setErrors] = useState({});

    const params = useParams();
    const userId = params.id ? params.id : sessionStorage.getItem('userId');


    const currentPageData = useMemo(() => {
        if (listOfDiaryPages.length > 0) {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return listOfDiaryPages.slice(firstPageIndex, lastPageIndex);
        }
        return [];
    }, [currentPage, listOfDiaryPages]);

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get('http://'+ window.location.hostname + `:5000/diaries/user/${userId}`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
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
            const response = await axios.patch('http://'+ window.location.hostname + `:5000/diaries/${page.id}`, requestBody, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            let newList = [...listOfDiaryPages];
            const idx = listOfDiaryPages.indexOf(page);
            newList[idx] = response.data;                
            setListOfDiaryPages(newList);
            setErrors({});
            return {};
        } catch(error) {
            const errorData = error.response.data;
            const errorDetails = {};
            errorData.detail.forEach((error) => {
                const field = error.loc[1];
                errorDetails[field] = error.msg.split(',')[1];
            });
            setErrors(errorDetails);
            return errorDetails;
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
            const response = await axios.delete('http://'+ window.location.hostname + `:5000/diaries/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            setListOfDiaryPages(listOfDiaryPages.filter(page => page.id !== response.data.id));
        } catch(error) {
            console.error('Delete Page Diary Error:', error);
        }
    }

    const createPageDiary = async () => {
        const requestBody = templateNewPage;

        try {
            const response = await axios.post('http://'+ window.location.hostname + `:5000/diaries/user/${userId}`, requestBody, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            let newListOfDiaryPages = [...listOfDiaryPages];
            newListOfDiaryPages.push(response.data);
            newListOfDiaryPages.sort((a, b) => new Date(b.create_date) - new Date(a.create_date));
            setListOfDiaryPages(newListOfDiaryPages);
            setAddNewPage(false);
            setTemplateNewPage(
                {
                    pulse: '',
                    temperature: '',
                    upper_pressure: '',
                    lower_pressure: '',
                    oxygen_level: null,
                    sugar_level: null,
                    comment: null,
                }
            );
            setErrors({});
            return {};
        } catch(error) {
            const errorData = error.response.data;
            const errorDetails = {};
            errorData.detail.forEach((error) => {
                const field = error.loc[1];
                errorDetails[field] = error.msg.split(',')[1];
            });
            setErrors(errorDetails);
            return errorDetails;
        }
    }


    return (
        <>
            {userId && (
                <>
                    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                    <div className="container">
                        <Head
                            setSidebarIsOpen={setSidebarIsOpen}
                            isAuthenticated
                        />
                        <section className="section">
                            <div className="diary">
                                <Header title={'Дневник здоровья'} />
                                {!params.id && !addNewPage && currentPage === 1 && (
                                    <Button text={'+ Добавить новую запись'} onHandleClick={() => setAddNewPage(true)} />
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
                                            errors={errors}
                                            isNewPage
                                        />

                                    </HealthDiaryContext.Provider>
                                )}
                                {currentPageData.length > 0 && currentPageData.map((page, index) =>
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
                                            errors={errors}
                                            ownerId={page.id_user}
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
                </>
            )}
            <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
        </>
    );
}

export default HealthDiary;