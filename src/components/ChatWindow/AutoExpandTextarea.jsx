import React, { useRef, useEffect } from 'react';


const AutoExpandTextarea = ({ value, onChange, placeholder }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        autoExpand(textareaRef.current);
    }, [value]);

    const autoExpand = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleInput = (event) => {
        autoExpand(event.target);
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <textarea
            ref={textareaRef}
            onChange={handleInput}
            placeholder={placeholder}
            className="auto-expand-textarea"
            id='messageText'
        />
    );
};

export default AutoExpandTextarea;
