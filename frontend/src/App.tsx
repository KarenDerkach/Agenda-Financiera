
import './App.css';
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Menu from './components/Menu/Menu';
import Cities from './components/Weather/Cities';
import Navbar from './components/Navbar/Navbar';
import Checkbooks from './components/Checkbooks/Checkbooks';
import ThirdCheqComponent from './components/Checkbooks/ThirdCheqComponent';
import NewCheq from './components/Checkbooks/OwnCheq/NewCheq';
import UpdateCheq from './components/Checkbooks/OwnCheq/UpdateCheq';
import Calculator from './components/Calculator/Calculator';


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
          <Route path="/cheques" element={<Checkbooks />} />
          <Route path="/addcheq" element={<NewCheq />} />
          <Route path='/cheq/:_id' element={<UpdateCheq/>} />
          <Route path="/thirdCheq" element={<ThirdCheqComponent />} />
          <Route path="/calculator" element={<Calculator />} />

        </Routes>
      </div>
  </BrowserRouter>
  );
}

export default App;
