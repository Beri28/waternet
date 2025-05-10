import './App.css'
import WithdrawalPage from './pages/MoneyManagementPages/WithdrawalPage'
import PayPalStylePayment from './pages/MoneyManagementPages/PayPalStylePayment';
import PhoneQRGenerator from './pages/home_page/qr_code/qr_code_generator';
import HomeScreen from './pages/home_page/HomeScreen';
import TopUpScreen from './pages/MoneyManagementPages/TopUpAccountPage';
import SignupForm from './pages/RgistrationPages/SignupPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoneyTransferPageWithQR from './pages/MoneyManagementPages/TransferMoney';
import QRCodeScannerPage from './pages/MoneyManagementPages/QRCodePage';
import UserBusinessesScreen from './pages/BusinessAndAssociationPages/BusinessPage';
import UserDashboardPage from './pages/UserDashboardPage';
import CreateAssociation from './pages/create_association/associations';
import LoginForm from './pages/RgistrationPages/LoginPage';
import { ToastProvider } from './Context/toastContext';
import AuthProvider from './Context/Auth-Context';
import UserAssociationScreen from './pages/BusinessAndAssociationPages/AssociationPage';
export const baseUrl=''
// import Home from './pages/home/Home'

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
        {/* <PayPalStylePayment/> */}
        {/* <PhoneQRGenerator/> */}
        {/* <HomeScreen/> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/home' element={<HomeScreen/>} />
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/register' element={<Register />} /> */}
            <Route path='/transfer2/:type' element={<MoneyTransferPageWithQR />} />
            <Route path='/personalAccountDetails' element={<UserDashboardPage />} />
            <Route path='/withdraw' element={<WithdrawalPage />} />
            <Route path='/transfer' element={<PayPalStylePayment/>} />
            <Route path='/topUp' element={<TopUpScreen />} />
            <Route path='/qrCode' element={<QRCodeScannerPage />} />
            <Route path='/qrCodeScanner' element={<QRCodeScannerPage />} />
            <Route path='/qrCode2' element={<PhoneQRGenerator />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<SignupForm />} />
            <Route path='/businesses' element={<UserBusinessesScreen />} />
            <Route path='/create-njangi' element={<CreateAssociation/>} />
            <Route path='/njangi' element={<UserAssociationScreen />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>

    </>
  )
}

export default App
