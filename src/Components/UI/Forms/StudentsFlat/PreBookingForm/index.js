import React, { useState } from 'react';
// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// SERVICES
import DataService from '../../../../services/DataService';
import Calculations from '../../../../services/Calculations';


const PreBookingForm = ({ jamId, roomId, roomNr }) => {
    const [open, setOpen] = useState(false);

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [rent, setRent] = useState('');
    const [deposit, setDeposit] = useState('');

    const handleChange = (field) => event => {
        switch (field) {
        case 'checkIn':
            setCheckIn(event.target.value);
            break;
        case 'checkOut':
            if (checkIn !== '') {
                const inDate = new Date(checkIn);
                const outDate = new Date(checkOut);
                if (outDate <= inDate) {
                    alert('CheckOut date must be greater than check-In date');
                }
            }
            setCheckOut(event.target.value);
            break;
        case 'rent':
            setRent(event.target.value);
            break;
        case 'deposit':
            setDeposit(event.target.value);
            break;
        default:
        }
    };


    const onInvite = (e) => {
        e.preventDefault();
        const createdAt = new Date();
        const bookingCode = Calculations.generateCode();

        const preBookingInfo = {
            jamId,
            roomId,
            bookingCode,
            checkIn,
            checkOut,
            roomNr,
            rent,
            deposit,
            createdAt,
        };


        DataService.addNewInvite(jamId, roomId, preBookingInfo)
            .then(res => {
                const preBookingId = res.id;
                const inviteURL = `localhost:3000/invite/${jamId}/${roomId}/${preBookingId}`;
            });

        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (

        <div>
            <button type="submit" className="create-button" onClick={handleClickOpen}>
                INVITE
            </button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth="true"
            >
                <DialogTitle id="form-dialog-title">Fill all the info of the booking</DialogTitle>
                <DialogContent>
                    <form>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Jam Name"
                                onChange={handleChange('jamName')}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                onChange={handleChange('jamDesc')}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Jam Type</label>
                            </div>
                            <select
                                className="custom-select"
                                id="inputGroupSelect01"
                                onChange={handleChange('jamType')}
                            >
                                <option selected>Choose...</option>
                                <option value="jam">Just a jam</option>
                                <option value="apt-rental">Apartment rental</option>
                                <option value="rooms-rental">Rooms rental</option>
                            </select>
                        </div>
                        {preBookingInfo.jamType === 'rooms-rental'
                        && (
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Nr of Rooms</label>
                                </div>
                                <select
                                    className="custom-select"
                                    id="inputGroupSelect01"
                                    onChange={handleChange('nrOfRooms')}
                                >
                                    <option selected>Choose...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        )}
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onInvite} color="primary">
                        Invite
                    </Button>

                </DialogActions>
            </Dialog>
        </div>

    );
};

export default PreBookingForm;
