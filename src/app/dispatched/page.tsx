'use client';
import React, { useState } from 'react';
import { Menu, X, Package, DollarSign, Calendar, Truck, Eye, Search } from 'lucide-react';
import Sidebar from '@/components/sidebarm';

// Interface for dispatched item data
interface DispatchedItem {
  id: number;
  product: string;
  quantity: number;
  cost: number;
  date: string;
}

// Props interface for the Sidebar component (assuming it takes these props)
// (Removed unused SidebarProps interface)

export default function DispatchedPage(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(true);

  // Sample dispatched items data with proper typing
  const dispatchedItems: DispatchedItem[] = [
    { id: 1, product: 'Product A', quantity: 50, cost: 1000, date: '5 Oct 2025' },
    { id: 2, product: 'Product B', quantity: 75, cost: 1500, date: '4 Oct 2025' },
    { id: 3, product: 'Product C', quantity: 100, cost: 2000, date: '3 Oct 2025' },
    { id: 4, product: 'Product D', quantity: 25, cost: 500, date: '2 Oct 2025' },
    { id: 5, product: 'Product E', quantity: 150, cost: 3000, date: '1 Oct 2025' },
    { id: 6, product: 'Product F', quantity: 100, cost: 2000, date: '30 Sep 2025' }
  ];

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const handleCloseSummary = (): void => {
    setShowSummary(false);
  };

  // Calculate totals with proper typing
  const totalDispatched: number = dispatchedItems.reduce((sum: number, item: DispatchedItem) => sum + item.quantity, 0);
  const totalCost: number = dispatchedItems.reduce((sum: number, item: DispatchedItem) => sum + item.cost, 0);
  const lastDispatchDate: string = dispatchedItems[0]?.date || 'N/A';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg"
            type="button"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dispatched...</h1>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">A</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        {/* Dispatched Summary Card */}
        {showSummary && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                DISPATCHED SUMMARY
              </h2>
              <button
                onClick={handleCloseSummary}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-800 text-white text-xs rounded-md hover:bg-gray-700 transition-colors"
                type="button"
                aria-label="Close summary"
              >
                <span>Close</span>
                <X className="w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Total Dispatched:</span>
                <span className="text-sm font-medium text-gray-900">{totalDispatched}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Cost of dispatch:</span>
                <span className="text-sm font-medium text-gray-900">${totalCost}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Dispatched Date:</span>
                <span className="text-sm font-medium text-gray-900">{lastDispatchDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dispatched items..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              aria-label="Search dispatched items"
            />
          </div>
        </div>

        {/* Dispatched Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Recent Dispatches</h3>
            <span className="text-sm text-gray-500">{dispatchedItems.length} items</span>
          </div>

          {dispatchedItems.map((item: DispatchedItem) => (
            <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.product}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <Package className="w-3 h-3" />
                        <span>Qty: {item.quantity}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">${item.cost}</div>
                  <button 
                    className="mt-1 p-1 hover:bg-gray-100 rounded"
                    type="button"
                    aria-label={`View details for ${item.product}`}
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">This Week</p>
                <p className="text-lg font-bold text-gray-900">250</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Value</p>
                <p className="text-lg font-bold text-gray-900">${totalCost}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Show Summary Toggle */}
        {!showSummary && (
          <div className="mt-6">
            <button
              onClick={() => setShowSummary(true)}
              className="w-full py-3 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              type="button"
            >
              Show Dispatch Summary
            </button>
          </div>
        )}
      </main>
    </div>
  );
}