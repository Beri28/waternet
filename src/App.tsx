import { useState } from 'react'
import './App.css'
import HomeScreen from './Pages/home_page/homepage'
import PhoneQRGenerator  from './Pages/home_page/qr_code/qr_code_generator';
import { FiBell } from 'react-icons/fi';
import WithdrawalPage from './Pages/MoneyManagementPages/WithdrawalPage'
import MoneyTransferPage from './Pages/MoneyManagementPages/WithdrawalPage';
import PayPalStylePayment from './Pages/MoneyManagementPages/TransactionType';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoneyTransferPageWithQR from './Pages/MoneyManagementPages/TransferMoney';
import QRCodeScannerPage from './Pages/MoneyManagementPages/QRCodePage';
// import PhoneQRGenerator from './Pages/home_page/qr_code/qr_code_generator';

// import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/transfer' element={<MoneyTransferPageWithQR />} />
          <Route path='/withdraw' element={<WithdrawalPage />} />
          <Route path='/transfer2' element={<PayPalStylePayment/>} />
          <Route path='/topUp' element={<QRCodeScannerPage />} />
          <Route path='/qrCode' element={<QRCodeScannerPage />} />
        </Routes>
      </BrowserRouter>
      {/* <MoneyTransferPage/> */}
      {/* <PayPalStylePayment/> */}
      {/* <PhoneQRGenerator/> */}
      

    </>
  )
}

export default App
