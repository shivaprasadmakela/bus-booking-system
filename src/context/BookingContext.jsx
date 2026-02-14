import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem('bus_bookings');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('bus_bookings', JSON.stringify(bookings));
    }, [bookings]);

    const addBooking = (bookingData) => {
        const newBooking = {
            id: generateBookingId(),
            ...bookingData,
            status: 'BOOKED',
            seatIds: bookingData.seats.map(s => s.id)
        };
        setBookings(prev => [...prev, newBooking]);
        return newBooking;
    };

    const markBoarded = (bookingId) => {
        setBookings(prev => prev.map(b => 
            b.id === bookingId ? { ...b, status: 'BOARDED' } : b
        ));
    };

    const getBookingsForDate = (date) => {
        return bookings.filter(b => b.travelDate === date);
    };

    const isSeatBooked = (seatId, date) => {
        const dateBookings = getBookingsForDate(date);
        return dateBookings.some(b => b.seatIds.includes(seatId));
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking, markBoarded, getBookingsForDate, isSeatBooked }}>
            {children}
        </BookingContext.Provider>
    );
};

const generateBookingId = () => {
    return 'B' + Math.random().toString(36).substr(2, 6).toUpperCase();
};
