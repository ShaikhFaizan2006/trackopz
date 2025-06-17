'use client';
import React, { useState } from 'react';
import { Menu, Edit, Bell, Filter, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebarm';

// Interface for Next.js router
interface NextRouter {
  push: (url: string) => void;
  // Add other router methods if needed
}

export default function MobileInterface(): React.ReactElement {
  const [alertCount] = useState<number>(2);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter() as NextRouter;

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const handleAddJob = (): void => {
    console.log('Add Job clicked');
    router.push('/workpanel');
  };

  const handleSeeAlerts = (): void => {
    console.log('See Alerts clicked');
    router.push('/sendalerts');
  };

  const handleProductList = (): void => {
    console.log('Product List clicked');
    router.push('/reports');
  };

  const handleProductCount = (): void => {
    console.log('Product Count clicked');
  };

  const handleUpdateDetails = (): void => {
    console.log('Update Details clicked');
    router.push('/dispatched');
  };

  // Removed unused handleCloseSidebar and handleUserProfile

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <button 
          onClick={handleMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          type="button"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-blue-700" />
        </button>
        
        <h1 className="text-xl font-semibold text-blue-700">Admin (Manager Login)</h1>
        
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-lg">A</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-50 py-8">
        {/* Top Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Work Panel */}
          <button 
            onClick={handleAddJob}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100"
            type="button"
            aria-label="Access work panel"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium text-center">Work Panel</span>
          </button>

          {/* Send Alerts */}
          <button 
            onClick={handleSeeAlerts}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100 relative"
            type="button"
            aria-label={`Send alerts (${alertCount} pending)`}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center relative">
              <Bell className="w-6 h-6 text-blue-600" />
              {alertCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{alertCount}</span>
                </div>
              )}
            </div>
            <span className="text-gray-700 font-medium text-center">Send Alerts</span>
          </button>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Reports */}
          <button 
            onClick={handleProductList}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100"
            type="button"
            aria-label="View reports"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Filter className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium text-center">Reports</span>
          </button>

          {/* Pending/In transit */}
          <button 
            onClick={handleProductCount}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100"
            type="button"
            aria-label="View pending and in transit items"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium text-center">Pending/In transit</span>
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-center">
          <button 
            onClick={handleUpdateDetails}
            className="bg-white rounded-xl px-50 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100 w-40"
            type="button"
            aria-label="View dispatched details"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium text-center">Dispatched Details</span>
          </button>
        </div>
      </main>
    </div>
  );
}