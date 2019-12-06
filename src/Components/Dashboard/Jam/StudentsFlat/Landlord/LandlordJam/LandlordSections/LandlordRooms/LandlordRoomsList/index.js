
import React from 'react';

// COMPONENTS
import LandlordRoomCard from './LandlordRoomCard';
import ButtonPlain from '../../../../../../../../UI/ButtonPlain'

// CSS
import './index.css';

//REDUX
import { connect } from 'react-redux';
import { setRoomId } from '../../../../../../../../../redux/actions/roomsActions';

const LandlordRoomsList = (props) => {

    const { rooms } = props;

    const renderRoomsList = () => {
        return rooms.map((rI, i) => {
            return (
                <React.Fragment key={i}>
                    <LandlordRoomCard
                        rI={rI} 
                    />
                </React.Fragment>
            )
        })
    }

    const onNewRoom = () => {
        const roomId = 'newRoom'
       props.setRoomId(roomId)
    }

    return (

        <>
            { rooms ? renderRoomsList() : <p>Loading</p>}
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
        setRoomId: (roomId) => dispatch(setRoomId(roomId))
    }
};
export default connect (null, mapDispatchToProps)(LandlordRoomsList);