import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/AuthPages/LoginPage';
import { ToastProvider } from './Context/toastContext';
import AuthProvider from './Context/Auth-Context';
import WaterManagementDashboard from './pages/DashboardOne';
import AppContent from './pages/DashboardThree';
// import Dashboard from './pages/DashboardThree';
export const baseUrl='/api/v1'
// import Home from './pages/home/Home'
import App2 from "./pages/App2";
import LandingPage from './pages/LandingPage';
import Citizen from './pages/citizen';
import FieldWorker from './pages/fieldWorker';

// good bg - bg-[#CAF0F8]
function App() {

  return (
    <>
    <ToastProvider
        containerProps={{
            position: 'top-right', // Default position
            autoClose: 3000, // Default auto-close time
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
        }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage onLoginClick={() => window.location.href = '/login'} />} />
            <Route path='/h' element={<WaterManagementDashboard />} />
            <Route path='/home' element={<AppContent />} />
            <Route path='/home2' element={<App2 />} />
            <Route path='/citizen' element={<Citizen />} />
            <Route path='/worker' element={<FieldWorker />} />
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/register' element={<Register />} /> */}
            <Route path='/login' element={<LoginForm />} />
            {/* <Route path="/upload" element={<UploadData />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/citizen-report" element={<CitizenReport />} />
            <Route path="/admin" element={<AdminPanel />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>

    </>
  )
}

export default App
