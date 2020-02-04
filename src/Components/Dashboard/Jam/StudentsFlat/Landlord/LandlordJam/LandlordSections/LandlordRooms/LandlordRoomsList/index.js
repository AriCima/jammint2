
import React from 'react';

// COMPONENTS
import LandlordRoomCard from './LandlordRoomCard';
import ButtonPlain from '../../../../../../../../UI/ButtonPlain';
import ModalNewRoom from '../../../../../../../../UI/ModalNewRoom';

// CSS
import './index.css';

const LandlordRoomsList = ({ jamId, roomsBookings }) => {
    console.log('roomsBookings: ', roomsBookings);

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

    // const onNewRoom = () => {
    //     const roomId = 'newRoomForm'
    //     // setActiveScreen(roomId)
    //     changeRoomId(roomId)
    // };

    return (

        <>
            { roomsBookings ? renderRoomsList() : <p>Loading</p>}
            <div className="rooms-list-addRoom-area">
            {/* <ButtonPlain 
                onClick={onNewRoom}
                text='new room'
                clickHandle={onNewRoom}
            /> */}
            <ModalNewRoom 
                jamId={jamId}
            />
            </div>
        </>

    );   
};

export default LandlordRoomsList;