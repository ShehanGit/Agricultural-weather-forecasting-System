import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../css/CurrentWeather.css'; 
import { useNavigate } from 'react-router-dom';


function CurrentWeather() {
    
    return (
        <div>
            <NavBar />
            
        </div>
    );
}

export default CurrentWeather;
