import React, { useState, useEffect } from "react";

// CSS
import "./index.css";

const JamsList = ({ flats }) => {
 
   


  const renderJams = (flats) => {
    return flats.map((f,j) => {
      return (
        <div className="jams-list-container">
          <button className="apts-row" key={j} to={`/single_apt_overview/${f.id}`}> 
          
            <div className="apts-info-block">
               <p>{f.jamName}</p>
            </div>
            {/* <div className="apts-info-block-name">
                { !f.tenantName && f.roomsRental === 'NO'? <p><span>Vacant</span></p> : <p>{f.tenantName} {f.tenantSurname}</p>}
            </div> */}
            {/* <div className="apts-info-block">
                <p>{f.checkIn}</p>
            </div>
            <div className="apts-info-block">
                <p>{f.checkOut}</p>
            </div>
            <div className="apts-info-block-c">
                <p>{f.rPrice}</p>
            </div> */}
          </button>
            <div className="home-rooms-list">
              {renderRooms(f.rooms)}
            </div>
        </div>
      )
    })
  };

  const renderRooms = (jamRooms) => {

    return jamRooms.map((rooms,j) => {
      return (
        <button className="rooms-home-row" key={j} to={`/single_room_overview/${rooms.id}`}> 
        
          <div className="rooms-home-block-nr">
              <p>{rooms.roomName}</p>
          </div>
          <div className="rooms-home-block-name">
          {rooms.tenantName === undefined ? <p><span>Vacant</span></p>:<p>{rooms.tenantName} {rooms.tenantSurname}</p>}
          </div>
          <div className="rooms-home-block">
              <p>{rooms.checkIn}</p>
          </div>
          <div className="rooms-home-block">
              <p>{rooms.checkOut}</p>
          </div>
          <div className="rooms-home-block-c">
              <p>{rooms.rPrice}</p>
          </div>
        </button>
      )
    })
  }; 

  return (
    <div className="jamsOverview-wrapper">
      <div className="units-list">
        <div className="overview-section-title">
          <h3>Student's flats curent state</h3>
        </div>

        <div className="units-list-header">
          <ul>
            <li>ID</li>
            <li>Tenant</li>
            <li>Check-In</li>
            <li>Check-Out</li>
            <li>Rent (€/Mo)</li>
          </ul>     
        </div>
        <div className="units-list-super-container">
          { flats.length !== 0 ? 
            renderJams(flats) 
            :
            <div><p>LOADING !</p></div>
          }
        </div>

      </div>

    </div>
    );
}

export default JamsList;