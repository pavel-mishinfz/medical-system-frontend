import React from 'react';


export default function Alert({ text }) {
    
    return (
        <div className='alert' style={{ padding: '20px', maxWidth: '900px', minWidth: '290px', border: '3px solid #1a5dd0', backgroundColor: '#d3e6ff' }}>
            <p className='alert__text' style={{ color: '#111', fontWeight: '500', fontSize: '1.6rem', lineHeight: 1.5 }}>
                {text}
            </p>
        </div>
    );
};

