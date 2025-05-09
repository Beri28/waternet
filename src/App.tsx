import { useState } from 'react'
import './App.css'
import WithdrawalPage from './Pages/MoneyManagementPages/WithdrawalPage'

// import Home from './pages/home/Home'

function App() {
  const [showWithdrawal, setShowWithdrawal] = useState(false);

  return (
    <div>
      {showWithdrawal ? (
        <WithdrawalPage onBack={() => setShowWithdrawal(false)} />
      ) : (
        <button onClick={() => setShowWithdrawal(true)}>
          Open Withdrawal Page
        </button>
      )}
    </div>
  );
}

export default App
