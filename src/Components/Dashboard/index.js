import React, { useEffect } from "react";

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

const Dashboard = ({ auth, profile, userJams, jamId, getUserJams }) => {
  
    useEffect(() => {
        // if (!auth.uid) return <Redirect to="/login" />
        getUserJams(auth.uid)
    },[getUserJams, auth]);
    

    return (
        <div className="dashboard">
            <aside className="jams-list">
            {!userJams ? <p>LOADING !</p> : 
                <JamsList userJams={userJams}/>
            }
            </aside>

            <div className="jam-screen">
               <Jam jamId={jamId}/>
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    console.log('state del dash =', state)
    return { 
        userJams: state.jams,
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps, 
    {getUserJams: getUserJams,
}) (Dashboard);
