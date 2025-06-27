'use client';
import React, { useState, useEffect } from 'react';
import { Menu, Clock, Archive } from 'lucide-react';
import Sidebar from '@/components/sidebar';

// Type definitions
interface Alert {
  id: number;
  name: string;
  message: string;
  avatar: string;
  timestamp: string;
  date: Date;
}

export default function SeeAlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<'today' | 'past'>('today');
  const [todaysAlerts, setTodaysAlerts] = useState<Alert[]>([]);
  const [pastAlerts, setPastAlerts] = useState<Alert[]>([]);

  // Sample alerts data with dates
  const initialAlerts: Alert[] = [
    {
      id: 1,
      name: "Mr.Manager",
      message: "Machine 1 is under maintenance",
      avatar: "/api/placeholder/40/40",
      timestamp: "2 hours ago",
      date: new Date() // Today's date
    },
    {
      id: 2,
      name: "Mr.john Doe",
      message: "Product A is not available in enough qty",
      avatar: "/api/placeholder/40/40",
      timestamp: "4 hours ago",
      date: new Date() // Today's date
    },
    {
      id: 3,
      name: "Supervisor",
      message: "Inventory check required",
      avatar: "/api/placeholder/40/40",
      timestamp: "Yesterday at 3 PM",
      date: new Date(Date.now() - 86400000) // Yesterday's date
    }
  ];

  useEffect(() => {
    // Separate alerts into today's and past alerts
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAlerts = initialAlerts.filter(alert => 
      alert.date.toDateString() === today.toDateString()
    );

    const pastAlertsList = initialAlerts.filter(alert => 
      alert.date.toDateString() !== today.toDateString()
    );

    setTodaysAlerts(todayAlerts);
    setPastAlerts(pastAlertsList);
  }, []);

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = (): void => {
    setSidebarOpen(false);
  };

  const getInitials = (name: string): string => {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  };

  const handleLoadMore = (): void => {
    console.log('Load more alerts clicked');
  };

  const renderAlertList = (alerts: Alert[]) => (
    alerts.map((alert: Alert) => (
      <div 
        key={alert.id}
        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-700 font-medium text-xs md:text-sm">
              {getInitials(alert.name)}
            </span>
          </div>
          
          {/* Alert Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-gray-900 font-medium text-xs md:text-sm truncate max-w-[calc(100%-80px)]">
                {alert.name}
              </h3>
              <span className="text-[10px] md:text-xs text-gray-500">
                {alert.timestamp}
              </span>
            </div>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              {alert.message}
            </p>
          </div>
        </div>
      </div>
    ))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleCloseSidebar} 
      />

      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <button 
          onClick={handleMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-blue-700" />
        </button>
        
        <h1 className="text-lg md:text-xl font-semibold text-blue-700 text-center flex-grow">See Alerts</h1>
        
        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-base md:text-lg">A</span>
        </div>
      </header>

      {/* Alert Section Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveSection('today')}
          className={`flex-1 py-3 flex items-center justify-center ${
            activeSection === 'today' 
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-4 h-4 mr-2" />
          Today's Alerts
        </button>
        <button
          onClick={() => setActiveSection('past')}
          className={`flex-1 py-3 flex items-center justify-center ${
            activeSection === 'past' 
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Archive className="w-4 h-4 mr-2" />
          Past Alerts
        </button>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 flex-grow">
        <div className="w-full max-w-md mx-auto space-y-4">
          {activeSection === 'today' ? (
            todaysAlerts.length > 0 ? (
              renderAlertList(todaysAlerts)
            ) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-xl md:text-2xl">🔔</span>
                </div>
                <h3 className="text-gray-500 font-medium text-sm md:text-base mb-2">No today's alerts</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  All systems are running smoothly
                </p>
              </div>
            )
          ) : (
            pastAlerts.length > 0 ? (
              renderAlertList(pastAlerts)
            ) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-xl md:text-2xl">🗄️</span>
                </div>
                <h3 className="text-gray-500 font-medium text-sm md:text-base mb-2">No past alerts</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  No historical alerts found
                </p>
              </div>
            )
          )}

          {/* Load More Button (if needed) */}
          {(activeSection === 'today' ? todaysAlerts : pastAlerts).length > 0 && (
            <div className="text-center pt-4">
              <button 
                onClick={handleLoadMore}
                className="text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm"
              >
                Load more alerts
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}