import React from "react";

// CSS
import "./index.css";

const CustomInputField = ({ size, placeholder, type, id, value, onChange}) => {

    return (
     
        <div className="input-unit" >
            <input
                className="input-field"
                type={type}
                id={id}
                size={size}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}



export default CustomInputField;