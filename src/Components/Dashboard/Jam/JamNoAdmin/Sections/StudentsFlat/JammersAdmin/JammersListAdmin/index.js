
import React, { Fragment } from 'react';

// COMPONENTS
import JammerCardAdmin from './JammerCardAdmin';


// CSS
import './index.css';

const JammersListAdmin = (props) => {

    const { jammers, jamInfo } = props;

    const renderJammersList = () => {
        return jammers.map((jammerInfo, i) => {
            return (
                <React.Fragment key={i}>
                    <JammerCardAdmin jamInfo={jamInfo} jI={jammerInfo} />
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

export default JammersListAdmin;