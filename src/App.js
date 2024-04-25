import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Specialization from './components/Specialization';
import MedicalCard from './components/MedicalCard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/specializations/:id" element={<Specialization />} />
        <Route path="/medical-card" element={<MedicalCard />} />
      </Routes>
    </Router>
  );
}

export default App;
