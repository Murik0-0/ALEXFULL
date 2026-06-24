import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CalcPage from './pages/CalcPage';
import Layout from './components/Layout/Layout';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="calc" element={<CalcPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;