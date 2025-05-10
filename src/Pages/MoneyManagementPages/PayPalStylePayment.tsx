import React, { useState } from 'react';
import { Header } from '../home_page/HomeScreen';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: 'default' | 'outline';
  isLoading?: boolean;
}> = ({ className, variant, isLoading, children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50";
  const variantClasses = variant === 'outline'
    ? "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200"
    : "bg-black text-white hover:bg-black/80";

  return (
    <button
      {...props}
      className={cn(baseClasses, variantClasses, className)}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Simple cn function
function cn(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}

interface TransactionType {
  value: 'goods' | 'friends' | 'mobile';
  label: string;
  description: string;
}

const transactionTypes: TransactionType[] = [
  {
    value: 'goods',
    label: 'Goods and services',
    description: 'For purchases from businesses or individuals. Seller protection included.',
  },
  {
    value: 'friends',
    label: 'Friends and family',
    description: 'Send to people you trust. No seller protection.',
  },
  {
    value: 'mobile',
    label: 'Mobile money',
    description: 'Send directly to a mobile wallet.',
  },
];

const PayPalStylePayment = () => {
  const [selectedType, setSelectedType] = useState<TransactionType['value']>('goods');
  const proceed = false
  const isLoading= false
  const navigate=useNavigate()

  const handleTypeSelect = (type: TransactionType['value']) => {
    setSelectedType(type);
  };

  return (
    <div className="bg-gray-100 min-h-screen  p-6">
      <Header />
      <div className="">
        {/* <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-start">Select payment type</h1> */}

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <button className="flex items-center p-2 bg-white hover:bg-gray-100 rounded-sm shadow-sm text-gray-700" onClick={()=>navigate(-1)}>
            <ArrowLeft className="mr-1" size={20} />
            Back
          </button>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Select payment type</h2>
            <p className="text-sm text-gray-500 mb-4">
              Choose how you want to send money. Fees may apply.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {transactionTypes.map((type) => (
                <div
                  key={type.value}
                  onClick={() => handleTypeSelect(type.value)}
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all",
                    "hover:border-gray-400",
                    selectedType === type.value
                      ? "border-2 border-black bg-gray-50"
                      : "border-gray-200"
                  )}
                >
                  <div className="flex items-start">
                    <div className={cn(
                      "w-5 h-5 rounded-full border mt-0.5 mr-3 flex-shrink-0",
                      selectedType === type.value
                        ? "border-black bg-black flex items-center justify-center"
                        : "border-gray-300"
                    )}>
                      {selectedType === type.value && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{type.label}</h3>
                      <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                      {type.value === 'goods' && (
                        <span className="inline-block mt-2 text-xs text-green-600 font-medium">
                          Recommended for purchases
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-700">
              You have selected: <span className="font-semibold">{transactionTypes.find(t => t.value === selectedType)?.label}</span>
            </p>
            <Button
              onClick={()=>{selectedType==='mobile'? navigate('/transfer2/mobile'):selectedType==='goods'?navigate('/transfer2/business'): navigate('/transfer2/other')}}
              isLoading={isLoading}
              className={cn(
                "mt-6 px-8 py-3 rounded-full",
                "bg-black",
                "text-white font-semibold text-lg",
                "shadow-lg",
                "transition-all duration-300",
                "border-2 border-white/20",
                "backdrop-blur-md",
                "hover:bg-black/80",
                "min-w-[150px]" // Ensure consistent width
              )}
            >
              Proceed
            </Button>
            {proceed && (
              <p className="mt-4 text-green-600">
                Proceeding to {transactionTypes.find(t => t.value === selectedType)?.label}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalStylePayment;

