import React, { useState, useMemo } from 'react';
import SeatLayout from '../components/SeatLayout';
import { generateSeatLayout, isValidBooking } from '../utils/bookingUtils';
import { useBookings } from '../context/BookingContext';
import { Calendar, Phone, ArrowLeft, Bus } from 'lucide-react';
import styles from '../styles/BookingScreen.module.css';

const BookingScreen = () => {
    const { addBooking, getBookingsForDate } = useBookings();
    
    const [step, setStep] = useState(1);

    const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
    const [mobile, setMobile] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [error, setError] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);

    const existingBookings = useMemo(() => getBookingsForDate(travelDate), [travelDate, getBookingsForDate]);
    
    const seatLayout = useMemo(() => {
        const layout = generateSeatLayout();
        const bookedIds = new Set(existingBookings.flatMap(b => b.seatIds));
        
        return layout.map(row => row.map(seat => ({
            ...seat,
            isBooked: bookedIds.has(seat.id)
        })));
    }, [existingBookings]);

    const handleSearch = () => {
        setError('');
        if (!travelDate) {
            setError("Please select a travel date.");
            return;
        }
        if (!mobile || mobile.length < 10) {
            setError("Please enter a valid mobile number.");
            return;
        }
        setStep(2);
    };

    const handleSeatClick = (seat) => {
        if(error) setError('');

        if (selectedSeats.some(s => s.id === seat.id)) {
            setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
        } else {
            if (selectedSeats.length >= 6) {
                setError("Maximum 6 seats allowed per booking.");
                return;
            }
            setSelectedSeats(prev => [...prev, seat]);
        }
    };

    const handleBook = () => {
        setError('');
        
        const validCheck = isValidBooking(selectedSeats, existingBookings, travelDate);
        if (!validCheck.valid) {
            setError(validCheck.message);
            return;
        }

        const newBooking = addBooking({
            travelDate,
            mobile,
            seats: selectedSeats,
            timestamp: Date.now()
        });

        setBookingDetails(newBooking);
        setShowConfirmation(true);

    };

    const resetBooking = () => {
        setShowConfirmation(false);
        setSelectedSeats([]);
        setStep(1); 

        setMobile('');
        setTravelDate(new Date().toISOString().split('T')[0]);
        setBookingDetails(null);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className={styles.bookingScreen}>
            {step === 1 && (
                <div className={styles.stepSearch}>
                    <div className={styles.searchCard}>
                        <h2><Bus className={styles.icon} size={24}/> Find Your Bus</h2>
                        
                        <div className={styles.inputGroup}>
                            <label>Travel Date</label>
                            <div className={styles.inputWrapper}>
                                <Calendar size={20} className={styles.inputIcon} />
                                <input 
                                    type="date" 
                                    value={travelDate} 
                                    min={today}
                                    onChange={e => setTravelDate(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Mobile Number</label>
                            <div className={styles.inputWrapper}>
                                <Phone size={20} className={styles.inputIcon} />
                                <input 
                                    type="tel" 
                                    placeholder="Enter mobile number" 
                                    value={mobile} 
                                    onChange={e => setMobile(e.target.value)} 
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        {error && <div className={styles.errorMessage}>{error}</div>}

                        <button className={styles.searchBtn} onClick={handleSearch}>
                            Search Buses
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className={styles.stepSelection}>
                    <header className={styles.selectionHeader}>
                        <button className={styles.backBtn} onClick={() => setStep(1)}>
                            <ArrowLeft size={20} />
                        </button>
                        <div className={styles.headerInfo}>
                            <span className={styles.infoDate}>{new Date(travelDate).toDateString()}</span>
                            <span className={styles.infoMobile}>+91 {mobile}</span>
                        </div>
                    </header>

                    <div className={styles.seatArea}>
                        <SeatLayout 
                            seats={seatLayout} 
                            selectedSeats={selectedSeats} 
                            onSeatClick={handleSeatClick} 
                        />
                    </div>

                    <footer className={styles.selectionFooter}>
                        <div className={styles.selectedSummary}>
                            <span className={styles.label}>Selected Seats</span>
                            <span className={styles.value}>
                                {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'None'}
                            </span>
                        </div>
                        <button 
                            className={styles.bookBtn} 
                            onClick={handleBook}
                            disabled={selectedSeats.length === 0}
                        >
                            Book Tickets
                        </button>
                    </footer>
                    
                    {error && <div className={styles.toastError}>{error}</div>}
                </div>
            )}

            {showConfirmation && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>Booking Confirmed!</h3>
                        </div>
                        <div className={styles.modalBody}>
                             <div className={styles.ticketDetail}>
                                <span className={styles.label}>Booking ID</span>
                                <span className={styles.value}>{bookingDetails?.id}</span>
                            </div>
                            <div className={styles.ticketDetail}>
                                <span className={styles.label}>Date</span>
                                <span className={styles.value}>{bookingDetails?.travelDate}</span>
                            </div>
                            <div className={styles.ticketDetail}>
                                <span className={styles.label}>Mobile</span>
                                <span className={styles.value}>{bookingDetails?.mobile}</span>
                            </div>
                            <div className={styles.ticketDetail}>
                                <span className={styles.label}>Seats</span>
                                <span className={styles.value}>{bookingDetails?.seats.map(s => s.id).join(', ')}</span>
                            </div>
                        </div>
                        <button className={styles.closeBtn} onClick={resetBooking}>Done</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingScreen;
