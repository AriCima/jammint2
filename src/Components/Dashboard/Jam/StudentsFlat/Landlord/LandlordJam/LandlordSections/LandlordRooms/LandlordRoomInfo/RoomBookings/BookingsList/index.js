
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
    };

    return (
        <>
            { bookings ? 
                <div className="bookings-chart">
                    <div className="booking-chart-header">
                        {/* <div className="booking-chart-block">
                            <p>Room</p>
                        </div> */}
                        <div className="booking-chart-block">
                            <p>ID</p>
                        </div>
                        <div className="booking-chart-block">
                            <p>Tenant</p>
                        </div>
                        <div className="booking-chart-block">
                            <p>Check-In</p>
                        </div>
                        <div className="booking-chart-block">
                            <p>Check-Out</p>
                        </div>
                        <div className="booking-chart-block">
                            <p>Rent €</p>
                        </div>
                        <div className="booking-chart-block">
                            <p>Deposit €</p>
                        </div>
                    </div>
                    {renderBookingsList}
                </div>
            : <p>Loading</p>

            }            
        </>

    );   
};


export default BookingsList;