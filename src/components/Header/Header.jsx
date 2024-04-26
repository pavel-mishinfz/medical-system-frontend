import React from "react";


export default function Header({title}) {
    
    return (
        <div className="section__header">
            <h2 className="section__h2">{title}</h2>
        </div>
    );
}