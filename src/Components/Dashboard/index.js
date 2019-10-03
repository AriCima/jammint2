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

const Dashboard = ({ auth, userJams, jamId, jamActive, jamSection, getUserJams, jamType }) => {

    useEffect(() => {
       getUserJams(auth.uid);
    },[getUserJams, auth.uid]);

    return (
        <div className="dashboard">
            <aside className="jams-list">
            {!userJams ? <p>LOADING !</p> : 
                <JamsList userJams={userJams}/>
            }
            </aside>

            <div className="jam-screen">
               <Jam 
                    jamId={jamId}
                    jamType={jamType}
                    jamActive={jamActive} 
                    jamSection={jamSection}
                />
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
        jamActive: state.jamActive,
        auth: state.firebase.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
