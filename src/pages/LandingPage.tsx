import { Droplets } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- Shared Utility Components (Simplified for direct use or assumed from main app) ---
// In a real application, these would be imported from a shared components directory.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  ...props
}) => {
  let baseStyles = 'font-semibold rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75';
  
  // Size styles
  switch (size) {
    case 'small':
      baseStyles += ' px-3 py-1.5 text-sm';
      break;
    case 'large':
      baseStyles += ' px-6 py-3 text-lg';
      break;
    case 'medium':
    default:
      baseStyles += ' px-4 py-2 text-base';
      break;
  }

  // Variant styles
  switch (variant) {
    case 'secondary':
      baseStyles += ' bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500';
      break;
    case 'outlined':
      baseStyles += ' border border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-500';
      break;
    case 'primary':
    default:
      baseStyles += ' bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      break;
  }

  return (
    <button className={`${baseStyles} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

// --- Lucide React Icons (Directly embedded SVGs for standalone nature of this immersive) ---
const ChartLineIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"></path><path d="M18 10L12 16L7 11L3 15"></path>
  </svg>
);
const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18s-6-7-6-10a6 6 0 0 1 12 0c0 3-6 10-6 10z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const DropletIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69L11.83 2c-3.15-.36-5.83 2.1-5.83 5.5S12 22 12 22s5.83-14.81 5.83-14.81c0-3.4-2.68-5.86-5.83-5.5z"></path>
  </svg>
);
const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.09.09a2 2 0 0 1 0 2.73l-.09.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.09-.09a2 2 0 0 1 0-2.73l.09-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);


// --- Landing Page Component ---
interface LandingPageProps {
  // onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = () => {
    const navigate=useNavigate()
  
  const onLoginClick=()=>{
    navigate('/login')
  }
  const [showReportModal, setShowReportModal] = React.useState(false);
const [reportType, setReportType] = React.useState('Leak');
const [location, setLocation] = React.useState('');
const [description, setDescription] = React.useState('');
const [contact, setContact] = React.useState('');
const [submitted, setSubmitted] = React.useState(false);

const handleReportSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitted(true);
  setTimeout(() => {
    setShowReportModal(false);
    setSubmitted(false);
    setReportType('Leak');
    setLocation('');
    setDescription('');
    setContact('');
  }, 2000);
};
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter antialiased">
      {/* Header/Navigation */}
      <header className="fixed w-full z-50 bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center rounded-b-lg">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center"><Droplets className="h-8 w-8 text-blue-600 mr-3" />WaterNet Cameroon</h1>
        <nav>
          <Button onClick={onLoginClick} variant="primary" className='text-white' >
            Login
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-blue-700 to-blue-900 text-white flex items-center justify-center pt-20 pb-10 overflow-hidden">
        {/* Abstract background waves */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,149.3C672,139,768,117,864,106.7C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            WaterNet Cameroon: <br /> Managing Water Resources for a Sustainable Future
          </h2>
          <p className="text-lg md:text-2xl opacity-90 mb-10 animate-fade-in-up delay-200">
            Empowering effective water resource management and distribution across Cameroon through data-driven insights and collaborative tools.
          </p>
          <Button size="large" className="bg-blue-200 text-white hover:bg-gray-100 hover:text-black transform hover:scale-101 transition-transform duration-500 animate-fade-in-up delay-400 shadow-lg" onClick={() => setShowReportModal(true)}>
            Report issue
          </Button>
        </div>
        {/* Citizen Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] h-screen bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative mx-2">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowReportModal(false)}>&times;</button>
              {!submitted ? (
                <form onSubmit={handleReportSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold text-blue-700 mb-2 text-center">Submit a Report</h3>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Report Type</label>
                    <select title='type' value={reportType} onChange={e => setReportType(e.target.value)} className="w-full border rounded px-3 py-2 bg-gray-400">
                      <option value="Leak">Leak</option>
                      <option value="Shortage">Shortage</option>
                      <option value="Quality">Quality Issue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Location</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full border rounded px-3 py-2 bg-gray-400" placeholder="e.g. Bonaberi, Douala" required />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2 bg-gray-400" rows={3} placeholder="Describe the issue..." required />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Contact Info (optional)</label>
                    <input type="text" value={contact} onChange={e => setContact(e.target.value)} className="w-full border rounded px-3 py-2 bg-gray-400" placeholder="Phone or email (optional)" />
                  </div>
                  <Button type="submit" size="large" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-2">Submit Report</Button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Droplets size={48} className="text-blue-500 mb-4 animate-pulse" />
                  <h4 className="text-xl font-bold text-blue-700 mb-2">Thank you for your report!</h4>
                  <p className="text-gray-700 text-center">Your submission has been received and will be reviewed by our team.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="py-16 bg-white px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">About WaterNet</h3>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In Cameroon's diverse socio-technical context, water resource management faces unique challenges including resource mismanagement, significant non-revenue water, and data scarcity. WaterNet is designed as a comprehensive, centralized platform to tackle these issues head-on.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our platform provides a unified system for data collection, analysis, and strategic planning for water distribution and infrastructure. By bringing together various stakeholders, WaterNet aims to improve decision-making, enhance operational efficiency, and ultimately ensure sustainable access to clean water for all Cameroonian communities.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <img
                src="https://placehold.co/600x400/CCE7FF/0056B3?text=Cameroon+Water+Infrastructure"
                alt="Water Infrastructure in Cameroon"
                className="rounded-xl shadow-lg w-full max-w-md transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-16 bg-blue-50 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-blue-800 mb-12">How WaterNet Empowers You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1: Data-Driven Planning */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <ChartLineIcon className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Strategic Planning & Oversight</h4>
              <p className="text-gray-700 leading-relaxed">
                For Government Planners and Administrators, WaterNet offers a centralized view of water resources, infrastructure, and budget allocations. Make informed decisions, optimize resource distribution, and develop robust policies based on real-time data.
              </p>
            </div>

            {/* Feature Card 2: Efficient Field Operations */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <MapPinIcon className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Streamlined Field Data Collection</h4>
              <p className="text-gray-700 leading-relaxed">
                Field Officers can easily report meter readings, leak incidents, and maintenance logs directly from the field, even in low-bandwidth environments. This ensures timely updates and rapid response to critical issues.
              </p>
            </div>

            {/* Feature Card 3: Community Engagement & Surveys */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <UsersIcon className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Empowering NGO & Community Input</h4>
              <p className="text-gray-700 leading-relaxed">
                NGO Users can upload crucial survey data from communities, providing vital ground-level insights into water access, sanitation, and quality. Foster collaborative efforts for greater impact.
              </p>
            </div>

            {/* Feature Card 4: Water Quality Monitoring */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <DropletIcon className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Water Quality Tracking</h4>
              <p className="text-gray-700 leading-relaxed">
                Monitor water quality test results from various sources and assets, ensuring safe drinking water for all. Quickly identify contamination incidents and track resolution efforts.
              </p>
            </div>

            {/* Feature Card 5: Asset & Maintenance Management */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <SettingsIcon className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Robust Infrastructure Management</h4>
              <p className="text-gray-700 leading-relaxed">
                Keep track of all water infrastructure assets, their condition, and maintenance schedules. Proactive management reduces downtime and extends asset lifespan.
              </p>
            </div>

             {/* Feature Card 6: Transparency & Accountability */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border border-blue-100">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <BookOpenIcon className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Enhanced Transparency & Reporting</h4>
              <p className="text-gray-700 leading-relaxed">
                WaterNet provides tools for comprehensive reporting and auditing, promoting transparency in water resource management and improving accountability across all levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Water Management in Cameroon?</h3>
          <p className="text-xl opacity-90 mb-10">
            Join the WaterNet platform and contribute to a more efficient, transparent, and sustainable water future.
          </p>
          <Button onClick={onLoginClick} size="large" className="bg-white text-blue-700 hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300 shadow-lg">
            Login to WaterNet
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-300 text-center text-sm px-6">
        <p>&copy; {new Date().getFullYear()} WaterNet Cameroon. All rights reserved.</p>
      </footer>

      {/* Tailwind CSS utility classes can be applied directly in a full project */}
      {/* For local preview, ensure Tailwind is configured or use a CDN */}
      {/* <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"> */}
    </div>
  );
};

export default LandingPage;