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


const PreBookingForm = ({
    jamId, roomId, roomNr, bookings,
}) => {
    const [open, setOpen] = useState(false);

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [rent, setRent] = useState('');
    const [deposit, setDeposit] = useState('');

    const handleChange = (field) => event => {
        switch (field) {
        case 'checkIn':
            if (checkOut !== '') {
                const inDate = new Date(checkIn);
                const outDate = new Date(checkOut);
                if (outDate <= inDate) {
                    alert('Check-in date must be earlier than check-In date');
                }
                const overlapping = Calculations.checkOverlapping(checkIn, checkOut, bookings);
                if (overlapping) {
                    alert(`${overlapping.message}`);
                }
            }
            setCheckIn(event.target.value);
            break;
        case 'checkOut':
            if (checkIn !== '') {
                const inDate = new Date(checkIn);
                const outDate = new Date(checkOut);
                if (outDate <= inDate) {
                    alert('Check-out date must be later than check-In date');
                }
                const overlapping = Calculations.checkOverlapping(checkIn, checkOut, bookings);
                if (overlapping) {
                    alert(`${overlapping.message}`);
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
                alert('Pre-booking ID: ', inviteURL);
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
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Fill all the info of the booking</DialogTitle>
                <DialogContent>
                    <form>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Room Nr:</span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Room ID"
                                value={roomId}
                                onChange={handleChange('roomId')}
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Check-In</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Check-In"
                                        onChange={handleChange('checkIn')}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Check-Out</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Check-Out"
                                        onChange={handleChange('checkOut')}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Rent [€/Mo]</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Rent"
                                        onChange={handleChange('rent')}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Deposit [€]</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Deposit"
                                        onChange={handleChange('deposit')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Name"
                                        onChange={handleChange('name')}
                                    />
                                </div>
                            </div>

                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Surname</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        // placeholder="Surname"
                                        onChange={handleChange('surname')}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Address</span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Street, House Nr, Floor, Door "
                                onChange={handleChange('address')}
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Zip-Code</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange('zipCode')}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">City</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange('city')}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Country</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange('country')}
                                    />
                                </div>
                            </div>
                        </div>
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
