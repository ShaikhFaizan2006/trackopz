'use client';
import React, { useState } from 'react';
import { X, User, Globe, Settings, Clock, LogOut, ArrowLeft, Moon, Languages } from 'lucide-react';

// Type definitions
interface DevicePreferenceContentProps {
  onBack: () => void;
}

interface SettingsContentProps {
  onBack: () => void;
}

interface MainMenuContentProps {
  onDevicePreference: () => void;
  onSettings: () => void;
  onUserProfile: () => void;
  onSession: () => void;
  onLogOut: () => void;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewType = 'main' | 'devicePreference' | 'settings';

// Device Preference Content Component
function DevicePreferenceContent({ onBack }: DevicePreferenceContentProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors mr-3"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Device Preference</h1>
      </div>

      {/* App Parameters Section */}
      <div className="mb-4">
        <h2 className="text-xs font-medium text-gray-600 mb-2">App Parameters</h2>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Location:</span>
              <span className="text-gray-900 font-medium text-sm">PUNE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Server Reachability:</span>
              <span className="text-green-600 font-medium text-sm">YES</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Data Connections:</span>
              <span className="text-gray-900 font-medium text-sm">MOBILE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Latency:</span>
              <span className="text-gray-900 font-medium text-sm">1.115 sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* Device Parameters Section */}
      <div>
        <h2 className="text-xs font-medium text-gray-600 mb-2">Device Parameters</h2>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-gray-700 text-sm">Platform:</span>
              <div className="text-right">
                <div className="text-gray-900 font-medium text-sm">android 15</div>
                <div className="text-gray-500 text-xs">VANILLA_ICE sdk=35</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Manufacturer:</span>
              <span className="text-gray-900 font-medium text-sm">VIVO</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-700 text-sm">Service Provider:</span>
              <div className="text-right">
                <div className="text-gray-900 font-medium text-sm">Airtel/5G/</div>
                <div className="text-gray-500 text-xs">VOLTE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Content Component
function SettingsContent({ onBack }: SettingsContentProps) {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('English(UK)');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors mr-3"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Settings</h1>
      </div>

      {/* Dark Mode Setting */}
      <div className="mb-4">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium text-sm">Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Language Setting */}
      <div className="mb-4">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Languages className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium text-sm">Language</span>
            </div>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="English(UK)">English(UK)</option>
              <option value="English(US)">English(US)</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div>
        <h2 className="text-xs font-medium text-gray-600 mb-2">Additional Settings</h2>
        <div className="space-y-2">
          {/* <button className="w-full bg-white rounded-lg p-3 shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-gray-700 font-medium text-sm">Notifications</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full bg-white rounded-lg p-3 shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-gray-700 font-medium text-sm">Privacy & Security</span>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full bg-white rounded-lg p-3 shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-gray-700 font-medium text-sm">Data Usage</span>
            <span className="text-gray-400">›</span>
          </button> */}
          <button className="w-full bg-white rounded-lg p-3 shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-between">
            <span className="text-gray-700 font-medium text-sm">About</span>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Menu Content Component
function MainMenuContent({ 
  onDevicePreference, 
  onSettings, 
  onUserProfile, 
  onSession, 
  onLogOut 
}: MainMenuContentProps) {
  return (
    <>
      {/* Connect Section */}
      <div className="mb-8">
        <h2 className="text-gray-600 text-sm font-medium mb-4">TrackOpz (Connected System)</h2>
        
        {/* User Profile */}
        <button
          onClick={onUserProfile}
          className="w-full bg-green-100 rounded-xl p-4 mb-4 flex items-center justify-between hover:bg-green-200 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-700" />
            </div>
            <div className="text-left">
              <div className="text-gray-800 font-medium">Dennis</div>
              <div className="text-gray-600 text-sm">Ritche</div>
            </div>
          </div>
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            Operator
          </span>
        </button>

        {/* Device Preference */}
        <button
          onClick={onDevicePreference}
          className="w-full flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg transition-colors mb-2"
        >
          <Globe className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">Device Preference</span>
        </button>

        {/* Settings */}
        <button
          onClick={onSettings}
          className="w-full flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">Settings</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-6"></div>

      {/* Activities Section */}
      <div>
        <h2 className="text-gray-600 text-sm font-medium mb-4">Activities</h2>
        
        {/* Session */}
        <button
          onClick={onSession}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-200 rounded-lg transition-colors mb-2"
        >
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Session</span>
          </div>
          <span className="text-gray-500 text-sm">Last: 13Oct</span>
        </button>

        {/* Log Out */}
        <button
          onClick={onLogOut}
          className="w-full flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">Log Out</span>
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [currentView, setCurrentView] = useState<ViewType>('main');

  const handleUserProfile = (): void => {
    console.log('User profile clicked');
  };

  const handleDevicePreference = (): void => {
    setCurrentView('devicePreference');
  };

  const handleSettings = (): void => {
    setCurrentView('settings');
  };

  const handleBackToMain = (): void => {
    setCurrentView('main');
  };

  const handleSession = (): void => {
    console.log('Session clicked');
  };

  const handleLogOut = (): void => {
    console.log('Log Out clicked');
    onClose();
  };

  const renderSidebarContent = () => {
    switch (currentView) {
      case 'devicePreference':
        return <DevicePreferenceContent onBack={handleBackToMain} />;
      case 'settings':
        return <SettingsContent onBack={handleBackToMain} />;
      default:
        return (
          <MainMenuContent
            onDevicePreference={handleDevicePreference}
            onSettings={handleSettings}
            onUserProfile={handleUserProfile}
            onSession={handleSession}
            onLogOut={handleLogOut}
          />
        );
    }
  };

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-100 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Dynamic Content */}
          {renderSidebarContent()}
        </div>
      </aside>
    </>
  );
}