import React from "react";

import DataService from "../../../../../../../services/DataService";

import { connect } from 'react-redux';


// CSS
import "./index.css";
import { selectJam } from "../../../../../../../../redux/actions/jamActive";

 const JammerCard = (props) => {

  const { user, userJams, jI} = props
  console.log('props en el jammerCard = ', props)
  const userId = user.uid;
  const jammerId = jI.userId;

  const onContactJammer = () => {

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
        <img src={"/"} alt="img" />
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
