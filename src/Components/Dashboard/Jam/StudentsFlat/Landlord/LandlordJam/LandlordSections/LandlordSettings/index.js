
import React, { useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { setJamSection } from '../../../../../../../../redux/actions/jamSection';
// import NewAccommodationForm from '../../../../../UI/Forms/StudentsFlat/NewAccommodationForm';

// CSS
import './index.css';

const LandlordSettings = (props) => {

    const { setJamSection, jamId } = props;
    
    useEffect((sectionName) => {
        setJamSection(sectionName)
    },[setJamSection])

    return (

        <div className="landlord-jam-settings">
            SE TI NG S
            <h1>{jamId}</h1>
            {/* <NewAccommodationForm /> */}
        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        setJamSection: () => dispatch(setJamSection('settings'))
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandlordSettings);