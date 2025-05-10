import { useState } from 'react'
import './App.css'
import PayPalStylePayment from './Pages/MoneyManagementPages/TransactionType';
import PhoneQRGenerator from './Pages/home_page/qr_code/qr_code_generator';
import HomeScreen from './Pages/home_page/homepage';
import TopUpScreen from './Pages/MoneyManagementPages/TopUpAccountPage';
import SignupForm from './Pages/RgistrationPages/SignupPage';
import PinConfirmation from './Pages/PinConfirmationPages/PinPage';

// import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <PayPalStylePayment/> */}
      {/* <PhoneQRGenerator/> */}
      {/* <HomeScreen/> */}
      <PinConfirmation/>

    </>
  )
}

export default App
