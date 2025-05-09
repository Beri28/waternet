import { useState } from 'react'
import './App.css'
import PayPalStylePayment from './Pages/MoneyManagementPages/TransactionType';
import PhoneQRGenerator from './Pages/home_page/qr_code/qr_code_generator';

// import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PayPalStylePayment/>
      {/* <PhoneQRGenerator/> */}

    </>
  )
}

export default App
