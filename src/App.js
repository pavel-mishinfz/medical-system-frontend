import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Specialization from './components/Specialization';
import MedicalCard from './components/MedicalCard';
import MedicalCardPagesList from './components/MedicalCardPagesList';
import HealthDiary from './components/HealthDiary';
import Templates from './components/Templates';
import Login from './components/Login';
import Register from './components/Register';
import ConfirmRegister from './components/ConfirmRegister';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Confirm from './components/Confirm';
import Profile from './components/Profile';
import ChangeEmail from './components/ChangeEmail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-register" element={<ConfirmRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-email" element={<ChangeEmail />} />
        <Route path="/specializations/:id" element={<Specialization />} />
        <Route path="/medical-card" element={<MedicalCard />} />
        <Route path="/medical-card/:id/pages" element={<MedicalCardPagesList />} />
        <Route path="/health-diary" element={<HealthDiary />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Router>
  );
}

export default App;
