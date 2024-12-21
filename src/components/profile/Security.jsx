import React, { useState } from 'react';
import { 
  Lock, 
  Shield, 
  KeyRound, 
  Layers, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';

const SecuritySection = ({ 
  icon: Icon, 
  title, 
  description, 
  children, 
  className = '' 
}) => (
  <div className={`bg-white shadow-md rounded-lg p-6 mb-6 ${className}`}>
    <div className="flex items-center mb-4">
      <Icon size={24} className="text-blue-600 mr-3" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    {children}
  </div>
);

const Security = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    { 
      id: 1, 
      device: 'MacBook Pro', 
      location: 'San Francisco, CA', 
      lastActive: '2 hours ago' 
    },
    { 
      id: 2, 
      device: 'iPhone 13', 
      location: 'New York, NY', 
      lastActive: '30 minutes ago' 
    }
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6 bg-gray-50">
      <div className="flex items-center mb-8">
        <Shield size={32} className="text-blue-600 mr-4" />
        <h1 className="text-3xl font-bold text-gray-800">Security Settings</h1>
      </div>

      {/* Password Management */}
      <SecuritySection 
        icon={Lock} 
        title="Password" 
        description="Manage your account password to keep your account secure."
      >
        <div className="flex justify-between items-center">
          <p className="text-gray-700">Last changed: 2 weeks ago</p>
          <button 
            className="
              bg-blue-600 text-white 
              px-4 py-2 rounded-lg 
              hover:bg-blue-700 
              transition-colors
              flex items-center gap-2
            "
          >
            <KeyRound size={18} />
            Change Password
          </button>
        </div>
      </SecuritySection>

      {/* Two-Factor Authentication */}
      <SecuritySection 
        icon={Layers} 
        title="Two-Factor Authentication" 
        description="Add an extra layer of security to your account."
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {twoFactorEnabled ? (
              <CheckCircle2 size={24} className="text-green-500 mr-2" />
            ) : (
              <AlertTriangle size={24} className="text-yellow-500 mr-2" />
            )}
            <span className={twoFactorEnabled ? 'text-green-600' : 'text-yellow-600'}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <button 
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`
              px-4 py-2 rounded-lg 
              transition-colors
              flex items-center gap-2
              ${twoFactorEnabled 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {twoFactorEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </SecuritySection>

      {/* Active Sessions */}
      <SecuritySection 
        icon={Layers} 
        title="Active Sessions" 
        description="View and manage devices connected to your account."
      >
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className="
              flex justify-between items-center 
              bg-gray-100 rounded-lg 
              p-4 mb-3 last:mb-0
            "
          >
            <div>
              <p className="font-semibold">{session.device}</p>
              <p className="text-sm text-gray-600">
                {session.location} • Last active {session.lastActive}
              </p>
            </div>
            <button 
              className="
                text-red-600 hover:text-red-700 
                border border-red-200 
                px-3 py-1 rounded-lg
                transition-colors
              "
            >
              Sign Out
            </button>
          </div>
        ))}
      </SecuritySection>
    </div>
  );
};

export default Security;