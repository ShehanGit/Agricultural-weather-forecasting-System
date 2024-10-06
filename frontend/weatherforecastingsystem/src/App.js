import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentWeather from './pages/CurrentWeather';
import Forecast from './pages/Forecast';
import CropApp from './pages/CropPage';
import CropDetails from './pages/CropDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/current-weather" element={<CurrentWeather />} /> */}
          <Route path="/" element={<CurrentWeather />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/crop" element={<CropApp />} />
          <Route path="/crop/:id" element={<CropDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
