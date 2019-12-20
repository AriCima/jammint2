import React, { useState, useEffect } from "react";

import DataService from "../../services/DataService";
import Calculations from '../../services/Calculations';
import JamsList from './JamsList';
// CSS
import "./index.css";

const JamsOverview = ({ ownStudentsFlats = [] }) => {
  const [flats, setFlats] = useState([])

  useEffect(() => {
    getRooms(ownStudentsFlats);
  }, [ownStudentsFlats])

  const getRooms = async (flats) => {
    const roomsPromise = flats.map(el => DataService.getJamRooms(el.id));
    const items = await Promise.all(roomsPromise);
    const flatRoomsInfo = Calculations.mergeCompleteFlatInfo(ownStudentsFlats, items);
    setFlats(flatRoomsInfo);
  } 

  return (
    <div className="jamsOverview-wrapper">
      { flats.length !== 0 ? 
        <JamsList flats={flats} />
        :
        <div><p>LOADING !</p></div>
      }
    </div>
  );
}

export default JamsOverview;