import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../home_page/HomeScreen';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useAuth, User } from '../../Context/Auth-Context';
import { useToast } from '../../Context/toastContext';
import { baseUrl } from '../../App';

interface MoneyTransferProps {}

const MoneyTransferPageWithQR: React.FC<MoneyTransferProps> = () => {
  const {user,updateUser}=useAuth()
  const { type } = useParams<{ type: "mobile"|"business"|"other" }>();
  const [transferMethod, setTransferMethod] = useState<"phone"|"qrCode">('phone'); // 'emailPhone' or 'qrCode'
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [transferReason, setTransferReason] = useState('');
  const [qrCodeData, setQrCodeData] = useState(''); // In a real app, this would be generated or captured
  const navigate=useNavigate()
  const {showToast}=useToast()

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (transferMethod === 'phone') {
      console.log('Transfer Details (Email/Phone):', { recipient, amount, currency, transferReason });
      // Implement email/phone based transfer logic
    } else if (transferMethod === 'qrCode') {
      console.log('Transfer Details (QR Code):', { qrCodeData, amount, currency, transferReason });
      // Implement QR code based transfer logic
    }
    try {
      if(transferMethod==='phone'){
        const config={
            method:"POST",
            url:baseUrl + '/payment/mobile',
            data:{
              id:user?.personalAccount._id || "",
              paymentChannel:'mtn',
              phoneNumber:recipient,
              amount
            }
        }
        const res=await axios(config) 
        console.log(res)
        if(res.data){
          console.log(res.data.data)
          let tempUser={...user,personalAccount:res.data.message.personalAccount} as User
          updateUser(tempUser)
          console.log(user)
        }
        showToast("Transfer was successful.", { type: 'success', theme: 'colored' })
        navigate(-1)
      }else{
        if(type==='business'){
          const config={
            method:"POST",
            url:baseUrl + '/payment/transfer/merchant',
            data:{
              senderId:user?.personalAccount._id || "",
              paymentChannel:'mtn',
              receiverId:recipient,
              amount,
              status:'pending'
            }
        }
        const res=await axios(config) 
        console.log(res)
        if(res.data){
          console.log(res.data.data)
          let tempUser={...user,personalAccount:res.data.message.personalAccount} as User
          updateUser(tempUser)
          console.log(user)
        }
        showToast("Transfer was successful.", { type: 'success', theme: 'colored' })
        navigate(-1)
        }else{
          const config={
              method:"POST",
              url:baseUrl + '/payment//transfer/personal',
              data:{
                senderId:user?.personalAccount._id || "",
                paymentChannel:'mtn',
                receiverId:recipient,
                amount,
                status:'pending'
              }
          }
          const res=await axios(config) 
          console.log(res)
          if(res.data){
            console.log(res.data.data)
            let tempUser={...user,personalAccount:res.data.message.personalAccount} as User
            updateUser(tempUser)
            console.log(user)
          }
          showToast("Transfer was successful.", { type: 'success', theme: 'colored' })
          navigate(-1)
        }
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header />
      <div className="">

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <button className="flex items-center p-2 bg-white hover:bg-gray-100 rounded-sm shadow-sm text-gray-700" onClick={()=>navigate(-1)}>
            <ArrowLeft className="mr-1" size={20} />
            Back
          </button>
          <div className="mb-4 flex space-x-4">
            <button
              type="button"
              className={`py-2 px-4 rounded`}
              onClick={() => handleTransferMethodChange('phone')}
            >
              <input type='checkbox' className='mr-1 w-3 h-3' checked={transferMethod==='phone'} />
              Mobile Phone
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded ${type==='mobile'&& 'text-gray-400' }`}
              onClick={() => handleTransferMethodChange('qrCode')}
            >
              <input type='checkbox' className='mr-1 w-3 h-3' disabled={type==='mobile'&& true} checked={transferMethod!=='phone'} />
              QR Code
            </button>
          </div>
          <form onSubmit={handleSubmit} className={"space-y-4"}>
              {transferMethod === 'phone' && (
                <div>
                  <label htmlFor="recipient" className="block text-gray-700 text-sm font-bold mb-2">
                    Recipient's mobile number
                  </label>
                  <input
                    type="number"
                    id="recipient"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter recipient's mobile number"
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
                      {/* <option>EUR</option>
                      <option>GBP</option> */}
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
              <Link to="/qrCodeScanner">
                <button
                  type="submit"
                  className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 w-full"
                >
                  Continue To Scan QR Code
                </button>
              </Link>
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