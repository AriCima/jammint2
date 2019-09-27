import React from "react";

import DataService from "../../../../../../../services/DataService";

import { connect } from 'react-redux';


// CSS
import "./index.css";
import { selectJam } from "../../../../../../../../redux/actions/jamActive";

 const JammerCard = (props) => {

  const { name, email, url, jammerId, user, userJams, jI} = props

  const onContactJammer = (jammerId, userId) => {

    const chatId = userId + jammerId;
    const reverseChatId = jammerId + userId;

    if(userJams.includes(chatId)){
      return selectJam(chatId)
    };
    
    if(userJams.includes(reverseChatId)){
      return selectJam(reverseChatId)
    }

    const chatInfo = { createdAt: new Date(), adminId: userId, jamId: chatId }

    DataService.startChat(chatId, chatInfo)
    .then(res => {
      console.log('res del startChat = ', res)
      DataService.addJamToUser(userId, chatInfo);
      DataService.addJamToUser(jammerId, chatInfo);
    })
  }

  return (

    <button className="jammer-card-container" onClick={()=> onContactJammer(user.id, jammerId)}>

      <div className="jammer-img">
        <img src={`/${url}`} alt="userIMG" />
      </div>

      <div className="jammer-name">
        <p>{jI.name}</p>
      </div>

      <div className="jammer-country">
        <p>{jI.country}</p>
      </div>

    </button>
  )
  
}



const mapStateToProps = (state) => {
  return {
      user: state.firebase.auth,
      jamActive: state.jamActive,
      userJams: state.userJams,
  }
}
export default connect(mapStateToProps)(JammerCard);
