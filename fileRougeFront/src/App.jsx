import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fyp from './components/fyp/fyp';
import Home from './components/pages/Home';
import LoginForm from './components/forms/LoginForm';
import SignUpFormClient from './components/forms/SignUpClient';
import Sidebar from './components/fyp/sideBar';
import DashboardMeal from './components/trainer/dashboard/meals/dashboardMeals';
import Dashboard from './components/trainer/dashboard/dashboard';
import WeeklyPlanBuilder from './components/programes/PlanBuilder';
import ProgramViewer from './components/programes/ReadPrograms';
import Nav from './components/nav';

import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<ProgramViewer />} />
        <Route path="/fyp" element={<Fyp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup/client" element={<SignUpFormClient />} />
        <Route path="/signup/trainer" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/test" element={<WeeklyPlanBuilder />} />
        <Route path="/dashboard/meals" element={<DashboardMeal />} />
      </Routes>
    </Router>
  );
}

export default App;
