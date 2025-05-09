import { useState } from 'react'
import './App.css'
import HomeScreen from './Pages/home_page/homepage'
import PhoneQRGenerator  from './Pages/home_page/qr_code/qr_code_generator';
import { FiBell } from 'react-icons/fi';
// import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PhoneQRGenerator/>
    </>
  )
}

export default App
