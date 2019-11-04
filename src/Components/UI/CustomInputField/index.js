import React from "react";

// CSS
import "./index.css";

const CustomInputField = ({ size, placeholder, type, id, value, changeControl, divWidth}) => {

    const handleChange = (event) => {
        console.log('handle change launched');
       changeControl(event)
    }

    return (
     
        <div className="input-unit" style={{width: divWidth}}>
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

{/* <CustomInputField 
    
    label='input custom test'
    placeholder='input info'
    type="text"
    id='inputTest'
    width='120px'
    onChange = {id => { console.log(id) }}
/> */}