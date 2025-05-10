import { useState } from 'react';
import { QrCode, ArrowLeft, Download, ArrowUpRight, ArrowDownLeft, Clock, History, Settings, Share2 } from 'lucide-react';

const BusinessDetailsPage = () => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [balance, setBalance] = useState(12500.50);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');
  // const withdrawDialogRef = useRef<HTMLDialogElement>(null);

  // Mock transaction data
  const transactions = [
    { id: 1, type: 'deposit', amount: 5000, from: 'John Doe', date: '2023-05-15', time: '10:30 AM' },
    { id: 2, type: 'withdrawal', amount: 2000, to: 'Business Account', date: '2023-05-14', time: '2:15 PM' },
    { id: 3, type: 'deposit', amount: 7500, from: 'Sarah Smith', date: '2023-05-12', time: '9:45 AM' },
    { id: 4, type: 'deposit', amount: 3000, from: 'Mike Johnson', date: '2023-05-10', time: '4:20 PM' },
  ];

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount && amount > 0 && amount <= balance) {
      setBalance(prev => prev - amount);
      setWithdrawAmount('');
      setShowWithdrawModal(false);
      alert(`Successfully withdrew $${amount.toFixed(2)}`);
    } else {
      alert('Please enter a valid amount');
    }
  };

  const openWithdrawModal = () => {
    setShowWithdrawModal(true);
  };

  const closeWithdrawModal = () => {
    setShowWithdrawModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button className="flex items-center text-gray-700">
            <ArrowLeft className="mr-2" size={20} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-900">Business Dashboard</h1>
          <button className="text-gray-700">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Business Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tech Innovators Ltd</h2>
              <p className="text-gray-600">Software development and IT solutions</p>
            </div>
            <button 
              onClick={() => setShowQrModal(true)}
              className="p-3 bg-gray-50 rounded-full text-black hover:bg-gray-100 transition-colors"
            >
              <QrCode size={24} />
            </button>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-r bg-black rounded-lg p-6 text-white mb-6">
            <p className="text-sm font-medium mb-1">Available Balance</p>
            <h3 className="text-3xl font-bold mb-2">{balance.toLocaleString()} FCFA</h3>
            <p className="text-blue-100 text-sm">Updated just now</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-2">
                <ArrowDownLeft size={20} />
              </div>
              <span className="text-sm font-medium">Deposit</span>
            </button>
            <button 
              onClick={openWithdrawModal}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-green-100 p-3 rounded-full text-green-600 mb-2">
                <ArrowUpRight size={20} />
              </div>
              <span className="text-sm font-medium">Withdraw</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600 mb-2">
                <Share2 size={20} />
              </div>
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'transactions' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'analytics' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {/* Transactions List */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div key={transaction.id} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${
                    transaction.type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {transaction.type === 'deposit' ? `From: ${transaction.from}` : `To: ${transaction.to}`}
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock className="mr-1" size={14} />
                      {transaction.date} • {transaction.time}
                    </p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Placeholder */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-4">
              <History size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Business Analytics</h3>
            <p className="text-gray-500">Your business performance charts will appear here</p>
          </div>
        )}
      </main>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Business QR Code</h3>
              <button onClick={() => setShowQrModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg flex justify-center mb-4">
              {/* Placeholder for QR code - in a real app you would generate an actual QR */}
              <div className="bg-white p-4 rounded">
                <QrCode size={128} className="text-gray-800" />
              </div>
            </div>
            <p className="text-center text-gray-600 mb-4">Scan this code to send money to this business</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Download className="mr-2" size={18} />
              Download QR Code
            </button>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Withdraw Funds</h3>
              <button onClick={closeWithdrawModal} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <div className="relative">
                {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">FCFA</span> */}
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="enter amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Available: {balance.toLocaleString()} FCFA</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeWithdrawModal}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDetailsPage;