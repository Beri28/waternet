import  { useState } from 'react';
import { 
  UserPlus, Coins, Award, User, Check, 
  Clock, RotateCw, ArrowLeft, ChevronDown 
} from 'lucide-react';

type IntervalType = 'Weekly' | 'Bi-weekly' | 'Monthly' | 'Quarterly';
type ContributionStatus = 'pending' | 'paid' | 'received';
type Screen = 'main' | 'addMember';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  positions: number;
  contributionAmount: number;
  status: ContributionStatus;
  lastReceivedDate: string | null;
  nextEligibleDate: string | null;
}

const AssociationManagement = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    positions: 1,
    contributionAmount: 500
  });

  // Current cycle data
  const [currentCycle] = useState({
    startDate: '05/01/2025',
    endDate: '05/31/2025',
    potAmount: 8000,
  });

  // Mock data with contribution status
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '+1234567890',
      positions: 1,
      contributionAmount: 500,
      status: 'paid',
      lastReceivedDate: '04/15/2025',
      nextEligibleDate: '07/01/2025'
    },
    {
      id: '2',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1234567891',
      positions: 2,
      contributionAmount: 1000,
      status: 'pending',
      lastReceivedDate: null,
      nextEligibleDate: '06/01/2025'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      phone: '+1234567892',
      positions: 1,
      contributionAmount: 500,
      status: 'paid',
      lastReceivedDate: '03/01/2025',
      nextEligibleDate: '08/01/2025'
    },
    {
      id: '4',
      name: 'Diana Prince',
      email: 'diana@example.com',
      phone: '+1234567893',
      positions: 1,
      contributionAmount: 500,
      status: 'received',
      lastReceivedDate: null,
      nextEligibleDate: '09/01/2025'
    }
  ]);

  const [contributionInterval] = useState<IntervalType>('Monthly');
  const [nextContributionDate] = useState('06/01/2025');
  
  // Calculate totals
  // const totalExpected = members.reduce((sum, m) => sum + (m.contributionAmount * m.positions), 0);
  const totalPositions = members.reduce((sum, m) => sum + m.positions, 0);
  const paidAmount = members.filter(m => m.status === 'paid').reduce((sum, m) => sum + m.contributionAmount, 0);
  const pendingAmount = members.filter(m => m.status === 'pending').reduce((sum, m) => sum + m.contributionAmount, 0);
  
  // Determine current recipient and future queue
  const currentRecipient = members.find(m => m.status === 'received');
  const futureRecipients = members
    .filter(m => m.status !== 'received')
    .sort((a, b) => new Date(a.nextEligibleDate!).getTime() - new Date(b.nextEligibleDate!).getTime());

  const handleAddMember = () => {
    const newMemberObj: Member = {
      id: `member-${Date.now()}`,
      ...newMember,
      status: 'pending',
      lastReceivedDate: null,
      nextEligibleDate: '10/01/2025' // Default next eligible date
    };
    
    setMembers([...members, newMemberObj]);
    setCurrentScreen('main');
    setNewMember({
      name: '',
      email: '',
      phone: '',
      positions: 1,
      contributionAmount: 500
    });
  };

  const MainScreen = () => (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Association Funds</h1>
          <p className="text-gray-500">Current cycle: {currentCycle.startDate} - {currentCycle.endDate}</p>
        </div>
        <button 
          onClick={() => setCurrentScreen('addMember')}
          className="flex items-center px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
        >
          <UserPlus className="mr-2" size={18} />
          Add Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-black rounded-xl p-6 shadow-sm border border-gray-100 text-white hover:bg-gray-700">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Total Contribution</p>
              <h3 className="text-2xl font-bold mt-1">{currentCycle.potAmount.toLocaleString()} FCFA</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <Coins className="text-indigo-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-3">
            {members.length} member{members.length !== 1 ? 's' : ''} • {totalPositions} position{totalPositions !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-black rounded-xl p-6 shadow-sm border border-gray-100 hover:bg-gray-700 text-white">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Paid</p>
              <h3 className="text-2xl font-bold mt-1">{paidAmount.toLocaleString()} FCFA</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
              <Check className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-3">
            {members.filter(m => m.status === 'paid').length} member{members.filter(m => m.status === 'paid').length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-black rounded-xl p-6 shadow-sm border border-gray-100 hover:bg-gray-700 text-white">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Pending</p>
              <h3 className="text-2xl font-bold mt-1">{pendingAmount.toLocaleString()} FCFA</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-3">
            {members.filter(m => m.status === 'pending').length} member{members.filter(m => m.status === 'pending').length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-black text-white rounded-xl p-6 shadow-sm border border-gray-100 hover:bg-gray-700">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Next Cycle</p>
              <h3 className="text-xl font-bold mt-1">{nextContributionDate}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
              <RotateCw className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-3">{contributionInterval} contributions</p>
        </div>
      </div>

      {/* Current Recipient */}
      {currentRecipient && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 bg-green-50">
            <h2 className="text-lg font-semibold text-green-800 flex items-center">
              <Award className="mr-2" size={20} />
              Current Recipient
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <User className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900">{currentRecipient.name}</h3>
                <p className="text-gray-600">{currentRecipient.email}</p>
                <div className="mt-2 flex space-x-4">
                  <div>
                    <span className="text-sm text-gray-500">Received</span>
                    <p className="font-medium">{currentCycle.potAmount.toLocaleString()} FCFA</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Positions</span>
                    <p className="font-medium">{currentRecipient.positions}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Contribution</span>
                    <p className="font-medium">{currentRecipient.contributionAmount.toLocaleString()} FCFA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Future Recipients */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Recipient Queue</h2>
          <p className="text-sm text-gray-500">Order of members to receive future pots</p>
        </div>
        <div className="divide-y divide-gray-200">
          {futureRecipients.map((member, index) => (
            <div key={member.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 text-gray-400 font-medium">{index + 1}.</span>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center ml-2">
                    <User className="text-indigo-600" size={18} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">Eligible: {member.nextEligibleDate}</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Positions</span>
                    <p className="font-medium">{member.positions}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Contribution</span>
                    <p className="font-medium">{member.contributionAmount.toLocaleString()} FCFA</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">All Members</h2>
          <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {members.length} members
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Positions</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Received</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <User className="text-indigo-600" size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.status === 'received' ? (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center w-fit">
                        <Check className="mr-1" size={14} /> Received Pot
                      </span>
                    ) : member.status === 'paid' ? (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      {member.positions}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {(member.contributionAmount * member.positions).toLocaleString()} FCFA
                    </div>
                    <div className="text-xs text-gray-500">
                      ({member.contributionAmount.toLocaleString()} × {member.positions})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {member.lastReceivedDate || 'Never'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const AddMemberScreen = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center">
        <button 
          onClick={() => setCurrentScreen('main')}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">Add New Member</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              placeholder="Enter member's full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              placeholder="Enter member's email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              value={newMember.phone}
              onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
              placeholder="Enter member's phone number"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Positions</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black appearance-none"
                  value={newMember.positions}
                  onChange={(e) => setNewMember({...newMember, positions: parseInt(e.target.value)})}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="text-gray-400" size={18} />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contribution per Position</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">FCFA</span>
                </div>
                <input
                  type="number"
                  className="w-full pl-16 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                  value={newMember.contributionAmount}
                  onChange={(e) => setNewMember({...newMember, contributionAmount: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              onClick={handleAddMember}
              disabled={!newMember.name || !newMember.email}
              className={`w-full py-3 px-4 rounded-lg font-medium ${!newMember.name || !newMember.email ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {currentScreen === 'main' ? <MainScreen /> : <AddMemberScreen />}
      </div>
    </div>
  );
};

export default AssociationManagement;