import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Association {
  id: string;
  name: string;
  description: string;
}

const UserAssociationScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [association, setAssociation] = useState<Association[]>([
    { id: '1', name: 'Tech Innovators Ltd', description: 'Software development and IT solutions' },
    { id: '2', name: 'Global Foods Co', description: 'Import and export of food products' },
    { id: '3', name: 'Fashion Hub', description: 'Retailer of trendy clothing and accessories' },
    { id: '4', name: 'Green Energy Solutions', description: 'Provider of sustainable energy solutions' },
    { id: '5', name: 'Creative Designs Studio', description: 'Graphic design and marketing services' },
  ]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredAssociation = association.filter(association =>
    association.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAssociation = () => {
    alert('Add association functionality would open a modal or navigate to a new page.');
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Horizontal Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Njangi</h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search Njangi or Contribution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddAssociation}
            className="flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto px-4 sm:px-6 py-2 h-12 rounded-lg bg-black hover:bg-gray-800 text-white transition-colors duration-200 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Njangi</span>
          </button>
        </div>
      </div>

      {/* Business Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAssociation.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-gray-500 py-8"
            >
              No businesses found matching your search.
            </motion.div>
          ) : (
            filteredAssociation.map((association) => (
              <motion.div
                key={association.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:scale-[1.02]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Store className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-900">{association.name}</h3>
                    </div>
                    <p className="text-gray-600">{association.description}</p>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    {/* Action buttons would go here */}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default  UserAssociationScreen;