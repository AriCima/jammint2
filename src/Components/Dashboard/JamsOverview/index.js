import React, { useState,useEffect } from "react";

import DataService from "../../services/DataService";
import Calculations from '../../services/Calculations';

// CSS
import "./index.css";

const JamsOverview = (props) => {

  const { ownStudentsFlats } = props;
  
  let rooms = [[]]
  for (let j = 0; j < ownStudentsFlats.length; j++){
    DataService.getJamRooms(ownStudentsFlats[j].id)
    .then(result => {
      console.log('result: ', result);
      rooms[j] = result;
    })
  }

  console.log('rooms: ', rooms);

  const flatRoomsInfo = Calculations.mergeCompleteFlatInfo(ownStudentsFlats, rooms)
  console.log('flatRoomsInfo: ', flatRoomsInfo);

  return (
    <div className="jamsOVerview-wrapper">
      <p>This is JamsOverview</p>
    </div>
  )
  
}

export default JamsOverview;