import React, { useState } from 'react';

interface MoneyTransferProps {}

const WithdrawalPage: React.FC<MoneyTransferProps> = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('FCFA'); // Default currency



  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your money transfer logic here
    console.log('Withdrawal Details:', { amount, currency });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Withdraw Money</h1>

        <div className="bg-white shadow-md rounded-lg p-6 md:p-8 max-width-[50%] mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
        
            <div>
              <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                Amount
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="amount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-12"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <select
                    value={currency}
                    onChange={handleCurrencyChange}
                    className="focus:outline-none h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
                    <option>FCFA</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    {/* Add more currency options as needed */}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 w-full"
            >
              Withdraw Money
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Secure money Widrawal powered by NjangBiz</p>
          {/* Add links to terms of service, privacy policy, etc. if needed */}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;