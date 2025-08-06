import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import NotFound from './pages/not-found/NotFound.jsx';
import Profile from './pages/profile/Profile.jsx';
import Settings from './pages/settings/Settings.jsx';
import About from './pages/about/About.jsx';
import Help from './pages/help/Help.jsx';
import Privacy from './pages/privacy/Privacy.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import Chat from './components/chat/Chat.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Help' element={<Help />} />
        <Route path='/Privacy' element={<Privacy />} />
        <Route path='/Profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/Settings' element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
