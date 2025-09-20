
import './App.css'
import Chat from './pages/Chat';
import { Navbar } from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
       <Router>
      { <Navbar />}
      <Routes>
        <Route path="/" element={<Chat/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </Router>
  );
}

export default App;
