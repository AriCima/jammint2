import React, { useEffect } from "react";

import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { getUserJams } from '../../redux/actions/jamsActions';


// COMPONENTS
import JamsList from './JamsList';
import Jam from './Jam';

// CSS
import './index.css'; 

const Dashboard = ({ auth, profile, userJams, jamId, getUserJams }) => {
    // const { auth, profile, userJams, jamId, getUserJams } = props;
    const userId = auth.uid
    
    useEffect(() => {
        getUserJams(userId)
    },[getUserJams, userId]);
    
    if (!auth.uid) return <Redirect to="/login" />
    
    const renderJams = () => {
        return userJams.map((jams) => {
            return (
                <div key={jams.id}>
                    {jams.jamName}
                </div>
            )
        })
    };

    // console.log('userJams',userJams)
    return (
        <div className="home-logged">
            <div className="home-body">
                <aside className="jams-list">
                {userJams === undefined ? <p>undefined</p> : 
                    <div>{renderJams()}</div> 
                }
                </aside>

                <div className="jam-screen">
                    <div>JAMS</div>
                    {/* <div>{profile.userName}</div> */}
                    <div>{auth.uid}</div>
                    {/* <Jam jamId={jamId}/>  */}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    console.log('state del dash =', state)
    return { 
        userJams: state.userJams,
        auth: state.firebase.auth
     }
};

export default connect(mapStateToProps, 
    {getUserJams: getUserJams,
}) (Dashboard);
