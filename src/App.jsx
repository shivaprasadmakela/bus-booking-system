
import { useState } from 'react';
import { BookingProvider } from './context/BookingContext';
import BookingScreen from './screens/BookingScreen';
import BoardingScreen from './screens/BoardingScreen';
import { Bus, ClipboardList } from 'lucide-react';
import styles from './styles/App.module.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('booking');

  return (
    <BookingProvider>
      <div className={styles.appContainer}>
        <header className={styles.appHeader}>
          <div className={styles.logo}><Bus /> BusConductor</div>
          <nav>
            <button 
              className={currentScreen === 'booking' ? styles.active : ''} 
              onClick={() => setCurrentScreen('booking')}
            >
              <Bus size={18} /> Book
            </button>
            <button 
              className={currentScreen === 'boarding' ? styles.active : ''} 
              onClick={() => setCurrentScreen('boarding')}
            >
              <ClipboardList size={18} /> Boarding
            </button>
          </nav>
        </header>
        
        <main className={styles.appContent}>
          {currentScreen === 'booking' ? <BookingScreen /> : <BoardingScreen />}
        </main>
      </div>
    </BookingProvider>
  );
}

export default App;
