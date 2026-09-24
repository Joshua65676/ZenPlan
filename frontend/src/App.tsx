import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import SetupProfilePage from "./pages/SetUpProfilePage";
import WorkingHoursPage from "./pages/WorkingHoursPage";
import NotificationsPage from "./pages/NotificationPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/setup-profile" element={<SetupProfilePage />} />
        <Route path="/working-hours" element={<WorkingHoursPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:username" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
