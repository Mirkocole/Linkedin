import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homapage';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Homepage />}/>
        <Route path='/profile/:idProfile'  element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
