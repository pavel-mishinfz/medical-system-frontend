import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Specialization from './components/Specialization';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/specializations/:id" element={<Specialization />} />
      </Routes>
    </Router>
  );
}

export default App;
