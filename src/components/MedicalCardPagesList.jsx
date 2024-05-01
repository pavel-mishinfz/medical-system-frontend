import React, { useState, useEffect, useMemo, createContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Page from './Page/Page';
import Button from './Button/Button';
import Pagination from './Pagination/Pagination';
import TemplatesList from './TemplatesList';
import Header from './Header/Header';


const PageSize = 1;
export const MedicalCardPagesContext = createContext();

const MedicalCardPagesList = () => {
    const [listPages, setListPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [openTemplateListModal, setOpenTemplateListModal] = useState(false);
    const [addNewPage, setAddNewPage] = useState(false);
    const [templatePage, setTemplatePage] = useState(null);
    const [template, setTemplate] = useState(null);
    const [templateData, setTemplateData] = useState(null);
    const [patient, setPatient] = useState();

    const params = useParams();
    const cardId = params.id;

    const getTemplateById = async (templateId) => {
        try {
            const response = await axios.get('http://'+ window.location.hostname + `:8003/templates/${templateId}`, {
                            // headers: {
                            //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                            // },
                        });
            setTemplatePage(response.data);             
        } catch(error) {
            console.error('Get Template Error:', error);
        }
    }

    const pageData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const paginationResult = listPages ? listPages.slice(firstPageIndex, lastPageIndex) : [];
        if (paginationResult.length > 0) {
            getTemplateById(paginationResult[0].id_template);
        }
        return paginationResult;
    }, [currentPage, listPages]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8002/pages/card/${cardId}`, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // },
                            });
                setListPages(response.data);   
                
                try {
                    const response = await axios.get('http://'+ window.location.hostname + `:8002/cards/${cardId}`, {
                                    // headers: {
                                    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOGE1NmVhYy1iNWNhLTQ0YjgtYjU0OS00MmNmMjJiNjk3MDkiLCJhdWQiOlsiZmFzdGFwaS11c2VyczphdXRoIl0sImdyb3VwX2lkIjoyLCJleHAiOjE3MTQ1MTY0MzJ9.6S2f9KmjqkdOJWz12aLO4bjkxWEzzRlDIHaOB6aUqjE`,
                                    // },
                                });                
         
                    setPatient({
                        name: response.data.name,
                        surname: response.data.surname,
                        patronymic: response.data.patronymic
                    })

                } catch(error) {
                    console.error('Get Card Error:', error);
                }
                
            } catch(error) {
                console.error('Get List Pages Error:', error);
            }
        };
        
        fetchData();
    }, []);

    const createPage = async (templateId) => {
        const requestBody = {
            data: templateData,
            id_doctor: '08a56eac-b5ca-44b8-b549-42cf22b69709'
        };

        try {
            const response = await axios.post('http://'+ window.location.hostname + `:8002/pages/card/${cardId}/template/${templateId}`, requestBody, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            window.location.reload();
        } catch(error) {
            console.error('Create Page Error:', error);
        }
    }

    const deletePage = async (id) => {
        try {
            const response = await axios.delete('http://'+ window.location.hostname + `:8002/pages/${id}`, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            window.location.reload();
        } catch(error) {
            console.error('Delete Page Error:', error);
        }
    }

    const updatePage = (data, page) => {
        let newList = [...listPages];
        const idx = listPages.indexOf(page);
        newList[idx].data = data;
        setListPages(newList);
    }

    const handlePageData = async (page) => {
        const requestBody = page;

        try {
            const response = await axios.put('http://'+ window.location.hostname + `:8002/pages/${page.id}`, requestBody, {
                                // headers: {
                                //     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                // }
                            });
            updatePage(response.data.data, page);                           
        } catch(error) {
            console.error('Update Page Error:', error);
        }
    }


    return (
        <>
        <Sidebar />
            <div className="container">
            <Head />
                <section className="section">
                    <div className="page-list">
                        <Header title={'Электронная медицинская карта'}/>
                        {templatePage && pageData.length > 0 && pageData.map(page =>
                            <MedicalCardPagesContext.Provider
                            key={page.id}
                            value={{
                                title: templatePage.name,
                                date: page.create_date,
                                doctorId: page.id_doctor,
                                patient: patient,
                                isMedcardPage: true
                            }}
                            >

                            <Page
                            pageData={page.data}
                            pageItems={getTemplateItems(templatePage.structure, page.data)}
                            updatePage={data => updatePage(data, page)} 
                            handlePageData={() => handlePageData(page)}
                            deletePage={() => deletePage(page.id)}
                            />

                            </MedicalCardPagesContext.Provider>   
                        )}
                        {listPages && !addNewPage && currentPage === Math.ceil((listPages.length+1) / PageSize) && (
                            <Button 
                            modify={'btn--add-page'}
                            text={<span className="btn">+ Добавить страницу</span>}
                            onHandleClick={() => setOpenTemplateListModal(true)}
                            />
                        )}
                        {addNewPage && (
                            <MedicalCardPagesContext.Provider
                            value={{
                                title: template.name,
                                date: null,
                                doctorId: null,
                                patient: patient,
                                isMedcardPage: true
                            }}
                            >

                            <Page
                            pageData={templateData}
                            pageItems={getTemplateItems(template.structure, templateData)}
                            updatePage={data => setTemplateData(data)} 
                            handlePageData={() => createPage(template.id)}
                            setAddNewPage={state => setAddNewPage(state)}
                            isNewPage={true}
                            />

                            </MedicalCardPagesContext.Provider>
                        )}
                        {listPages && (
                        <div className="pagination">
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={listPages.length+1}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        )}
                    </div>
                </section>
            </div>
        {openTemplateListModal && (
            <TemplatesList 
            onCloseModal={() => setOpenTemplateListModal(false)}
            addNewPage={() => setAddNewPage(true)}
            getTemplate={template => setTemplate(template)}
            getTemplateData={data => setTemplateData(data)}
            />
        )}
        </>
    );
}

export default MedicalCardPagesList;


function getTemplateItems(templateStructure, templateData) {

    templateStructure.map(item =>
        item.body = item.fields.map((field, index) => {
            if (field.type === 'select') {
                let selectBody = "";
                selectBody = field.options.map(option => {
                    if (option.id == templateData[field.name]) {
                        return option.name;
                    }
                })
                return item.fields.length-1 > index ? selectBody[templateData[field.name]] + item.divider + ' ' : selectBody[templateData[field.name]];
            } else {
                return item.fields.length-1 > index ? templateData[field.name] + item.divider + ' ' : templateData[field.name]; 
            }
        })
    )

    templateStructure.map(item => 
        item.fields.map(field =>
            field.value = templateData[field.name]
        )
    ) 

    return templateStructure;
}