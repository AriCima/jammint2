
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../../services/DataService';
import LandlordRoomsList from './LandlordRoomsList';
import LandlordRoomInfo from './LandlordRoomInfo';

// CSS
import './index.css';
// import { setRoomId } from '../../../../../../../../redux/actions/roomsActions';

const LandlordRooms = (props) => {

    const { jamId, roomId } = props;
    const [roomsInfo, setRoomsInfo] = useState([]);
    const [roomBookings, setRoomBookings] = useState({});

    useEffect(() => {
        DataService.getJamRooms(jamId)
        .then((res) => {
            console.log('res del rooms = ', res)
            setRooms(res)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jamId]);
    
    useEffect(() => {   
        if (roomId !== '' && roomId !== false){
            DataService.getRoomBookings(jamId, roomId)
            .then((res) => {
                console.log('res del bookings = ', res)
                setRoomBookings(res)
            })
        } 
        return() => {
            setRoomsInfo({});
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId])

    useEffect(() => {
        setRoomsInfo(roomsInfo)
        return () => {
            setRoomsInfo({})
        };
    }, [roomsInfo])



    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">
                <LandlordRoomInfo
                    roomId={roomId} 
                    roomInfo={roomsInfo}
                    roomBookings={roomBookings}
                    jamId={jamId} 
                />
            </div>
           
            <div className="landlord-rooms-list">
                {roomsInfo !==[] ? 
                    <LandlordRoomsList
                        roomsInfo={roomsInfo} 
                    /> 
                    : 
                    <p>Loading</p>
                }
            </div>

           
        </div>

    );   
};



const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId,
        jamActiveSection: state.jamSection,
        roomId: state.roomId
    }
}
export default connect(mapStateToProps, null)(LandlordRooms);