
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../../services/DataService';
import LandlordJammersList from './LandlordJammersList';
import LandlordJammerInfo from './LandlordJammerInfo';

// CSS
import './index.css';

const LandlordJammers = (props) => {
    console.log('props en Jammers: ', props);

    const { jamId } = props
    const [jammers, setJammers] = useState([])

    
    useEffect(() => {
        console.log('USE EFFECT LAUNCHED')
        DataService.getJammers(jamId)
        .then((res) => {
            console.log('res = ', res)
            setJammers(res)
        })
       
    }, [jamId])


    return (
        <div className="landlord-jam-jammers">

            <div className="landlord-jam-jammers-info">
                {jammers !==[] ? <LandlordJammerInfo jamId={jamId} /> : <div>LOADING !</div>}
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
    }
}
export default connect(mapStateToProps)(LandlordJammers);