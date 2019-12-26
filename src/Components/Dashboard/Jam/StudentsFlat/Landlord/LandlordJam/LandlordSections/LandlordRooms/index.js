
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../../services/DataService';
import Calculations from '../../../../../../../services/Calculations';

import LandlordRoomsList from './LandlordRoomsList';
import LandlordRoomInfo from './LandlordRoomInfo';
import RoomsOverview from './RoomsOverview';

// CSS
import './index.css';
// import { setRoomId } from '../../../../../../../../redux/actions/roomsId';

const LandlordRooms = (props) => {

    const { jamId, roomId } = props;

    const [roomInfo, setRoomInfo] = useState({});
    const [jamRoomsInfo, setJamRoomsInfo] = useState([]);
    const [roomBookings, setRoomBookings] = useState({});
    const [jamOrderedBookings, setJamOrderedBookings] = useState([])

    useEffect(() => {
        DataService.getJamRooms(jamId)
        .then((res) => {
            setJamRoomsInfo(res)
        })
    }, []);
    
    useEffect(() => {   
        if (roomId !== '' && roomId !== false){
            DataService.getRoomBookings(jamId, roomId)
            .then((res) => {
                // console.log('roomBookings = ', res)
                setRoomBookings(res)
            })
            DataService.getRoomInfo(jamId, roomId)
            .then((res) => {
                setRoomInfo(res)
            })
        } 
        return() => {
            setRoomInfo({});
            setRoomBookings({});
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId])
    
    useEffect(() => {
        if (jamRoomsInfo.length !==0){
            let roomsBookings = []
        
            for (let i = 0; i < jamRoomsInfo.length ; i++ ){
                const jamOrderedBookings = Calculations.organizeBookings(jamRoomsInfo[i].bookingsSummary)
                const roomName = jamRoomsInfo[i].roomName;
                const roomId = jamRoomsInfo[i].id;
                const roomBookingsSummary = {roomName: roomName, roomId: roomId, bookings: jamOrderedBookings}
                roomsBookings.push(roomBookingsSummary)
            }
            setJamOrderedBookings(roomsBookings)
        }

    }, [jamRoomsInfo])

    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">
                {roomId === "" & jamOrderedBookings.length !== 0 ? 
                    <RoomsOverview 
                        // jamRoomsInfo={jamRoomsInfo} 
                        roomsBookings={jamOrderedBookings}
                    />
                    :
                    <LandlordRoomInfo
                        roomId={roomId} 
                        roomInfo={roomInfo}
                        jamId={jamId} 
                    />
                }
            </div>
            <div className="landlord-rooms-list">
                {jamRoomsInfo !==[] ? 
                    <LandlordRoomsList
                        jamRoomsInfo={jamRoomsInfo}
                        roomsBookings={jamOrderedBookings}
                    /> 
                    : 
                    <p>Loading</p>
                }
            </div>

           
        </div>

    );   
};



const mapStateToProps = (state) => {
    console.log('state: ', state);

    return {
        user: state.firebase.auth,
        roomId: state.roomId,
    }
}
export default connect(mapStateToProps, null)(LandlordRooms);