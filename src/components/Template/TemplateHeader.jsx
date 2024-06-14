import React, { useEffect, useState } from 'react';
import Options from '../Options/Options';


const TemplateHeader = ({value, setValue, readTemplate, setReadTemplate, beforeDeleteTemplate, error}) => {
    const [openOptions, setOpenOptions] = useState(false);

    const handleOutsideClick = (e) => {
        if (openOptions && !e.target.closest('.page__options-item')) {
          setOpenOptions(false);
        }
      }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [openOptions]);

    return (
        <div className="template__title">
            {readTemplate ?
            <>
            <h3 className="page__title">{value}</h3>
            <button className="page__open-options" onClick={() => setOpenOptions(true)}>
              <p>...</p>
            </button>
            {openOptions && (
                <Options
                    optionsData={[
                        {
                            src: "/img/options/edit.svg",
                            text: "Редактировать",
                            onHandleClick: () => setReadTemplate(false)
                        },
                        {
                            src: "/img/options/delete.svg",
                            text: "Удалить",
                            onHandleClick: () => {beforeDeleteTemplate(); setOpenOptions(false)}
                        }
                    ]}
                />
            )}
            </>
            :
            <>
            <input type="text" name="name" value={value} placeholder="Название шаблона" onChange={(e) => setValue(e.target.value)}/>
            {error && (
                <p style={{color: 'red'}}>{error}</p>
            )}
            </>
            }
        </div>
    );
}

export default TemplateHeader;
