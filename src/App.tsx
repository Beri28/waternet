import { useState } from 'react'
import './App.css'
import TransferMoney from './Pages/MoneyManagementPages/TransferMoney'
import PayPalStylePayment from './Pages/MoneyManagementPages/TransactionType'

// import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PayPalStylePayment/>
    </>
  )
}

export default App
