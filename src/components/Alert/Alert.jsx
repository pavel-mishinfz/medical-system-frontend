import React from 'react';


export default function Alert() {
    
    return (
        <div className='alert' style={{ padding: '20px', maxWidth: '900px', minWidth: '290px', border: '3px solid #1a5dd0', backgroundColor: '#d3e6ff' }}>
            <p className='alert__text' style={{ color: '#111', fontWeight: '500', fontSize: '1.6rem', lineHeight: 1.5 }}>Уважаемый пользователь! У Вас еще нет электронной медицинской карты. Вы можете завести её, если лично посетите наше учреждение. В случае отсутствия данной возможности, Вы всегда можете отправить <a href="#" style={{ color: '#1a5dd0' }}>необходимые документы</a> на почту <a href="#" style={{ color: '#1a5dd0' }}>admin@admin.ru</a></p>
        </div>
    );
};

