
import React from 'react';

// COMPONENTS
import LandlordRoomCard from './LandlordRoomCard';
import ButtonPlain from '../../../../../../../../UI/ButtonPlain'

// CSS
import './index.css';

const LandlordRoomsList = (props) => {

    const { rooms } = props;

    const renderRoomsList = () => {
        return rooms.map((rI, i) => {
            return (
                <React.Fragment key={i}>
                    <LandlordRoomCard
                        rI={rooms} 
                    />
                </React.Fragment>
            )
        })
    }

    const onNewRoom = () => {
        props.setRoomId('newRoom')
    }

    return (

        <>
            { rooms ? renderRoomsList() : <p>Loading</p>}
            <div className="rooms-list-addRoom-area">
            <ButtonPlain 
                onClick={onNewRoom}
                text='new room'
            />
            </div>
        </>

    );   
};

export default LandlordRoomsList;