import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import LoginPage from './pages/LoginPage'
import SetupProfilePage from './pages/SetUpProfilePage'
import WorkingHoursPage from './pages/WorkingHoursPage'
import NotificationsPage from './pages/NotificationPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/setup-profile" element={<SetupProfilePage />} />
        <Route path="/working-hours" element={<WorkingHoursPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App