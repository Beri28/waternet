import { useState } from 'react'
import './App.css'
import { FiBell } from 'react-icons/fi';
import WithdrawalPage from './Pages/MoneyManagementPages/WithdrawalPage'
import MoneyTransferPage from './Pages/MoneyManagementPages/WithdrawalPage';
import PayPalStylePayment from './Pages/MoneyManagementPages/TransactionType';
import PhoneQRGenerator from './Pages/home_page/qr_code/qr_code_generator';
import HomeScreen from './Pages/home_page/homepage';
import TopUpScreen from './Pages/MoneyManagementPages/TopUpAccountPage';
import SignupForm from './Pages/RgistrationPages/SignupPage';
import PinConfirmation from './Pages/PinConfirmationPages/PinPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoneyTransferPageWithQR from './Pages/MoneyManagementPages/TransferMoney';
import QRCodeScannerPage from './Pages/MoneyManagementPages/QRCodePage';
import CreateAssociation from './Pages/create_association/associations';
import { AuthProvider } from './Context/Auth-Context';
// import PhoneQRGenerator from './Pages/home_page/qr_code/qr_code_generator';

// import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      {/* <PayPalStylePayment/> */}
      {/* <PhoneQRGenerator/> */}
      {/* <HomeScreen/> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/transfer' element={<MoneyTransferPageWithQR />} />
          <Route path='/withdraw' element={<WithdrawalPage />} />
          <Route path='/transfer2' element={<PayPalStylePayment/>} />
          <Route path='/topUp' element={<TopUpScreen />} />
          <Route path='/qrCode' element={<QRCodeScannerPage />} />
          <Route path='/create-njangi' element={<CreateAssociation/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App
