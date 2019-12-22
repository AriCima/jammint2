import React, { useState, useEffect, Fragment } from "react";

import { connect } from 'react-redux';
import { getUserJams } from '../../redux/actions/jamsActions';
import { getJamInfo } from '../../redux/actions/jamInfo';

import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// COMPONENTS
import JamsList from './JamsList';
import Jam from './Jam';
import JamsOverview from './JamsOverview';
// CSS
import './index.css'; 

const Dashboard = ({ auth, userJams, getJamInfo, jamId, jamInfo, props }) => {
    const [ jamsList, setJamsList ] = useState([]);
    const [ ownStudentsFlats, setOwnStudentsFlats] = useState([])

    useEffect(() => {
        const userId = auth.uid;
        DataService.getUserJams(userId)
        .then(result => {
            setJamsList(result);
            const x = Calculations.getOnwStudentsFlats(result, userId)
            setOwnStudentsFlats(x);
        })
        .catch(err => console.log(err));


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth.uid, userJams]);

    useEffect(() => {
        jamId && getJamInfo(jamId)
    }, [getJamInfo, jamId]);
    

    console.log('jamId antes del render de Dash = ', jamId)
    return (
        <div className="dashboard">
            <aside className="jams-list">

            {jamsList === null ? <p>LOADING !</p> : 
                <JamsList userJams={jamsList}/>
            }
            </aside>

            <div className="jam-screen">
                { jamId === null ? 
                // { jamInfo.length === 0 ? 
                    <JamsOverview 
                        ownStudentsFlats={ownStudentsFlats}
                    /> 
                    :
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
    // console.log('state del Dashboard : ', state)
    return { 
        jamId: state.jamId,
        jamInfo: state.jamInfo,
        auth: state.firebase.auth,
        userJams: state.userJams,
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);
