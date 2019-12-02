
import React, { useState, useEffect } from 'react';

// COMPONENTS
import { connect } from 'react-redux';
import { getJammerInfo } from '../../../../../../../../redux/actions/jammersActions'
import DataService from '../../../../../../../services/DataService';
import LandlordRoomsList from './LandlordRoomsList';
import LandlordRoomInfo from './LandlordRoomInfo';

// CSS
import './index.css';
import { setRoomId } from '../../../../../../../../redux/actions/roomsActions';

const LandlordRooms = (props) => {

    const { jamId, roomId } = props;
    const [rooms, setRooms] = useState([]);
    const [roomInfo, setRoomInfo] = useState({});

    useEffect(() => {
        console.log('el use del rooms launched ', jamId)
        DataService.getJamRooms(jamId)
        .then((res) => {
            console.log('el res rooms = ', res)
            setRooms(res)
            setRoomId(res.id)
            console.log('roomId = ', roomId)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jamId]);
    

    useEffect(() => {   
        console.log('roomId = ', roomId, typeof roomId)     
        if (roomId !== ''){
            console.log('entró en el if');
            DataService.getRoomInfo(jamId, roomId)
            .then((res) => {
                setRoomInfo(res)
            })
        } 
        return() => {
            setRoomInfo(roomInfo);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId])

    // useEffect(() => {
    //     if( jammerId !== ''){  
    //         getJammerInfo(jamId, jammerId)
    //         // DataService.getJammerInfo(jamId, jammerId)
    //         // .then((res) => {
    //         //     console.log('res info = ', res)
    //         //     setJammerInfo(res)
    //         // })
    //     }
    // }, [jamId, jammerId])
    
    // useEffect(() => {
    //     DataService.getJammers(jamId)
    //     .then((res) => {
    //         console.log('res jamId= ', res)
    //         setJammers(res)
    //     })
    // }, [jamId])


    return (
        <div className="landlord-rooms">

            <div className="landlord-room-info">
                {roomId !== '' ?
                    <LandlordRoomInfo
                        roomId={roomId} 
                        roomInfo={roomInfo}
                        jamId={jamId} 
                    />
                    :
                    <p>Select a room</p>
                }
            </div>
           
            <div className="landlord-rooms-list">
                {rooms !==[] ? 
                    <LandlordRoomsList
                        rooms={rooms} 
                    /> 
                    : 
                    <p>Loading</p>
                }
            </div>

           
        </div>

    );   
};

const mapDispatchToProps = (dispatch) => {
    return {
        // nombre de la función que paso como prop: (arg) => 
        // dispatch(nombre del action creator(argumento))

        getJammerInfo: (jamId, jammerId) => dispatch(getJammerInfo(jamId, jammerId))
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.firebase.auth,
        jamId: state.jamId,
        jamActiveSection: state.jamSection,
        roomId: state.roomId
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandlordRooms);