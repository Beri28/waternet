import { useState } from 'react'
import './App.css'
import HomeScreen from './Pages/home_page/homepage'
import PhoneQRGenerator  from './Pages/home_page/qr_code/qr_code_generator';
import { FiBell } from 'react-icons/fi';
import WithdrawalPage from './Pages/MoneyManagementPages/WithdrawalPage'
import MoneyTransferPage from './Pages/MoneyManagementPages/WithdrawalPage';

// import Home from './pages/home/Home'

function App() {
  
  return (
    <>
      <MoneyTransferPage/>
    </>
  );
}

export default App
