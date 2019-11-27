import React, { useEffect, useState } from 'react';

import CustomInputFieldWithLabel from '../../../CustomInputFieldWithLabel';

// CSS
import './index.css';
const StudentInfoForm = (props) => {

    const [jammerInfo, setJammerInfo] = useState({});

    useEffect(() => {
       setJammerInfo(props.jammerInfo)
    }, [props.jammerInfo])


    const handleInputChange = (event) => {
        event.persist();
        setJammerInfo(jammerInfo => ({...jammerInfo, [event.target.id]: event.target.value}));
    }

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }
    }


    console.log('jammerInfo = ', jammerInfo);
    return (
        <div className="student-info-wrapper">
            <form onSubmit={handleSubmit}>
                
                <div className="student-form-body">
                    <div className="student-form-section">
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width='200px'
                                label='Nombre'
                                placeholder='name'
                                id='jammerName'
                                value={jammerInfo.jammerName}
                                changeControl = {handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width='200px'
                                label='Surname'
                                placeholder='surname'
                                id='jammerSurname'
                                value={jammerInfo.jammerSurname}
                                changeControl = {handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width='200px'
                                label='Email'
                                placeholder='email'
                                id='jammerEmail'
                                value={jammerInfo.jammerEmail}
                                changeControl = {handleInputChange}
                            />
                            
                        </div>
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width='200px'
                                label='Home Tel'
                                placeholder='tel'
                                id='jammerHomeTel'
                                value={jammerInfo.jammerHomeTel}
                                changeControl = {handleInputChange}
                            />
                           
                           <CustomInputFieldWithLabel
                                type="text"
                                width='200px'
                                label='Mobile'
                                placeholder='mobile'
                                id='jammerMobile'
                                value={jammerInfo.jammerMobile}
                                changeControl = {handleInputChange}
                            />
                            
                            <CustomInputFieldWithLabel
                                type="text"
                                width='150px'
                                label='Passport Nr:'
                                placeholder='passport Nr'
                                id='jammerPassportNr'
                                value={jammerInfo.jammerPassportNr}
                                changeControl = {handleInputChange}
                            />

                        </div>
                    </div>
                    <div className="student-form-section">
                        <div className="student-form-dates-row">
                            <CustomInputFieldWithLabel
                                type="date"
                                width='120px'
                                label='Check-In:'
                                placeholder='checkIn'
                                id='checkIn'
                                value={jammerInfo.checkIn}
                                changeControl = {handleInputChange}
                            />
                           
                           <CustomInputFieldWithLabel
                                type="date"
                                width='120px'
                                label='Check-Out:'
                                placeholder='checkIn'
                                id='checkOut'
                                value={jammerInfo.checkOut}
                                changeControl = {handleInputChange}
                            />
                           
                        </div>
                        <div className="student-form-row">

                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='Room Nr:'
                                placeholder='room nr'
                                id='roomNr'
                                value={jammerInfo.roomNr}
                                changeControl = {handleInputChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='Rent:'
                                placeholder='rent'
                                id='rent'
                                value={jammerInfo.rent}
                                changeControl = {handleInputChange}
                            />
                            
                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='Deposit:'
                                placeholder='deposit'
                                id='deposit'
                                value={jammerInfo.deposit}
                                changeControl = {handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="student-form-section">
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width='400px'
                                label='Street:'
                                placeholder='street'
                                id='jammerStreet'
                                value={jammerInfo.jammerStreet}
                                changeControl = {handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='House Nr:'
                                placeholder='house nr'
                                id='jammerHouseNr'
                                value={jammerInfo.jammerHouseNr}
                                changeControl = {handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='Floor'
                                placeholder='floor'
                                id='jammerFloor'
                                value={jammerInfo.jammerFloor}
                                changeControl = {handleInputChange}
                            />

                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='Door'
                                placeholder='door'
                                id='jammerDoor'
                                value={jammerInfo.jammerDoor}
                                changeControl = {handleInputChange}
                            />
                        </div>
                        <div className="studnet-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='Zip-Code'
                                placeholder='zip-code'
                                id='jammerZipCode'
                                value={jammerInfo.jammerZipCode}
                                changeControl = {handleInputChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='City'
                                placeholder='city'
                                id='jammerCity'
                                value={jammerInfo.jammerCity}
                                changeControl = {handleInputChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width='120px'
                                label='Country'
                                placeholder='country'
                                id='jammerCountry'
                                value={jammerInfo.jammerCountry}
                                changeControl = {handleInputChange}
                            />
                        </div>
                        <div className="student-form-row">
                            <CustomInputFieldWithLabel
                                type="text"
                                width='400px'
                                label='Study'
                                placeholder='study'
                                id='jammerStudy'
                                value={jammerInfo.jammerStudy}
                                changeControl = {handleInputChange}
                            />
                            <CustomInputFieldWithLabel
                                type="text"
                                width='400px'
                                label='School'
                                placeholder='school'
                                id='jammerSchool'
                                value={jammerInfo.jammerSchool}
                                changeControl = {handleInputChange}
                            />
                        </div>

                    </div>
                </div>

                <div className="student-info-form-button-area">

                </div>
            </form>
        </div>
    )
}

export default StudentInfoForm