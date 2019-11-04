import React from "react";

// CSS
import "./index.css";

const CustomInputField = ({ size, placeholder, type, id, value, changeControl, width}) => {

    const handleChange = (event) => {
        console.log('handle change launched');
       changeControl(event)
    }

    console.log('width = ', width)
    return (
     
        <div className="input-unit" style={{width: width}}>
            <input
                className="input-field"
                type={type}
                id={id}
                size={size}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default CustomInputField;


// IN FATHER PASTE THIS BLOCK

{/* <CustomInputField
    width='120px'
    label='input custom test'
    placeholder='input info'
    type="text"
    id='inputTest'
    onChange = {handleChange}
/> */}