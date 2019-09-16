
import React, { useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { setJamSection } from '../../../../../redux/actions/jamSection';

// CSS
import './index.css';

const Board = (props) => {

    const { setJamSection } = props;
    
    useEffect((sectionName) => {
        setJamSection(sectionName)
    },[setJamSection])

    return (

        <div className="my-jam" onClick={setJamSection('board')}>
            <a>Board</a>
        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: () => dispatch(setJamSection('board'))
    }
}

const mapStateToProps = (state) => {
    console.log('state en el jamNavBar = ', state)
    return {
        user: state.firebase.auth,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);
