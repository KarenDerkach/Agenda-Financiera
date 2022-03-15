
import './App.css';
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Menu from './components/Menu/Menu';
import Cities from './components/Weather/Cities';

import Navbar from './components/Navbar/Navbar';
//import UpdateCheq from './components/Checkbooks/OwnCheq/UpdateCheq';
import Calculator from './components/Calculator/Calculator';
import Calendar from './components/Calendar/CalendarScreen';
import DetailEvent from './components/Calendar/DetailEvent';
import ListCheq from './components/Checkbooks/Checks/ListCheq';


function App() {
  return (
    <BrowserRouter>   
      <div className="App">
        <Routes>
          <Route path="*" element={<Navbar />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/weather" element={<Cities />} />
          <Route path="/cheques" element={<ListCheq />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path='/events'  element={<DetailEvent/>} />
        </Routes>
      </div>
  </BrowserRouter>
  );
}

export default App;
