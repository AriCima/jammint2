import React, { useState, useEffect } from "react";

import DataService from "../../services/DataService";
import Calculations from '../../services/Calculations';

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
    <div className="jamsOVerview-wrapper">
      <p>This is JamsOverview</p>
    </div>
  );
}

export default JamsOverview;