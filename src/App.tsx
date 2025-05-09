import { useState } from 'react'
import './App.css'
import HomeScreen from './Pages/home_page/homepage'
import PhoneQRGenerator  from './Pages/home_page/qr_code/qr_code_generator';
import WithdrawalPage from './Pages/MoneyManagementPages/WithdrawalPage'

// import Home from './pages/home/Home'

function App() {
  
  return (
    <>
      <PhoneQRGenerator/>
    </>
  );
}

export default App
