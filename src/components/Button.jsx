import React from "react";
import './Button.css';

export default props => 
    <button 
        onClick={e => props.click && props.click(props.label)}
        className={`
        button
        ${props.double ? 'double' : ''}
        ${props.triple ? 'triple' : ''}
        ${props.op ? 'op' : ''}

    `}>
        {props.label}
    </button>