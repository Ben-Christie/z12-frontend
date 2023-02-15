import { Routes, Route } from 'react-router-dom';

import AppWrapper from './routes/AppWrapper';
import LandingPage from './routes/LandingPage';
import LoginRegisterPage from './routes/LoginRegisterPage';
import UserDetailsPage from './routes/UserDetailsPage';
import MyDashboardPage from './routes/MyDashboardPage';


function App() {
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='login' element={<LoginRegisterPage />} />
        <Route path='register' element={<LoginRegisterPage />} />
        <Route path='user-details' element={<UserDetailsPage />} />
        <Route path='my-dashboard' element={<MyDashboardPage />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;