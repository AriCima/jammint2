
import React, { Fragment } from 'react';

// COMPONENTS
import JamMessageCard from './JamMessageCard';

// CSS
import './index.css';

const JammersMessages = (props) => {

    const { jm } = props

    const renderJammMessagesList = () => {
        return jm.map((item, i) => {
            return (
                <React.Fragment key={i}>
                    <JamMessageCard msg={item} />
                </React.Fragment>
            )
        })
    }

    return (

        <Fragment>
            {renderJammMessagesList()}
        </Fragment>

    );   
};

export default JammersMessages;