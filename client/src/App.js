import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Link from './components/Link';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path= "/Link/:shortId" element= {<Link />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
