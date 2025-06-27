'use client';
import React, { useState, useMemo } from 'react';
import { Menu, X, Package, DollarSign, Calendar, Truck, Eye, Search } from 'lucide-react';
import Sidebar from '@/components/sidebarm';

// Interface for dispatched item data
interface DispatchedItem {
  id: number;
  productId: string;
  product: string;
  quantity: number;
  cost: number;
  date: string;
}

// Props interface for the Sidebar component (assuming it takes these props)
// (Removed unused SidebarProps interface)

export default function DispatchedPage(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<'today' | 'history'>('today');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Sample dispatched items data with proper typing
  const [dispatchedItems, setDispatchedItems] = useState<DispatchedItem[]>([
    { id: 1, productId: 'A001', product: 'Product A', quantity: 50, cost: 1000, date: '2025-10-05' },
    { id: 2, productId: 'B002', product: 'Product B', quantity: 75, cost: 1500, date: '2025-10-05' },
    { id: 3, productId: 'C003', product: 'Product C', quantity: 100, cost: 2000, date: '2025-09-30' },
    { id: 4, productId: 'D004', product: 'Product D', quantity: 25, cost: 500, date: '2025-09-29' },
    { id: 5, productId: 'E005', product: 'Product E', quantity: 150, cost: 3000, date: '2025-09-28' },
  ]);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  // Separate today's and history dispatches
  const todayDispatches = useMemo(() => {
    const today = getTodayDate();
    return dispatchedItems.filter(item => item.date === today);
  }, [dispatchedItems]);

  const historyDispatches = useMemo(() => {
    const today = getTodayDate();
    return dispatchedItems.filter(item => item.date !== today);
  }, [dispatchedItems]);

  // Calculate totals for today's dispatches
  const todayTotals = useMemo(() => {
    return {
      totalQuantity: todayDispatches.reduce((sum, item) => sum + item.quantity, 0),
      totalCost: todayDispatches.reduce((sum, item) => sum + item.cost, 0),
      totalProducts: new Set(todayDispatches.map(item => item.productId)).size
    };
  }, [todayDispatches]);

  // Calculate monthly dispatches
  const monthlyDispatches = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return dispatchedItems.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === currentMonth && 
             itemDate.getFullYear() === currentYear;
    });
  }, [dispatchedItems]);

  const monthlyTotals = useMemo(() => {
    return {
      totalQuantity: monthlyDispatches.reduce((sum, item) => sum + item.quantity, 0),
      totalCost: monthlyDispatches.reduce((sum, item) => sum + item.cost, 0),
      totalProducts: new Set(monthlyDispatches.map(item => item.productId)).size
    };
  }, [monthlyDispatches]);

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const renderDispatchedItems = (items: DispatchedItem[]) => {
    // Filter items based on search term
    const filteredItems = items.filter(item => 
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-4">
        {filteredItems.map((item) => (
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
                      <span>Product ID: {item.productId}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Qty: {item.quantity}
                </div>
                <div className="text-sm text-gray-500">
                  ${item.cost}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
          <h1 className="text-lg font-semibold text-gray-900">Dispatched</h1>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">A</span>
          </div>
        </div>
      </header>

      {/* Section Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveSection('today')}
          className={`flex-1 py-3 flex items-center justify-center ${
            activeSection === 'today' 
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Today's Dispatched
        </button>
        <button
          onClick={() => setActiveSection('history')}
          className={`flex-1 py-3 flex items-center justify-center ${
            activeSection === 'history' 
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Dispatched History
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dispatched items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              aria-label="Search dispatched items"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">
                  {activeSection === 'today' ? 'Today\'s' : 'Monthly'} Quantity
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {activeSection === 'today' 
                    ? todayTotals.totalQuantity 
                    : monthlyTotals.totalQuantity}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">
                  {activeSection === 'today' ? 'Today\'s' : 'Monthly'} Total
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ${activeSection === 'today' 
                    ? todayTotals.totalCost 
                    : monthlyTotals.totalCost}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dispatched Items List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              {activeSection === 'today' ? 'Today\'s Dispatches' : 'Dispatched History'}
            </h3>
            <span className="text-sm text-gray-500">
              {activeSection === 'today' 
                ? todayDispatches.length 
                : historyDispatches.length} items
            </span>
          </div>

          {activeSection === 'today' 
            ? renderDispatchedItems(todayDispatches)
            : renderDispatchedItems(historyDispatches)}
        </div>
      </main>
    </div>
  );
}