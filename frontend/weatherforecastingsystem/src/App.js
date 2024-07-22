import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentWeather from './pages/CurrentWeather';
import Forecast from './pages/Forecast';

function App() {
  return (
    <Router> {/* Adding BrowserRouter here */}
      <div>
        <Routes>
          {/* <Route path="/current-weather" element={<CurrentWeather />} /> */}
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/forecast" element={<Forecast />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
