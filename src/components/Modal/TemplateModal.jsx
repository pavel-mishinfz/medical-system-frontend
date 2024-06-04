import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TemplateModal = ({onCloseModal, addNewPage, getTemplate, getTemplateData}) => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://'+ window.location.hostname + `:8006/templates`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                },
                            });
                setTemplates(response.data);             
            } catch(error) {
                console.error('Get List Templates Error:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleNewTemplate = async (templateId) => {

        try {
            const response = await axios.get('http://'+ window.location.hostname + `:8006/templates/${templateId}`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                                }
                            });
            addNewPage();
            getTemplate(response.data);
            getTemplateData(makeTemplateData(response.data.structure)); 
            onCloseModal();
        } catch(error) {
            console.error('Get Template Error:', error);
        }
    }


    return (
        <>
        {templates.length > 0 && (
        <div className="modal">
            <div className="templates">
            <div className="templates__close" onClick={onCloseModal}>&times;</div>
                <div className="templates__header">
                    <h2 className="templates__h2">Список шаблонов</h2>
                </div>
                <div className="templates__list">
                    {templates.map((template, index) => 
                    <>
                    <div className="templates__divider"></div>
                    <div key={index} className="templates__list-item" onClick={() => handleNewTemplate(template.id)}>
                        {template.name}
                    </div>
                    {index === templates.length-1 && (
                    <div className="templates__divider"></div>
                    )}
                    </>
                    )}
                </div>
            </div>
        </div>
        )}
        </>
    );
}

export default TemplateModal;


function makeTemplateData(templateStructure) {
    let templateData = {};

    templateStructure.map(item =>
        item.fields.map(field =>
            templateData[field.name] = field.value
        )
    );

    return templateData;
}