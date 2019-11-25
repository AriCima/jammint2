import React, { useState, useEffect } from 'react';

import DataService from '../../../../../../../../services/DataService';
import ButtonContactJammer from '../../../../../../../../UI/ButtonContactJammer';
import StudentInfoForm from '../../../../../../../../UI/Forms/StudentsFlat/StudentInfoForm';

import { connect } from 'react-redux';
import { getJammerInfo } from '../../../../../../../../../redux/actions/jamersActions';
import { selectJam } from "../../../../../../../../../redux/actions/jamActive";

// CSS
import './index.css';

const LandlordJammerInfo = (props) => {
  console.log('props jammerInfo: ', props);

    const { auth, jamId, jammerId, userJams } = props;
    const [ jammerInfo, setJammerInfo ] = useState({})
    const userId = auth.uid;

    useEffect(() => {
        jammerId && getJammerInfo(jamId, jammerId)
    }, [jamId, jammerId]);

    // useEffect(() => {
    //     jammerInfo !== {} && setJammerInfo(jammerInfo)
    // }, [jammerInfo]);

    const contactJammer = () => {

        const chatId = userId + jammerId;
        const reverseChatId = jammerId + userId;

        const jammerName = jammerInfo.name
    
        if(userJams.includes(chatId)){
          return selectJam(chatId)
        };
        
        if(userJams.includes(reverseChatId)){
          return selectJam(reverseChatId)
        }
    
        const chatInfo = { 
          createdAt: new Date(), 
          adminId: userId, 
          user2Id: jammerId,
          user2Name: jammerName,
          jamId: chatId, 
          jamType: 'chat', 
          messages: [] 
        }
    
        DataService.startChat(chatId, chatInfo)
        .then(res => {
          //console.log('res del startChat = ', res)
        })
        DataService.addJamToUser(userId, chatInfo);
        DataService.addJamToUser(jammerId, chatInfo);
        props.setJamSection('chat')
    }
    console.log('jammerId', jammerId)
    return(
        <div className="jammer-info-wrapper">
            <div className="jammer-info-form">
                <StudentInfoForm 
                  jammerId={jammerId}
                />
            </div>

            <ButtonContactJammer
              jammerName={LandlordJammerInfo.name}
              onContactJammer={contactJammer}
            />
                
        </div>
    )
}

const mapStateToProps = state => {
    return { 
      auth: state.firebase.auth,
      jamActiveSection: state.jamSection,
      jammerId: state.jammerId
    }
};
  
export default connect(mapStateToProps) (LandlordJammerInfo);
  
  