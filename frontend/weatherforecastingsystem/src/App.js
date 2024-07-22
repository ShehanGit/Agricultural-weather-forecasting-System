import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrentWeather from './pages/CurrentWeather';

function App() {
  return (
    <Router> {/* Adding BrowserRouter here */}
      <div>
        <Routes>
          <Route path="/current-weather" element={<CurrentWeather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
