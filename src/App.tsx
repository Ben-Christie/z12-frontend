import { Routes, Route } from 'react-router-dom';

import AppWrapper from './routes/AppWrapper';
import LandingPage from './routes/LandingPage';
import LoginRegisterPage from './routes/LoginRegisterPage';
import UserDetailsPage from './routes/UserDetailsPage';
import AthleteDetailsPage from './routes/AthleteDetailsPage';
import PaymentsPage from './routes/PaymentsPage';
import MyDashboardPage from './routes/MyDashboardPage';
import PersonalBestsPage from './routes/PersonalBestsPage';
import ProfilePicturePage from './routes/ProfilePicturePage';


function App() {
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='login' element={<LoginRegisterPage />} />
        <Route path='register' element={<LoginRegisterPage />} />
        <Route path='user-details' element={<UserDetailsPage />} />
        <Route path='profile-picture' element={<ProfilePicturePage />} />
        <Route path='athlete-details' element={<AthleteDetailsPage />} />
        <Route path='payments' element={<PaymentsPage />} />
        <Route path='my-dashboard' element={<MyDashboardPage />} />
        <Route path="personal-bests" element={<PersonalBestsPage />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
