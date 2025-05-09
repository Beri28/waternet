import React, { useState } from 'react';

interface MoneyTransferProps {}

const MoneyTransferPageWithQR: React.FC<MoneyTransferProps> = () => {
  const [transferMethod, setTransferMethod] = useState<"phone"|"qrCode">('phone'); // 'emailPhone' or 'qrCode'
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [transferReason, setTransferReason] = useState('');
  const [qrCodeData, setQrCodeData] = useState(''); // In a real app, this would be generated or captured

  const handleTransferMethodChange = (method: 'phone' | 'qrCode') => {
    setTransferMethod(method);
    // Reset relevant fields when switching methods
    setRecipient('');
    setQrCodeData('');
  };

  const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const handleTransferReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTransferReason(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (transferMethod === 'phone') {
      console.log('Transfer Details (Email/Phone):', { recipient, amount, currency, transferReason });
      // Implement email/phone based transfer logic
    } else if (transferMethod === 'qrCode') {
      console.log('Transfer Details (QR Code):', { qrCodeData, amount, currency, transferReason });
      // Implement QR code based transfer logic
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Transfer Money</h1>

        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <div className="mb-4 flex space-x-4">
            <button
              type="button"
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                transferMethod === 'phone' ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleTransferMethodChange('phone')}
            >
              Email/Phone
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                transferMethod === 'qrCode' ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => handleTransferMethodChange('qrCode')}
            >
              QR Code
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {transferMethod === 'phone' && (
              <div>
                <label htmlFor="recipient" className="block text-gray-700 text-sm font-bold mb-2">
                  Recipient's Email or Phone
                </label>
                <input
                  type="text"
                  id="recipient"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter recipient's email or phone"
                  value={recipient}
                  onChange={handleRecipientChange}
                  required
                />
              </div>
            )}


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
                    {/* Add more currency options */}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="transferReason" className="block text-gray-700 text-sm font-bold mb-2">
                Reason for Transfer (Optional)
              </label>
              <textarea
                id="transferReason"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Optional: Enter reason for transfer"
                value={transferReason}
                onChange={handleTransferReasonChange}
                rows={3}
              ></textarea>
            </div>

            {transferMethod==='phone'?
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 w-full"
            >
              Send Money
            </button>
            :
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 w-full"
            >
              Continue To Scan QR Code
            </button>
            }
          </form>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Secure money transfer powered by NjangBiz</p>
          {/* Add links to terms of service, privacy policy, etc. */}
        </div>
      </div>
    </div>
  );
};

export default MoneyTransferPageWithQR;