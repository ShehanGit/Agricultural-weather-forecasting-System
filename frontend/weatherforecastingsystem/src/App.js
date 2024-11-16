import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedPage from './pages/ProtectedPage';
import CurrentWeather from './pages/CurrentWeather';
import Forecast from './pages/Forecast';
import CropApp from './pages/CropPage';
import CropDetails from './pages/CropDetails';
import CropPrediction from './pages/CropPrediction';
import Navbar from './components/Navbar'; // Import Navbar
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Include the Navbar */}
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={!!getToken() ? <CurrentWeather /> : <Navigate to="/login" />}
            />
            <Route
              path="/forecast"
              element={!!getToken() ? <Forecast /> : <Navigate to="/login" />}
            />
            <Route
              path="/crop"
              element={!!getToken() ? <CropApp /> : <Navigate to="/login" />}
            />
            <Route
              path="/crop/:id"
              element={!!getToken() ? <CropDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/croppredicton"
              element={!!getToken() ? <CropPrediction /> : <Navigate to="/login" />}
            />

            {/* Fallback for Protected Page Example */}
            <Route
              path="/protected"
              element={!!getToken() ? <ProtectedPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
