import React, { useState, useEffect, Fragment } from "react";

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserJams } from '../../redux/actions/jamsActions';
import { getJamInfo } from '../../redux/actions/jamInfo';

import DataService from '../services/DataService';


// COMPONENTS
import JamsList from '../Dashboard/JamsList';
import Jam from '../Dashboard/Jam';
import JamAdmin from '../Dashboard/Jam';
// CSS
import './index.css'; 

const Dashboard = ({ auth, userJams, getUserJams, getJamInfo, jamId, jamInfo }) => {

    const [ jamsList, setJamsList ] = useState([]);

    console.log('jamInfo dashboard: ', jamInfo);

    useEffect(() => {
        const userId = auth.uid;
        //getUserJams(userId);
       DataService.getUserJams(userId).then(result=>{
        setJamsList(result);
       });

    },[auth.uid, getUserJams, userJams]);

    useEffect(() => {
        jamId && getJamInfo(jamId)
    }, [getJamInfo, jamId]);

    const userId  = auth.uid;
    const adminId  = jamInfo.adminId;
    const isAdmin = userId && adminId;
    console.log('jamsList = ', jamsList)
    return (
        <div className="dashboard">
            <aside className="jams-list">

            {jamsList === undefined ? <p>LOADING !</p> : 
                <JamsList userJams={jamsList}/>
            }
            </aside>

            <div className="jam-screen">
                { jamInfo === [] ? <p>SELECT YOUR JAM</p> :
                    <Jam 
                        jamId={jamId}
                        jamInfo={jamInfo}
                    />
                }
            
            </div>
            
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        // nombre de la función que paso como prop: (arg) => 
        // dispatch(nombre del action creator(argumento))
        getUserJams: (userId) => dispatch(getUserJams(userId)),

        getJamInfo: (jamId) => dispatch(getJamInfo(jamId))
    }
}

const mapStateToProps = state => {
    return { 
        jamId: state.jamId,
        jamInfo: state.jamInfo,
        auth: state.firebase.auth,
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
