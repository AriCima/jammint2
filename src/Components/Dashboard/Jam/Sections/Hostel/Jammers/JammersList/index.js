
import React, { Fragment } from 'react';

// COMPONENTS
import JammerCard from './JammerCard';

import Calculations from '../../../../../../services/Calculations'


// CSS
import './index.css';

const JammersList = (props) => {

    const { jammers } = props

    // const myJammers = Calculations.getMyJammers(jammers)

    const renderJammersList = () => {
        return jammers.map((jammerInfo, i) => {
            return (
                <React.Fragment key={i}>
                    <JammerCard jI={jammerInfo} />
                </React.Fragment>
            )
        })
    }

    return (

        <Fragment>
            { jammers ? renderJammersList() : <p>Loading</p>}
        </Fragment>

    );   
};

export default JammersList;