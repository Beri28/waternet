import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }> = ({ className, children, ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50";
    
    return (
        <button {...props} className={`${baseClasses} ${className}`}>
            {children}
        </button>
    );
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { className?: string; label?: string }> = ({ className, label, ...props }) => {
    return (
        <div className="space-y-1.5">
            {label && <label className="text-sm font-medium leading-none">{label}</label>}
            <input
                {...props}
                className={`flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 ${className}`}
            />
        </div>
    );
};

const TopUpScreen = () => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [transactionStatus, setTransactionStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

    const handleTopUp = async () => {
        if (!amount || !paymentMethod || !mobileNumber) {
            alert('Please enter amount, payment method, and mobile number.');
            return;
        }

        setTransactionStatus('processing');
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setTransactionStatus('success');
            setAmount('');
            setPaymentMethod('');
            setMobileNumber('');
        } catch (error) {
            setTransactionStatus('error');
        } finally {
            setTimeout(() => setTransactionStatus('idle'), 3000);
        }
    };

    const paymentMethods = [
        { value: 'mtn', label: 'MTN Mobile Money' },
        { value: 'orange', label: 'Orange Money' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Back Button */}
            <div className="p-4">
                <Button
                    className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 px-4 py-2"
                    onClick={() => alert('Navigating back...')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </Button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md space-y-8">
                    <h1 className="text-3xl font-bold text-center text-gray-900">Top Up Account</h1>

                    <div className="space-y-4">
                        <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">Amount (FCFA)</label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700">Mobile Number</label>
                        <Input
                            id="mobileNumber"
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="Enter mobile number"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">Payment Method</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {paymentMethods.map((method) => (
                                <Button
                                    key={method.value}
                                    className={`
                                        w-full py-3 px-4 rounded-lg border
                                        ${method.value === paymentMethod 
                                            ? "bg-black text-white border-black" 
                                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"}
                                    `}
                                    onClick={() => setPaymentMethod(method.value)}
                                >
                                    {method.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Top Up Button */}
                    <Button
                        onClick={handleTopUp}
                        className={`w-full py-3 text-white font-semibold rounded-lg ${
                            transactionStatus === 'processing' ? "bg-yellow-600" :
                            transactionStatus === 'success' ? "bg-green-600" :
                            transactionStatus === 'error' ? "bg-red-600" :
                            "bg-black hover:bg-gray-800"
                        }`}
                        disabled={transactionStatus === 'processing'}
                    >
                        {transactionStatus === 'processing' ? 'Processing...' :
                         transactionStatus === 'success' ? 'Success!' :
                         transactionStatus === 'error' ? 'Error' :
                         'Top Up Account'}
                    </Button>

                    {transactionStatus === 'success' && (
                        <p className="text-center text-green-600 font-medium">Top up successful!</p>
                    )}
                    {transactionStatus === 'error' && (
                        <p className="text-center text-red-600 font-medium">Error occurred. Please try again.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopUpScreen;