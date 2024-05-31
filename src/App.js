import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
import ResetEmail from './components/ResetEmail';
import ChangePassword from './components/ChangePassword';
import Users from './components/Users';
import CreateUser from './components/CreateUser';
import ConfirmRecord from './components/ConfirmRecord';
import NotFound from './components/NotFound';
import RecordsList from './components/RecordsList';
import RecordsListAll from './components/RecordsListAll';
import Patients from './components/Patients';
import Schedule from './components/Schedule';


const ProtectedRoute = ({isAuthenticated, redirectPath='/', children}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace/>
  }

  return children ? children : <Outlet />; 
}

const App = () => {
  const authToken = sessionStorage.getItem('authToken');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://' + window.location.hostname + ':8000/users/me', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log('User is logged in', response.status);
        if (response.data.is_verified) {
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          sessionStorage.clear();
        }
        setFetchData(true);
      })
      .catch(error => {
        console.error('User is not logged in', error);
        sessionStorage.clear();
        setFetchData(true);
      });

  }, [])

  return (
    <Router>
      <Routes>

        {/* Unauthorized users */}
        <Route path="/" element={fetchData && (<Main isAuthenticated={isAuthenticated}/>)} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-register" element={<ConfirmRegister />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/specializations/:id" element={fetchData && (<Specialization isAuthenticated={isAuthenticated}/>)} />

        {/* Authorized users */}
        <Route element={fetchData && (<ProtectedRoute isAuthenticated={isAuthenticated}/>)} >
          <Route path="/profile" element={fetchData && <Profile currentUserData={user}/>} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/change-email" element={<ChangeEmail />} />
          <Route path="/reset-email" element={<ResetEmail />} />
          <Route path="/medical-card" element={fetchData && <MedicalCard currentUserData={user}/>} />
          <Route path="/medical-card/:id/pages" element={fetchData && <MedicalCardPagesList currentUserData={user}/>} />
          <Route path="/health-diary/" element={<HealthDiary />} />
          <Route path="/confirm-record/:id" element={fetchData && <ConfirmRecord currentUserData={user}/>} />
          <Route path="/records/me" element={fetchData && <RecordsList currentUserData={user} isPatient/>} />
        </Route>

        {/* Doctors and administrators */}
        <Route element={fetchData && (<ProtectedRoute isAuthenticated={isAuthenticated && (user.specialization_id || user.is_superuser)}/>)} >
          <Route path="/medical-card/:id" element={fetchData && <MedicalCard currentUserData={user}/>} />
        </Route>

        {/* Doctors */}
        <Route element={fetchData && (<ProtectedRoute isAuthenticated={isAuthenticated && user.specialization_id}/>)} >
          <Route path="/medical-card/:id/pages" element={fetchData && <MedicalCardPagesList currentUserData={user}/>} />
          <Route path="/health-diary/:id" element={<HealthDiary />} />
          <Route path="/records" element={fetchData && <RecordsList currentUserData={user} />} />
          <Route path="/patients" element={<Patients />} />
        </Route>

        {/* Administrators */}
        <Route element={fetchData && (<ProtectedRoute isAuthenticated={isAuthenticated && user.is_superuser}/>)} >
          <Route path="/templates" element={<Templates />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={fetchData && <Profile currentUserData={user}/>} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/records/all" element={<RecordsListAll />} />
          <Route path="/schedule/:id" element={<Schedule />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;




