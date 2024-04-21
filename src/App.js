import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
