import React, { useState, useRef } from 'react';
import { QrCode, ArrowLeft, Download, ArrowUpRight, ArrowDownLeft, Clock, History, Settings, Share2, User } from 'lucide-react';

const UserDashboardPage = () => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [balance, setBalance] = useState(8500.75);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');

  // Mock transaction data
  const transactions = [
    { id: 1, type: 'deposit', amount: 2000, from: 'Salary Payment', date: '2023-06-15', time: '9:30 AM' },
    { id: 2, type: 'withdrawal', amount: 500, to: 'Supermarket', date: '2023-06-14', time: '5:45 PM' },
    { id: 3, type: 'deposit', amount: 1500, from: 'Freelance Work', date: '2023-06-12', time: '2:15 PM' },
    { id: 4, type: 'transfer', amount: 300, to: 'John Smith', date: '2023-06-10', time: '11:20 AM' },
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button className="flex items-center text-gray-700">
            <ArrowLeft className="mr-2" size={20} />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
          <button className="text-gray-700">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full text-black mr-4">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                <p className="text-gray-600">Personal Account</p>
              </div>
            </div>
            <button 
              onClick={() => setShowQrModal(true)}
              className="p-3 bg-blue-50 rounded-full text-black hover:bg-gray-100 transition-colors"
            >
              <QrCode size={24} />
            </button>
          </div>

          {/* Balance Card */}
          <div className="bg-black rounded-lg p-6 text-white mb-6">
            <p className="text-sm font-medium mb-1">Available Balance</p>
            <h3 className="text-3xl font-bold mb-2">{balance.toLocaleString()} FCFA</h3>
            <p className="text-blue-100 text-sm">Last updated: Today</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 mb-2">
                <ArrowDownLeft size={18} />
              </div>
              <span className="text-xs font-medium">Receive</span>
            </button>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-green-100 p-2 rounded-full text-green-600 mb-2">
                <ArrowUpRight size={18} />
              </div>
              <span className="text-xs font-medium">Send</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="bg-purple-100 p-2 rounded-full text-purple-600 mb-2">
                <Share2 size={18} />
              </div>
              <span className="text-xs font-medium">Pay</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 mb-2">
                <Download size={18} />
              </div>
              <span className="text-xs font-medium">Top Up</span>
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
            Spending
          </button>
        </div>

        {/* Transactions List */}
        {activeTab === 'transactions' && (
          <div className="space-y-3">
            {transactions.map(transaction => (
              <div key={transaction.id} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    transaction.type === 'deposit' ? 'bg-green-100 text-green-600' : 
                    transaction.type === 'withdrawal' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {transaction.type === 'deposit' ? <ArrowDownLeft size={16} /> : 
                     transaction.type === 'withdrawal' ? <ArrowUpRight size={16} /> : <Share2 size={16} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {transaction.type === 'deposit' ? `From: ${transaction.from}` : 
                       transaction.type === 'withdrawal' ? `To: ${transaction.to}` : `Transfer to ${transaction.to}`}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="mr-1" size={12} />
                      {transaction.date} • {transaction.time}
                    </p>
                  </div>
                </div>
                <div className={`font-semibold text-sm ${
                  transaction.type === 'deposit' ? 'text-green-600' : 
                  transaction.type === 'withdrawal' ? 'text-red-600' : 'text-blue-600'
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
            <h3 className="text-lg font-medium text-gray-700 mb-2">Spending Analytics</h3>
            <p className="text-gray-500">Your spending patterns and statistics will appear here</p>
          </div>
        )}
      </main>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Personal QR Code</h3>
              <button onClick={() => setShowQrModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg flex justify-center mb-4">
              <div className="bg-white p-4 rounded">
                <QrCode size={128} className="text-gray-800" />
              </div>
            </div>
            <p className="text-center text-gray-600 mb-4">Share this code to receive money</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Download className="mr-2" size={18} />
              Save QR Code
            </button>
          </div>
        </div>
      )}

      {/* Withdraw/Send Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Send Money</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
              <input
                type="text"
                placeholder="Enter phone number or name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Available: {balance.toLocaleString()} FCFA</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Money
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;