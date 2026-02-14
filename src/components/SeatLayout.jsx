import React from 'react';
import styles from '../styles/SeatLayout.module.css';

const SeatLayout = ({ seats, selectedSeats, onSeatClick }) => {

    const isSelected = (seat) => selectedSeats.some(s => s.id === seat.id);

    return (
        <div className={styles.seatLayout}>
            <div className={styles.busFront}>Front (Driver)</div>
            <div className={styles.seatsGrid}>
                {seats.map((row, rIndex) => (
                    <div key={rIndex} className={styles.seatRow}>
                        <div className={styles.rowLeft}>
                            <Seat 
                                seat={row[0]} 
                                isSelected={isSelected(row[0])} 
                                onClick={onSeatClick} 
                            />
                            <Seat 
                                seat={row[1]} 
                                isSelected={isSelected(row[1])} 
                                onClick={onSeatClick} 
                            />
                        </div>
                        <div className={styles.aisle}>
                            <span className={styles.rowNumber}>{rIndex + 1}</span>
                        </div>
                        <div className={styles.rowRight}>
                            <Seat 
                                seat={row[2]} 
                                isSelected={isSelected(row[2])} 
                                onClick={onSeatClick} 
                            />
                            <Seat 
                                seat={row[3]} 
                                isSelected={isSelected(row[3])} 
                                onClick={onSeatClick} 
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.busLegend}>
                <div className={styles.legendItem}><span className={`${styles.seat} ${styles.available}`}></span> Available</div>
                <div className={styles.legendItem}><span className={`${styles.seat} ${styles.selected}`}></span> Selected</div>
                <div className={styles.legendItem}><span className={`${styles.seat} ${styles.booked}`}></span> Booked</div>
            </div>
        </div>
    );
};

const Seat = ({ seat, isSelected, onClick }) => {
    const className = `${styles.seat} ${seat.isBooked ? styles.booked : ''} ${isSelected ? styles.selected : styles.available}`;
    
    return (
        <div 
            className={className} 
            onClick={() => !seat.isBooked && onClick(seat)}
            title={seat.id}
        >
            {seat.id}
        </div>
    );
};

export default SeatLayout;
