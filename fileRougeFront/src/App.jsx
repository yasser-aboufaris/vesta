import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fyp from './components/fyp/fyp';
import Home from './components/pages/Home';
import LoginForm from './components/forms/LoginForm';
import SignUpFormClient from './components/forms/SignUpClient';
import Sidebar from './components/fyp/sideBar';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/fyp" element={<Fyp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpFormClient />} />
      </Routes>
    </Router>
  );
}

export default App;
