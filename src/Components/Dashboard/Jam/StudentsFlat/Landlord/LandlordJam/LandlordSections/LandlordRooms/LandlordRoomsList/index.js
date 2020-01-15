
import React from 'react';

// COMPONENTS
import LandlordRoomCard from './LandlordRoomCard';
import ButtonPlain from '../../../../../../../../UI/ButtonPlain'

// CSS
import './index.css';

//REDUX
import { connect } from 'react-redux';
import { changeRoomId } from '../../../../../../../../../redux/actions/roomsId';
// import { setActiveScreen } from '../../../../../../../../../redux/actions/roomScreen';

// const LandlordRoomsList = (props) => {

//     const { jamRoomsInfo } = props;
const LandlordRoomsList = ({ roomsBookings, changeRoomId }) => {

    const renderRoomsList = () => {
        return roomsBookings.map((rI, i) => {
            return (
                <React.Fragment key={i}>
                    <LandlordRoomCard
                        rI={rI} 
                    />
                </React.Fragment>
            )
        })
    };

    const onNewRoom = () => {
        const roomId = 'newRoomForm'
        // setActiveScreen(roomId)
        changeRoomId(roomId)
    };

    return (

        <>
            { roomsBookings ? renderRoomsList() : <p>Loading</p>}
            <div className="rooms-list-addRoom-area">
            <ButtonPlain 
                onClick={onNewRoom}
                text='new room'
                clickHandle={onNewRoom}
            />
            </div>
        </>

    );   
};


const mapDispatchToProps = (dispatch) => {
    return {
        changeRoomId: (roomId) => dispatch(changeRoomId(roomId)),
        // setActiveScreen: (screen) => dispatch( setActiveScreen(screen)),
    }
};
export default connect (null, mapDispatchToProps)(LandlordRoomsList);