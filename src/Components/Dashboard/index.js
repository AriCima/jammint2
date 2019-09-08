import React, { useState, useEffect } from "react";

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'

// COMPONENTS
import JamsList from './JamsList';
import Jam from './Jam';

// CSS
import './index.css'; 

const Dashboard = (props) => {

    console.log('home props', props)

    const { auth, profile, jamList, jamId } = props;
    // const [userJams, setUserJams] = useState([]);
    // const [jamId, setJamId] = useState('');
    // const [user, setUser] = useState({});
    // const { userId } = props;


    // const fetchData = () => {
    //     DataService.getUserInfoById(userId)
    //     .then(result =>{
    //         console.log('result con el snapshot =', result)
    //       setUser({
    //         id: userId, 
    //         name: result.userName, 
    //         email: result.email
    //       });
    //         console.log('result del user ', result)
    //     });

    //     DataService.getUserJams(userId)
    //     .then(result =>{
    //        // setUserJams(result)
    //        console.log('userJams received ', result)
    //        //const userJamsSorted = Calculations.sortByDateDesc(userJams)

    //     });
    // }

    if (!auth) return <Redirect to="/login" />

    return (
        <div className="home-logged">
            <div className="home-body">
                <aside className="jams-list">
                    JAMS LIST
                    {/* <JamsList jamList={jamList}/> */}
                </aside>

                <div className="jam-screen">
                    <div>JAMS</div>
                    <div>{profile.userName}</div>
                    <div>{auth.uid}</div>
                    {/* <Jam jamId={jamId}/>  */}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    console.log('state en el Dashboard', state)
    return {
        jamList: state.firestore.userJams,
        auth: state.firebase.auth,
        profile: state.firebase.profile
        // jamId: state.firestore.ordered.jamId,
    }
}


export default compose(
    connect(mapStateToProps)
    //,
    // firestoreConnect([
    //     { collection: 'users'},
    // ])
  )(Dashboard)
