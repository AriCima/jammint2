
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../../services/DataService';
import LandlordJammersList from './LandlordJammersList';
import LandlordJammerInfo from './LandlordJammerInfo';

// CSS
import './index.css';

const LandlordJammers = (props) => {

    const { jamId, jammerId } = props
    const [jammers, setJammers] = useState([])
    const [jammerInfo, setJammerInfo] = useState({})

    
    useEffect(() => {
        DataService.getJammers(jamId)
        .then((res) => {
            console.log('res jamId= ', res)
            setJammers(res)
        })
    }, [jamId])

    useEffect(() => {
        if( jammerId !== ''){
            DataService.getJammerInfo(jamId, jammerId)
            .then((res) => {
                console.log('res info = ', res)
                setJammerInfo(res)
            })
        }
    }, [jamId, jammerId])


    return (
        <div className="landlord-jam-jammers">

            <div className="landlord-jam-jammers-info">
                {jamId && 
                    <LandlordJammerInfo 
                        jammerId={jammerId} 
                        jammerInfo={jammerInfo}
                        jamId={jamId} 
                    />
                }
            </div>
           
            <div className="landlord-jam-jammers-list">
                {jammers !==[] ? 
                    <LandlordJammersList
                        // jamInfo={jamInfo} 
                        jammers={jammers} 
                    /> 
                    : 
                    <p>Loading</p>
                }
            </div>

           
        </div>

    );   
};



const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId,
        jamActiveSection: state.jamSection,
        jammerId: state.jammerId
    }
}
export default connect(mapStateToProps)(LandlordJammers);