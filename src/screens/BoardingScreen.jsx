import { useState, useMemo } from 'react';
import { useBookings } from '../context/BookingContext';
import { calculateOptimalBoardingSequence } from '../utils/bookingUtils';
import { Phone, CheckCircle, Circle } from 'lucide-react';
import styles from '../styles/BoardingScreen.module.css';

const BoardingScreen = () => {
    const { getBookingsForDate, markBoarded } = useBookings();
    const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);

    const bookings = getBookingsForDate(travelDate);
    const boardingSequence = useMemo(() => calculateOptimalBoardingSequence(bookings), [bookings]);

    return (
        <div className={styles.boardingScreen}>
            <div className={styles.boardingHeader}>
                <h2>Boarding Pass</h2>
                <div className={styles.datePickerWrapper}>
                    <input 
                        type="date" 
                        value={travelDate} 
                        onChange={e => setTravelDate(e.target.value)} 
                        className={styles.dateInput}
                    />
                </div>
            </div>

            <div className={styles.statsBar}>
                <div className={styles.statItem}>
                    <span className={styles.label}>Total Bookings</span>
                    <span className={styles.value}>{bookings.length}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.label}>Passengers</span>
                    <span className={styles.value}>{bookings.reduce((sum, b) => sum + b.seats.length, 0)}</span>
                </div>
            </div>

            <div className={styles.boardingList}>
                {boardingSequence.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🚍</div>
                        <p>No bookings found for {new Date(travelDate).toDateString()}</p>
                        <span>Try selecting a different date.</span>
                    </div>
                ) : (
                    boardingSequence.map((booking, index) => (
                        <div key={booking.id} className={`${styles.boardingCard} ${booking.status === 'BOARDED' ? styles.boarded : ''}`}>
                            <div className={styles.seqSection}>
                                <span className={styles.seqLabel}>SEQ</span>
                                <span className={styles.seqNumber}>{index + 1}</span>
                            </div>
                            <div className={styles.cardDivider}></div>
                            <div className={styles.bookingInfo}>
                                <div className={styles.infoRow}>
                                    <span className={styles.bookingId}>{booking.id}</span>
                                    <a href={`tel:${booking.mobile}`} className={styles.mobileLink}>
                                        <Phone size={14} /> {booking.mobile}
                                    </a>
                                </div>
                                <div className={styles.seatsRow}>
                                    <span className={styles.seatsLabel}>Seats:</span>
                                    <span className={styles.seatsValue}>{booking.seats.map(s => s.id).join(', ')}</span>
                                </div>
                            </div>
                            <button 
                                className={styles.actionBtn}
                                onClick={() => markBoarded(booking.id)}
                                disabled={booking.status === 'BOARDED'}
                                title={booking.status === 'BOARDED' ? 'Boarded' : 'Mark as Boarded'}
                            >
                                {booking.status === 'BOARDED' ? <CheckCircle size={24} color="#4caf50" /> : <Circle size={24} />}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BoardingScreen;
