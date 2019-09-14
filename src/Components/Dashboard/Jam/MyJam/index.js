
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';

// CSS
import './index.css';

const MyJam = () => {


    return (

        <div className="my-jam">

        this is MY Jam

        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        // signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state) => {
    console.log('state en el jamNavBar = ', state)
    return {
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyJam);
