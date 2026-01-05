import React, { useState } from 'react';
import { Menu, X, Bell, Settings, User, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onNotificationClick: () => void;
  notificationsEnabled: boolean;
  clientName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNotificationClick,
  notificationsEnabled,
  clientName = 'Start My Business Inc.'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', active: false },
    { label: 'Dashboard', href: '#dashboard', active: true },
    { label: 'Calendar', href: '#calendar', active: false },
    { label: 'Analytics', href: '#analytics', active: false },
    { label: 'Pricing', href: '#pricing', active: false },
    { label: 'Support', href: '#support', active: false }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://startmybusiness.us/assets/images/logo.png"
              alt="Start My Business"
              className="h-10 w-auto"
              onError={(e) => {
                // Fallback to text if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-smb-dark leading-tight">
                Start My Business
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                Social Automation
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  item.active
                    ? 'bg-smb-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={onNotificationClick}
              className={`relative p-2 rounded-full transition-all ${
                notificationsEnabled
                  ? 'bg-smb-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={notificationsEnabled ? 'Notifications enabled' : 'Enable notifications'}
            >
              <Bell className="w-5 h-5" />
              {notificationsEnabled && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-smb-blue to-smb-purple rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  SM
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                  {clientName}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 modal-content">
                  <a href="#profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                    <User className="w-4 h-4" />
                    Profile
                  </a>
                  <a href="#settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                  <hr className="my-2 border-gray-100" />
                  <a href="#logout" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 modal-content">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  item.active
                    ? 'bg-smb-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </a>
            ))}
            <hr className="my-3 border-gray-100" />
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 bg-gradient-to-br from-smb-blue to-smb-purple rounded-full flex items-center justify-center text-white font-semibold">
                SM
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{clientName}</p>
                <p className="text-xs text-gray-500">Business Account</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
