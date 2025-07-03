
import './App.css'
import Chat from './pages/Chat';
import { HomePage } from './pages/LandingPage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './components/SignUp';
import { Login } from './components/Login';

function App() {
  return (
       <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
         <Route path="/signup" element={<Signup />} />
        
          <Route path="/chat" element={<Chat/>} />
 
      </Routes>
    </Router>
  );
}

export default App;
