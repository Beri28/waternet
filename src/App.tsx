import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/AuthPages/LoginPage';
import { ToastProvider } from './Context/toastContext';
import AuthProvider from './Context/Auth-Context';
import WaterManagementDashboard from './pages/DashboardOne';
import LandingPage from './pages/LandingPage';
import Citizen from './pages/citizen';
import FieldWorker from './pages/fieldWorker';

export const baseUrl='/api/v1'

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
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<WaterManagementDashboard />} />
            <Route path='/citizen' element={<Citizen />} />
            <Route path='/worker' element={<FieldWorker />} />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>

    </>
  )
}

export default App
