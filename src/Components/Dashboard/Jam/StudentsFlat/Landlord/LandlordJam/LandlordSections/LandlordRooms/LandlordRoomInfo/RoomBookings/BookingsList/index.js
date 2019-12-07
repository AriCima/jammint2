
import React from 'react';

// COMPONENTS
import BookingCard from './BookingCard';

// CSS
import './index.css';

const BookingsList = (props) => {

    const { bookings } = props;

    const renderBookingsList = () => {
        return bookings.map((bI, i) => {
            return (
                <React.Fragment key={i}>
                    <BookingCard
                        bI={bI} 
                    />
                </React.Fragment>
            )
        })
    }



    return (

        <>
            { bookings ? renderBookingsList() : <p>Loading</p>}            
        </>

    );   
};


export default BookingsList;