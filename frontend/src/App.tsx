
import './App.css';
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Menu from './components/Menu/Menu';
import Cities from './components/Weather/Cities';
import Navbar from './components/Navbar/Navbar';
import NewCheq from './components/Checkbooks/Checks/NewCheq';
//import UpdateCheq from './components/Checkbooks/OwnCheq/UpdateCheq';
import Calculator from './components/Calculator/Calculator';
import DetailCheq from './components/Checkbooks/Checks/DetailCheq';
import Calendar from './components/Calendar/CalendarScreen';


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
          <Route path="/cheques" element={<NewCheq />} />
          <Route path='/cheq/:id' element={<DetailCheq/>} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
  </BrowserRouter>
  );
}

export default App;
