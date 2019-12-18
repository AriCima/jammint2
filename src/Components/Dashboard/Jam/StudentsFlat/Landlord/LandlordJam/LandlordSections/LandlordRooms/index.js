
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import DataService from '../../../../../../../services/DataService';
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
    

    useEffect(() => {
        DataService.getJamRooms(jamId)
        .then((res) => {
            console.log('res del get RoomsInfo = ', res)
            setJamRoomsInfo(res)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jamId]);
    
    useEffect(() => {   
        if (roomId !== '' && roomId !== false){
            DataService.getRoomBookings(jamId, roomId)
            .then((res) => {
                // console.log('roomBookings = ', res)
                setRoomBookings(res)
            })
            DataService.getRoomInfo(jamId, roomId)
            .then((res) => {
                console.log('roomInfo = ', res)
                setRoomInfo(res)
            })
        } 
        return() => {
            setRoomInfo({});
            setRoomBookings({});
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId])


    console.log('roomInfo: ', roomInfo);
    console.log('jamRoomsInfo: ', jamRoomsInfo);
    // console.log('roomBookings: ', roomBookings);

    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">
                {roomId === "" ? 
                    <RoomsOverview 
                        jamRoomsInfo={jamRoomsInfo} 
                    />
                    :
                    <LandlordRoomInfo
                        roomId={roomId} 
                        roomInfo={roomInfo}
                        roomBookings={roomBookings}
                        jamId={jamId} 
                    />
                }
            </div>
            <div className="landlord-rooms-list">
                {jamRoomsInfo !==[] ? 
                    <LandlordRoomsList
                        jamRoomsInfo={jamRoomsInfo} 
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
        jamActiveSection: state.jamSection,
        roomId: state.roomId,
    }
}
export default connect(mapStateToProps, null)(LandlordRooms);