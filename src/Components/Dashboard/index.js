import React, { useState, useEffect, Fragment } from "react";

import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { getUserJams } from '../../redux/actions/jamsActions';


// COMPONENTS
import JamsList from '../Dashboard/JamsList';
import Jam from '../Dashboard/Jam';

// CSS
import './index.css'; 

const Dashboard = ({ auth, userJams, jamId, jamSection, getUserJams, jamType }) => {

    const [ jamActive, setJamActive ] = useState(jamId)
    useEffect(() => {
       getUserJams(auth.uid);
    },[getUserJams, auth.uid]);

    useEffect(() => {
        setJamActive(jamId)
    }, [jamId])

    // EJEMPLO DE USE EFFECT EN FLAIX-BAC
    // useEffect(() => {
    //     (async () => {
    //       const { ip = '' } = await checkIp();
    //       const localData = JSON.parse(localStorage.getItem(ip));
    
    //       setState({ ip, localData });
    //     })();
    //   }, []);
    
    return (
        <div className="dashboard">
            <aside className="jams-list">
            {!userJams ? <p>LOADING !</p> : 
                <JamsList userJams={userJams}/>
            }
            </aside>

            <div className="jam-screen">
                { jamId ?
                    <Jam 
                    jamId={jamActive}
                    // jamType={jamType}
                    // jamActive={jamActive} 
                    // jamSection={jamSection}
                    />
                    :
                    <Fragment></Fragment>
                }
              
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        // nombre de la función que paso como prop: (arg) => 
        // dispatch(nombre del action creator(argumento))
        getUserJams: (userId) => dispatch(getUserJams(userId))
    }
}

const mapStateToProps = state => {
    console.log('state del dash =', state)
    return { 
        userJams: state.userJams,
        jamSection: state.jamSection,
        jamId: state.jamId,
        auth: state.firebase.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
