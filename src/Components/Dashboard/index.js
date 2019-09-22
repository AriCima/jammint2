import React, { useEffect } from "react";

import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { getUserJams } from '../../redux/actions/jamsActions';


// COMPONENTS
import JamsList from '../Dashboard/JamsList';
import Jam from '../Dashboard/Jam';
import { getJamInfoById } from '../../redux/actions/jamsInfo';

// CSS
import './index.css'; 

const Dashboard = ({ auth, userJams, jamId, jamSection, getUserJams }) => {

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
               <Jam jamSection={jamSection}/>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        // nombre de la función que paso como prop: (arg) => dispatch(nombre del action creator(argumento))
        getJamInfoById: (jamId) => dispatch(getJamInfoById(jamId)),
        getUserJams: (userId) => dispatch(getUserJams(userId))
    }

}

const mapStateToProps = state => {
    // console.log('state del dash =', state)
    return { 
        userJams: state.jams,
        jamInfo: state.jamInfo,
        jamSection: state.jamSection,
        jamActive: state.jamActive,
        auth: state.firebase.auth,
    }
};

// export default connect(mapStateToProps, 
//     {getUserJams: getUserJams,
// }) (Dashboard);

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
