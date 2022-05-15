import React from "react";

// Styles
import './Button.css'
import "../Nav.css"

const STYLES = [
    'navbar',
    'navbar'
]

const SIZES = [
    'navbar',
    'navbar'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    
    const checkButtonStyle = 
        STYLES.includes(buttonStyle) 
        ? buttonStyle 
        : STYLES[0]

    const checkButtonSize = 
        SIZES.includes(buttonSize) 
        ? buttonSize 
        : SIZES[0]

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}