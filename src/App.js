import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Specialization from './components/Specialization';
import MedicalCard from './components/MedicalCard';
import PagesList from './components/PagesList';
import HealthDiary from './components/HealthDiary';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/specializations/:id" element={<Specialization />} />
        <Route path="/medical-card" element={<MedicalCard />} />
        <Route path="/medical-card/:id/pages" element={<PagesList />} />
        <Route path="/health-diary" element={<HealthDiary />} />
      </Routes>
    </Router>
  );
}

export default App;
