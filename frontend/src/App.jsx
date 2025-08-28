import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import NotFound from './pages/not-found/NotFound.jsx';
import Profile from './pages/profile/Profile.jsx';
import Settings from './pages/settings/Settings.jsx';
import Notifications from './pages/notifications/Notifications.jsx';
import Language from './pages/language/Language.jsx';
import Privacy from './pages/privacy/Privacy.jsx';
import About from './pages/about/About.jsx';
import Help from './pages/help/Help.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/Help' element={<Help />} />
            <Route path='/Privacy' element={<Privacy />} />
            <Route path='/Notifications' element={<Notifications />} />
            <Route path='/Language' element={<Language />} />
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
      </LanguageProvider>
      <Analytics />
    </>
  );
}

export default App;
