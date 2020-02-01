import React from "react";

// CSS
import "./index.css";

const MyJamsList = ({ flats }) => {
 
  const renderJams = (flats) => {
    return flats.map((f,j) => {
      return (
        <div className="myjams-list-container" key={j}>
            
          <div className="flat-name">
            <div className="flat-name-info">
              <p>{f.jamName}</p>
            </div>
            <div className="flat-name-line"></div>
          </div>

          <div className="flats-row" key={j} to={`/single_apt_overview/${f.id}`}> 
            
            <div className="flats-list-header">
              <ul>
                <li>Room Nr</li>
                <li>Tenant</li>
                <li>Check-In</li>
                <li>Check-Out</li>
                <li>Rent (€/Mo)</li>
              </ul>     
            </div>
          </div>
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
          {rooms.jammerName === undefined ? <p><span>Vacant</span></p>:<p>{rooms.tenantName} {rooms.tenantSurname}</p>}
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

    <div className="units-list">
        <div className="overview-section-title">
          <p>Student's flats curent state</p>
        </div>

        <div className="render-flats-wrapper">
        { flats.length !== 0 ? 
            renderJams(flats) 
            :
            <div><p>LOADING !</p></div>
        }
        </div>

    </div>

    );
}

export default MyJamsList;