import React, { useState, useEffect, useMemo, createContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Head from './Head/Head';
import Page from './Page/Page';
import Button from './Button/Button';
import Pagination from './Pagination/Pagination';
import TemplateModal from './Modal/TemplateModal';
import Header from './Header/Header';


const PageSize = 1;
export const MedicalCardPagesContext = createContext();

const MedicalCardPagesList = ({currentUserData}) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [pagesIsLoading, setPagesIsLoading] = useState(false);
    const [listPages, setListPages] = useState([]);
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
            const response = await axios.get('http://'+ window.location.hostname + `:5000/templates/${templateId}`, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                            },
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
                const response = await axios.get('http://'+ window.location.hostname + `:5000/pages/card/${cardId}`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setListPages(response.data);   
                
                if (currentUserData.specialization_id) {
                    try {
                        const response = await axios.get('http://'+ window.location.hostname + `:5000/cards/${cardId}`, {
                                        headers: {
                                            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                        },
                                    });                
             
                        setPatient({
                            id: response.data.id_user,
                            name: response.data.name,
                            surname: response.data.surname,
                            patronymic: response.data.patronymic
                        })
    
                    } catch(error) {
                        console.error('Get Card Error:', error);
                    }
                } else {
                    setPatient({
                        name: currentUserData.name,
                        surname: currentUserData.surname,
                        patronymic: currentUserData.patronymic
                    })
                }
                
            } catch(error) {
                console.error('Get List Pages Error:', error);
            }

            setPagesIsLoading(true);
        };
        
        fetchData();
    }, []);

    const createPage = async (templateId) => {
        let requestBody = {
            data: templateData,
            id_doctor: sessionStorage.getItem('userId')
        };

        try {
            const response = await axios.post('http://'+ window.location.hostname + `:5000/pages/card/${cardId}/template/${templateId}`, requestBody, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            
            if (listPages.length === 0) {
                requestBody = {
                    doctor_id: sessionStorage.getItem('userId'),
                    patient_id: patient.id
                }
    
                axios.post('http://' + window.location.hostname + `:5000/chats`, requestBody, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    }
                })
                .then(response => {
                    console.log(response.status);
                })
                .catch(error => {
                    console.error('Create Chat Error:', error);
                })
            }

            let newListPage = [...listPages];
            newListPage.push(response.data);
            setListPages(newListPage);
            setAddNewPage(false);

        } catch(error) {
            console.error('Create Page Error:', error);
        }
    }

    const deletePage = async (id) => {
        try {
            const response = await axios.delete('http://'+ window.location.hostname + `:5000/pages/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            setListPages(listPages.filter(page => page.id !== id));
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
            const response = await axios.put('http://'+ window.location.hostname + `:5000/pages/${page.id}`, requestBody, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            updatePage(response.data.data, page);                           
        } catch(error) {
            console.error('Update Page Error:', error);
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
                            <div className="page-list">
                                <Header title={'Электронная медицинская карта'} />
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
                                            ownerId={page.id_doctor}
                                        />

                                    </MedicalCardPagesContext.Provider>
                                )}
                                {currentUserData.specialization_id && pagesIsLoading && !addNewPage && currentPage === Math.ceil((listPages.length + 1) / PageSize) && (
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
                                {listPages.length > 0 && (
                                    <div className="pagination">
                                        <Pagination
                                            className="pagination-bar"
                                            currentPage={currentPage}
                                            totalCount={currentUserData.specialization_id ? listPages.length + 1 : listPages.length}
                                            pageSize={PageSize}
                                            onPageChange={page => setCurrentPage(page)}
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </>
            )}
            {openTemplateListModal && (
                <TemplateModal
                    onCloseModal={() => setOpenTemplateListModal(false)}
                    addNewPage={() => setAddNewPage(true)}
                    getTemplate={template => setTemplate(template)}
                    getTemplateData={data => setTemplateData(data)}
                />
            )}
            <div className={`popup popup--sidebar ${sidebarIsOpen && 'active'}`} />
        </>
    );
}

export default MedicalCardPagesList;


export function getTemplateItems(templateStructure, templateData) {

    templateStructure.map(item =>
        item.body = item.fields.map((field, index) => {
            if (field.type === 'select' && field.options) {
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