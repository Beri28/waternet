import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, 
  FiDollarSign, 
  FiCalendar,
  FiEdit2,
  FiPlus,
  FiX,
  FiChevronDown,
  FiArrowLeft,
  FiCheck
} from 'react-icons/fi';

type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
type Privacy = 'public' | 'private';

interface AssociationForm {
  name: string;
  description: string;
  contribution: {
    amount: string;
    frequency: Frequency;
  };
  members: string[];
  settings: {
    theme: 'black';
    privacy: Privacy;
  };
}

const CreateAssociation: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<AssociationForm>({
    name: '',
    description: '',
    contribution: {
      amount: '',
      frequency: 'weekly'
    },
    members: [''],
    settings: {
      theme: 'black',
      privacy: 'private'
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const [success, setSuccess] = useState(false);

  const FREQUENCY_OPTIONS = [
    { value: 'daily' as const, label: 'Daily' },
    { value: 'weekly' as const, label: 'Weekly' },
    { value: 'monthly' as const, label: 'Monthly' },
    { value: 'yearly' as const, label: 'Yearly' }
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Association name is required';
    }
    
    if (!formData.contribution.amount || isNaN(Number(formData.contribution.amount))) {
      newErrors.amount = 'Valid contribution amount is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => navigate('/associations'), 2000);
    } catch (error) {
      console.error('Creation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="text-green-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
          <p className="text-gray-600 mb-6">Association created successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 mr-4 rounded-full hover:bg-gray-800 transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <h1 className="text-2xl font-bold">Create Association</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FiUsers className="inline mr-2" />
                Association Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter name"
              />
              {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FiEdit2 className="inline mr-2" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                rows={3}
                placeholder="Enter description"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FiDollarSign className="inline mr-2" />
                  Contribution Amount *
                </label>
                <input
                  type="number"
                  value={formData.contribution.amount}
                  onChange={(e) => setFormData({
                    ...formData, 
                    contribution: {...formData.contribution, amount: e.target.value}
                  })}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.amount && <p className="mt-1 text-red-500 text-sm">{errors.amount}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">
                  <FiCalendar className="inline mr-2" />
                  Frequency *
                </label>
                <button
                  type="button"
                  onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
                  className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-lg"
                >
                  <span>
                    {FREQUENCY_OPTIONS.find(f => f.value === formData.contribution.frequency)?.label}
                  </span>
                  <FiChevronDown />
                </button>
                {showFrequencyDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {FREQUENCY_OPTIONS.map(option => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            contribution: {...formData.contribution, frequency: option.value}
                          });
                          setShowFrequencyDropdown(false);
                        }}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FiUsers className="inline mr-2" />
                Members
              </label>
              {formData.members.map((member, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => {
                      const newMembers = [...formData.members];
                      newMembers[index] = e.target.value;
                      setFormData({...formData, members: newMembers});
                    }}
                    className="flex-1 p-3 border border-gray-300 rounded-lg"
                    placeholder={`Member ${index + 1}`}
                  />
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newMembers = [...formData.members];
                        newMembers.splice(index, 1);
                        setFormData({...formData, members: newMembers});
                      }}
                      className="p-3 bg-red-100 text-red-600 rounded-lg"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({...formData, members: [...formData.members, '']})}
                className="mt-2 flex items-center text-black bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"
              >
                <FiPlus className="mr-2" />
                Add Member
              </button>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isSubmitting ? 'Creating...' : 'Create Association'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateAssociation;