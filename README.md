# Bus Booking System

A modern, responsive bus booking application designed for conductors and passengers. It features a streamlined 2-step booking process, a 2x2 seating arrangement with optimal boarding logic to minimize congestion, and a premium dark-themed UI.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd bus-booking-system
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Usage

-   **Development Server**: Start the development server with hot module replacement using Vite.
    ```bash
    npm run dev
    ```
-   **Build**: Build the application for production.
    ```bash
    npm run build
    ```
-   **Lint**: Run ESLint to check for code quality issues.
    ```bash
    npm run lint
    ```
-   **Preview**: Preview the production build locally.
    ```bash
    npm run preview
    ```

## ✨ Features Implemented

### 1. Booking Screen
-   **Streamlined 2-Step Flow**:
    -   **Step 1**: Select Travel Date and enter Mobile Number.
    -   **Step 2**: Select seats with a sticky header showing the context.
-   **Seat Layout**: 15 rows, 2x2 configuration (Total 60 seats) with a visual driver indicator.
-   **Interactive Grid**:
    -   **Available**: Grey outline
    -   **Selected**: Indigo fill
    -   **Booked**: Dark, disabled
-   **Validation**:
    -   Maximum 6 seats per booking.
    -   Date validation (prevents past dates).
    -   Mobile number validation (10 digits).
-   **Confirmation**: visual confirmation modal upon successful booking.

### 2. Boarding Screen
-   **Smart Boarding Logic ("Back-to-Front")**:
    -   Minimizes passenger blocking by prioritizing passengers whose seats are further back.
    -   Calculates the "Effective Row" for groups to ensure they board together without blocking others.
-   **Features**:
    -   **Date Filtering**: View bookings for specific travel dates.
    -   **Empty State**: Clear indication when no bookings exist.
    -   **Boarded Status**: Toggle status to mark passengers as onboarded.
    -   **Quick Actions**: Call passenger directly via mobile link.

### 3. Technical Architecture
-   **Framework**: React 18 + Vite for fast development and performance.
-   **Styling**:
    -   **CSS Modules**: Component-scoped styling in `src/styles/*.module.css` to prevent conflicts.
    -   **Variables**: Global theme variables in `src/styles/global.css` for consistent colors and spacing.
    -   **Responsiveness**: Mobile-first design approach.
-   **State Management**: Context API (`BookingContext`) for managing bookings and application state.
-   **Icons**: `lucide-react` for consistent, lightweight iconography.

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components (SeatLayout)
├── context/           # React Context for state (BookingContext)
├── screens/           # Main application screens (Booking, Boarding)
├── styles/            # CSS Modules and Global Styles
│   ├── global.css     # Global variables and resets
│   ├── App.module.css
│   └── ...            # Component-specific modules
├── utils/             # Helper functions (boarding logic, layout generation)
├── App.jsx            # Main app component & routing
└── main.jsx           # Entry point
```

## 🔍 Verification Steps

Once the app is running:

1.  **Book Seats**:
    -   Try to book seats for today.
    -   Select Row 15 seats and Row 1 seats in separate bookings.
2.  **Check Boarding**:
    -   Navigate to the Boarding screen.
    -   Verify that the booking with Row 15 seats appears **BEFORE** the booking with Row 1 seats to optimize flow.
3.  **Responsive Check**:
    -   Open DevTools and toggle device toolbar to verify the layout works seamlessly on mobile devices.
