
import './App.css';
import React from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Login from './components/User/Login';
import Register from './components/User/Register';
import Menu from './components/Menu/Menu';
import Cities from './components/Weather/Cities';
import Navbar from './components/Navbar/Navbar';
import Calculator from './components/Calculator/Calculator';
import Calendar from './components/Calendar/CalendarScreen';
import DetailEvent from './components/Calendar/DetailEvent';
import ListCheq from './components/Checkbooks/Checks/ListCheq';
import ErrorPage from './components/ErrorPage/ErrorPage';
import DetailCity from './components/Weather/DetailCity';



function App() {
  
  return (
    <BrowserRouter>   
      <div className="App">
        <Routes>
          <Route path="*" element={<Navbar />} />
        </Routes>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/" element={<Menu />} />
          <Route path="/weather" element={<Cities />} />
          <Route path="/detail/:latitud/:longitud" element={<DetailCity/>} />
          <Route path="/cheques" element={<ListCheq />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path='/events'  element={<DetailEvent/>} />
          <Route path="/:rest/*" element={<ErrorPage />} />

        </Routes>
      </div>
  </BrowserRouter>
  );
}

export default App;
