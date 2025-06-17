'use client';
import React, { useState } from 'react';
import { Menu, Edit, Bell, Filter, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';

export default function MobileInterface(): React.ReactElement {
  const [alertCount] = useState<number>(2);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const handleAddJob = (): void => {
    router.push('/addjobs');
  };

  const handleSeeAlerts = (): void => {
    router.push('/alerts');
    console.log('See Alerts clicked');
  };

  const handleProductList = (): void => {
    router.push('/productlist');
    console.log('Product List clicked');
  };

  const handleProductCount = (): void => {
    router.push('/procount');
    console.log('Product Count clicked');
  };

  const handleUpdateDetails = (): void => {
    router.push('/updatedetailsop');
    console.log('Update Details clicked');
  };

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
        
        <h1 className="text-xl font-semibold text-blue-700">Operator Panel</h1>
        
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-lg">A</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-50 py-8">
        {/* Top Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Add Job */}
          <button 
            onClick={handleAddJob}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100"
            type="button"
            aria-label="Add new job"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium text-center">Add Job</span>
          </button>

          {/* See Alerts */}
          <button 
            onClick={handleSeeAlerts}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100 relative"
            type="button"
            aria-label={`View alerts (${alertCount} new)`}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center relative">
              <Bell className="w-6 h-6 text-blue-600" />
              {alertCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{alertCount}</span>
                </div>
              )}
            </div>
            <span className="text-gray-700 font-medium text-center">See Alerts!</span>
          </button>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Product List */}
          <button 
            onClick={handleProductList}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100"
            type="button"
            aria-label="View product list"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Filter className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium text-center">Product List</span>
          </button>

          {/* Product Count */}
          <button 
            onClick={handleProductCount}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100"
            type="button"
            aria-label="View product count"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium text-center">Product Count</span>
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-center">
          <button 
            onClick={handleUpdateDetails}
            className="bg-white rounded-xl px-50 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 border border-gray-100 w-40"
            type="button"
            aria-label="Update details"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-gray-700 font-medium text-center">Update Details</span>
          </button>
        </div>
      </main>
    </div>
  );
}