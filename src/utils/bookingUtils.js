
export const generateSeatLayout = () => {
    const rows = 15;
    const seats = [];
    const cols = ['A', 'B', 'C', 'D'];

    for (let r = 1; r <= rows; r++) {
        const rowSeats = cols.map(col => ({
            id: `${col}${r}`,
            label: `${col}${r}`,
            row: r,
            col: col,
            isBooked: false
        }));
        seats.push(rowSeats);
    }
    return seats;
};


export const calculateOptimalBoardingSequence = (bookings) => {

    const bookingsWithEffectiveRow = bookings.map(b => {

        if (!b.seats || !Array.isArray(b.seats) || b.seats.length === 0) {
            return { ...b, effectiveRow: 0 };
        }
        
        const seatRows = b.seats.map(s => {

            if (s.row) return s.row;

            if (s.id) return parseInt(s.id.substring(1)) || 0;
            if (typeof s === 'string') return parseInt(s.substring(1)) || 0;
            return 0;
        });
        
        const effectiveRow = Math.min(...seatRows);
        return { ...b, effectiveRow };
    });


    bookingsWithEffectiveRow.sort((a, b) => {
        if (b.effectiveRow !== a.effectiveRow) {
            return b.effectiveRow - a.effectiveRow;
        }
        return a.timestamp - b.timestamp;
    });

    return bookingsWithEffectiveRow;
};

export const isValidBooking = (selectedSeats, existingBookings, travelDate) => {

    if (selectedSeats.length === 0) return { valid: false, message: "Select at least one seat." };
    if (selectedSeats.length > 6) return { valid: false, message: "Maximum 6 seats allowed." };
    

    const bookedSeatIds = new Set(existingBookings.flatMap(b => b.seatIds));
    const doubleBooked = selectedSeats.some(s => bookedSeatIds.has(s.id));
    
    if (doubleBooked) return { valid: false, message: "Some seats are already booked." };

    return { valid: true };
};
