import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Head from './Head/Head';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Template from './Template/Template';
import Pagination from './Pagination/Pagination';
import Button from './Button/Button';


const PageSize = 1;

const Templates = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [templatesIsLoading, setTemplatesIsLoading] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [addNewTemplate, setAddNewTemplate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const templateSlice = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return templates.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, templates]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8003/templates`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setTemplates(response.data);             
            } catch(error) {
                console.error('Get List Templates Error:', error);
            }

            setTemplatesIsLoading(true);
        };
        
        fetchData();
    }, []);



    return (
        <>
            {templatesIsLoading && (
                <>
                    <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />
                    <div className="container">
                        <Head
                            setSidebarIsOpen={setSidebarIsOpen}
                            isAuthenticated
                        />
                        <section className="section section--templates">
                            <Header title={'Шаблоны страниц медицинской карты'} />
                            {templateSlice && templateSlice.map(template =>
                                <Template key={template.id} template={template} setTemplates={data => {
                                    let updatedTemplates = [...templates];
                                    const idx = updatedTemplates.indexOf(template);
                                    if (data) {
                                        updatedTemplates[idx] = data;
                                        setTemplates(updatedTemplates);
                                    } else {
                                        setTemplates(updatedTemplates.filter(tmp => tmp.id !== template.id));
                                    }
                                }} />
                            )}
                            {(templatesIsLoading && !addNewTemplate && currentPage === Math.ceil((templates.length + 1) / PageSize)) && (
                                <Button
                                    modify={'btn--add-page'}
                                    text={<span className="btn">+ Добавить шаблон</span>}
                                    onHandleClick={() => setAddNewTemplate(true)}
                                />
                            )}
                            {addNewTemplate && (
                                <Template setAddNewTemplate={(state) => setAddNewTemplate(state)} />
                            )}
                            <div className="pagination">
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={currentPage}
                                    totalCount={templates.length + 1}
                                    pageSize={PageSize}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </div>
                        </section>
                    </div>
                </>
            )}
        </>
    );
}

export default Templates;
