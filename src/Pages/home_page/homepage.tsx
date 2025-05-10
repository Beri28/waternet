import React, { useContext, useState } from 'react';
import { 
  FiBell, 
  FiUser, 
  FiSearch, 
  FiMenu,
  FiSend,
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiCreditCard,
  FiList,
  FiDollarSign as FiDollar,
  FiSettings,
  FiPlus,
  FiMinus
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Auth-Context';
import { LogOut } from 'lucide-react';

const HomeScreen = () => {
  const {user,logout}=useAuth()
  // State for dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState('Menu');
  const operations = [
    'Account Summary',
    'Transaction History',
    'Transfer Funds',
    'Settings'
  ];
  const navigate=useNavigate()

  // Services with icons
  const services = [
    { name: 'Transfer Money', icon: <FiSend className="text-black text-2xl mb-2" /> },
    { name: 'Associations/Njangis', icon: <FiUsers className="text-black text-2xl mb-2" /> },
    { name: 'Businesses', icon: <FiBriefcase className="text-black text-2xl mb-2" /> },
    { name: 'Take Loan', icon: <FiDollar className="text-black text-2xl mb-2" /> },
  ];
  const handleLogout=()=>{
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header Container */}
      <div className="mb-8">
        {/* Top Bar with Menu, Search, and Icons */}
        <div className="flex items-center justify-between mb-4" >
          {/* Dropdown Menu - Left Side */}
          <div className="relative mr-4"> {/* Added marginRight here */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center bg-white py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <FiMenu className="mr-2" />
              <span className="text-sm">{selectedOperation}</span>
            </button>
            
            {isMenuOpen && (
              <div className="absolute z-10 mt-1 w-[300px] bg-white rounded-md shadow-lg border border-gray-200 py-1">
                {operations.map((operation) => (
                  <button
                    key={operation}
                    onClick={() => {
                      setSelectedOperation(operation);
                      setIsMenuOpen(false);
                      console.log('Selected:', operation);
                    }}
                    className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                  >
                    {operation === 'Account Summary' && <FiCreditCard className="mr-2" />}
                    {operation === 'Transaction History' && <FiList className="mr-2" />}
                    {operation === 'Transfer Funds' && <FiDollarSign className="mr-2" />}
                    {operation === 'Settings' && <FiSettings className="mr-2" />}
                    {operation}
                  </button>
                ))}
                {user?.isAuthenticated&&
                  <button
                  onClick={() => {handleLogout()}}
                  className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  <LogOut className='w-4 h-4 mr-2' /> Logout
                </button>
                }
              </div>
            )}
          </div>
          
          {/* Search Bar - Moved to center */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          
          {/* Icons - Right Side - Now fully right-aligned */}
          <div className="flex gap-4 ml-4 items-center"> {/* Added marginLeft here */}
            <div className="relative">
              <FiBell className="text-gray-700 w-6 h-6 hover:text-blue-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="p-2 rounded-full hover:bg-gray-500 cursor-pointer bg-gray-300 border-black">
                    {user?.username[0] || ""}{user?.username[1] || ""}
              {/* <FiUser className="text-gray-700 w-5 h-5 hover:text-blue-600" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the components remain unchanged */}
      {/* Balance Card */}
      <div className="bg-black rounded-xl shadow-md p-6 mb-8">
        <p className="text-white mb-2">Account Balance</p>
        <p className="text-3xl font-bold text-white">{user?.personalAccount.balance} FCFA</p>
      </div>

      {/* Top up and withdrawal buttons with icons */}
      <div className="flex w-full mb-8 gap-4">
        <Link to="/topUp" className='w-1/2'>
          <button className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg flex-1 text-center font-medium transition-colors w-full">
            <FiPlus className="text-white" />
            Top up
          </button>
        </Link>
        <Link to="/withdraw" className='w-1/2'>
          <button className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg flex-1 text-center font-medium transition-colors w-full">
            <FiMinus className="text-white" />
            Withdraw
          </button>
        </Link>
      </div>

      {/* Services Grid with Icons */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service,index) => (
          <Link key={index} to="/transfer">
            <div 
              key={service.name}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center h-32 cursor-pointer"
            >
              {service.icon}
              <p className="text-gray-700 text-center font-medium mt-2">{service.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500">
        NJANGBIZ
      </footer>
    </div>
  );
};

export default HomeScreen;
