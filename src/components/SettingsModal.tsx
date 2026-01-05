import { useState } from 'react';
import {
  X, Sun, Moon, Monitor, Bell, BellOff, Globe, Palette,
  Clock, Shield, Database, RefreshCw, Download, Trash2,
  ChevronRight, Check, Smartphone
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  notificationsEnabled: boolean;
  onNotificationsToggle: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  notificationsEnabled,
  onNotificationsToggle
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'data' | 'advanced'>('general');

  if (!isOpen) return null;

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: <Sun className="w-5 h-5" />, description: 'Classic light theme' },
    { value: 'dark' as const, label: 'Dark', icon: <Moon className="w-5 h-5" />, description: 'Easy on the eyes' },
    { value: 'system' as const, label: 'System', icon: <Monitor className="w-5 h-5" />, description: 'Match device settings' }
  ];

  const tabs = [
    { id: 'general' as const, label: 'General', icon: <Palette className="w-4 h-4" /> },
    { id: 'notifications' as const, label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'data' as const, label: 'Data & Privacy', icon: <Database className="w-4 h-4" /> },
    { id: 'advanced' as const, label: 'Advanced', icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm modal-overlay"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden modal-content">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[500px]">
          {/* Sidebar */}
          <div className="w-48 border-r border-gray-100 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-smb-blue text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'general' && (
              <div className="space-y-6">
                {/* Theme Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Appearance</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {themeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => onThemeChange(option.value)}
                        className={`relative p-4 rounded-xl border-2 transition-all ${
                          theme === option.value
                            ? 'border-smb-blue bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {theme === option.value && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-smb-blue rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className={`mb-2 ${theme === option.value ? 'text-smb-blue' : 'text-gray-400'}`}>
                          {option.icon}
                        </div>
                        <p className="text-sm font-medium text-gray-900">{option.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Language & Region</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Language</p>
                          <p className="text-xs text-gray-500">Display language</p>
                        </div>
                      </div>
                      <select className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-smb-blue">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Timezone</p>
                          <p className="text-xs text-gray-500">For scheduling posts</p>
                        </div>
                      </div>
                      <select className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-smb-blue">
                        <option>America/New_York (EST)</option>
                        <option>America/Los_Angeles (PST)</option>
                        <option>America/Chicago (CST)</option>
                        <option>UTC</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Display */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Display</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Compact Mode</p>
                          <p className="text-xs text-gray-500">Show more content on screen</p>
                        </div>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-smb-blue rounded focus:ring-smb-blue" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        {notificationsEnabled ? (
                          <Bell className="w-5 h-5 text-smb-blue" />
                        ) : (
                          <BellOff className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">Post Notifications</p>
                          <p className="text-xs text-gray-500">Get notified when posts are published</p>
                        </div>
                      </div>
                      <button
                        onClick={onNotificationsToggle}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notificationsEnabled ? 'bg-smb-blue' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Weekly Reports</p>
                          <p className="text-xs text-gray-500">Receive weekly performance summaries</p>
                        </div>
                      </div>
                      <button className="relative w-12 h-6 bg-smb-blue rounded-full">
                        <div className="absolute top-1 translate-x-7 w-4 h-4 bg-white rounded-full" />
                      </button>
                    </label>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Security Alerts</p>
                          <p className="text-xs text-gray-500">Important account security updates</p>
                        </div>
                      </div>
                      <button className="relative w-12 h-6 bg-smb-blue rounded-full">
                        <div className="absolute top-1 translate-x-7 w-4 h-4 bg-white rounded-full" />
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Data</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-gray-400" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">Export Data</p>
                          <p className="text-xs text-gray-500">Download all your data</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-gray-400" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">Data Storage</p>
                          <p className="text-xs text-gray-500">Using 2.4 GB of 10 GB</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Privacy</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Analytics Tracking</p>
                        <p className="text-xs text-gray-500">Help improve our services</p>
                      </div>
                      <button className="relative w-12 h-6 bg-smb-blue rounded-full">
                        <div className="absolute top-1 translate-x-7 w-4 h-4 bg-white rounded-full" />
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">API Settings</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">API Endpoint</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Connected</span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">https://n8n.srv836017.hstgr.cloud</p>
                    </div>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Auto-refresh Data</p>
                        <p className="text-xs text-gray-500">Sync every 5 minutes</p>
                      </div>
                      <button className="relative w-12 h-6 bg-smb-blue rounded-full">
                        <div className="absolute top-1 translate-x-7 w-4 h-4 bg-white rounded-full" />
                      </button>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Cache</h3>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-gray-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">Clear Cache</p>
                        <p className="text-xs text-gray-500">12.3 MB cached</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 text-red-600">Danger Zone</h3>
                  <button className="w-full flex items-center justify-between p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-200">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5 text-red-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-red-600">Reset Dashboard</p>
                        <p className="text-xs text-red-500">Clear all settings and data</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-smb-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
