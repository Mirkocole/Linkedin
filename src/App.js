
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homapage';
import Profile from './pages/Profile/Profile';
import { jwtDecode } from "jwt-decode";

function App() {

  const apiKey = process.env.REACT_APP_AUTHTOKEN;
    let adminKey = jwtDecode(apiKey);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Homepage />}/>
        <Route path='/profile/:idProfile'  element={<Profile />}/>
        <Route path='/profile/me'  element={<Profile idAdmin={adminKey._id}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
