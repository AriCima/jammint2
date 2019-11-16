import React, { Fragment } from 'react';

import './index.css';





const Contract = (props, roomNr) => {

    const { 
        checkIn, 
        landlordTitle,
        landlordName, 
        landlordSurname, 
        landlordIdNr, 
        landlordStreet, 
        landlordHouseNr, 
        landlordFloor,
        landlordDoor, 
        landlordZipCode, 
        landlordCity, 
        jammerCity,
        jammerCondition,
        jammerCountry,
        jammerDocument,
        jammerDoor,
        jammerFloor,
        jammerHouseNr,
        jammerIdNr,
        jammerName,
        jammerSchool,
        jammerStreet,
        jammerSurname,
        jammerTitle,
        jammerZipCode,
        jammerEmail,
        jammerHomeTel,
        jammerMobile,
        jammerCourse, 
        jammerCompany,
        jamCity,
        jamDoor,
        jamFloor,
        jamHouseNr,
        jamStreet,
        jamStreetType,
        jamZipCode,
    } = props;

    return (
        <div className="contract-wrapper">
            <div className="contract-header">
                <div className="contract-header-title">
                    <h4>CONTRATO DE ARRENDAMIENTO</h4>
                </div>
                <div className="contract-header-date">
                    <p>En Barcelona, a {checkIn}</p>
                </div>
                <div className="contract-header-subtitle">
                    <h4>Reunidos</h4>
                </div>
            </div>

            <div className="contract-body">
                <div className="contract-body-section-content">
                    <p>De una parte,<br/>
                    <span>{landlordTitle} {landlordName} {landlordSurname}</span>, mayor de edad, con domicilio profesional en 
                    <span>{landlordStreet} {landlordHouseNr} {landlordFloor} {landlordDoor} {landlordZipCode}, {landlordCity}, 
                    provisto de DNI nº {landlordIdNr} </span> actuando en nombre e interés propios. En adelante el arrendador.<br/>
                    
                    <br/>Y de otra parte,<br/>
                    <span>{jammerTitle} {jammerName} {jammerSurname}</span>, 
                    mayor de edad, con domicilio en 
                    <span>{jammerStreet} {jammerHouseNr} {jammerFloor} {jammerDoor} {jammerZipCode}, {jammerCity} {jammerCountry},</span>
                    provisto de <span>{jammerDocument} nº {jammerIdNr} </span>, email {jammerEmail}, teléfono {jammerHomeTel} y teléfono móvil {jammerMobile} actuando en su propio nombre e interés.<br/></p>
                    {jammerCondition === 'student' ?
                        (
                            <p>estudiante de {jammerCourse} en {jammerSchool}.</p>
                        ) 
                        : 
                        (
                            <p>practicante en la empresa {jammerCompany}.</p>
                        )
                    } 
                    <p>En adelante el arrendatario.<br/>
                    <br/>Ambas partes se reconocen la capacidad legal necesaria para este acto, y de común acuerdo</p>
                </div>
                <div className="contract-body-section-title">
                    <br/><br/><h4>E X P O N E N</h4><br/><br/>
                </div>
                <div className="contract-body-section-content">
                    <p>I.‑ Que <span>{landlordTitle} {landlordName} {landlordSurname}</span> es propietario de la finca ubicada en</p>
                    { jamFloor === 'principal' ? <p>el Piso Principal,</p> : <p>la planta {jamFloor},</p>} 
                    puerta {jamDoor}, 
                    de la finca sita en {jamCity}, 
                    {jamStreetType} {jamStreet}, 
                    {jamHouseNr}, 
                    {jamZipCode}, 
                    de {jamCity}

                </div>

              
            </div>
        </div>
    )
}

export default Contract
