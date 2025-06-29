'use client';
import React, { useState } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';
import Sidebar from '@/components/sidebarm';

// Type definitions
interface Machine {
  id: number;
  name: string;
  status: 'ON' | 'OFF';
  statusColor: string;
}

interface Product {
  id: string;
  name: string;
  operation: string;
  date: string;
  expiryDate?: string; // Optional field to track product lifecycle
}

type ViewType = 'machine' | 'product' | 'details';
type FilterType = 'Machine/Process No' | 'Product Type';

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}


export default function WorkPanelInterface() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'live' | 'past'>('live');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('Machine/Process No');

  const filterOptions: FilterType[] = [
    'Machine/Process No',
    'Product Type',
  ];

  // Machine/Process data
  const machineData: Machine[] = [
    { id: 1, name: 'Cutting MC/1', status: 'ON', statusColor: 'green' },
    { id: 2, name: 'Milling 1', status: 'OFF', statusColor: 'gray' },
    { id: 3, name: 'Milling 2', status: 'ON', statusColor: 'green' },
    { id: 4, name: 'Drilling', status: 'OFF', statusColor: 'gray' },
    { id: 5, name: 'CNC Finish', status: 'ON', statusColor: 'green' }
  ];

  // Product data with expiry dates
  const [productData, setProductData] = useState<Product[]>([
    { 
      id: 'A', 
      name: 'Product A', 
      operation: 'Milling', 
      date: '15/06/2025',
      expiryDate: '20/06/2025' // Example expiry date
    },
    { 
      id: 'B', 
      name: 'Product B', 
      operation: 'Cutting', 
      date: '14/06/2025',
      expiryDate: '19/06/2025' // Example expiry date
    },
    { 
      id: 'C', 
      name: 'Product C', 
      operation: 'Drilling', 
      date: '13/06/2025',
      expiryDate: '18/06/2025' // Example expiry date
    },
    { 
      id: 'D', 
      name: 'Product D', 
      operation: 'Milling', 
      date: '12/06/2025',
      expiryDate: '17/06/2025' // Example expiry date
    },
    { 
      id: 'E', 
      name: 'Product E', 
      operation: 'Finishing', 
      date: '11/06/2025',
      expiryDate: '16/06/2025' // Example expiry date
    }
  ]);

  // Function to parse date string to Date object
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Separate live and past products
  const getLiveProducts = (): Product[] => {
    const today = new Date();
    return productData.filter(product => {
      if (!product.expiryDate) return true;
      const expiryDate = parseDate(product.expiryDate);
      return expiryDate >= today;
    });
  };

  const getPastProducts = (): Product[] => {
    const today = new Date();
    return productData.filter(product => {
      if (!product.expiryDate) return false;
      const expiryDate = parseDate(product.expiryDate);
      return expiryDate < today;
    });
  };

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const getStatusColor = (status: Machine['status']): string => {
    switch (status) {
      case 'ON': return 'text-green-600';
      case 'OFF': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusDotColor = (status: Machine['status']): string => {
    switch (status) {
      case 'ON': return 'bg-green-500';
      case 'OFF': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const handleMachineClick = (machine: Machine): void => {
    console.log('Machine clicked:', machine);
  };

  const handleSeeDetails = (product: Product): void => {
    setSelectedProduct(product);
  };

  const handleClose = (): void => {
    setSelectedProduct(null);
  };

  const CustomDropdown = ({ label, value, options, onChange }: CustomDropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3 text-sm">
          {label}
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <span className="text-gray-700 text-sm">{value}</span>
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 text-sm first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMachineView = () => (
    <div className="space-y-4">
      {machineData.map((machine) => (
        <button
          key={machine.id}
          onClick={() => handleMachineClick(machine)}
          className="w-full bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all text-left"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className={`w-3 h-3 rounded-full ${getStatusDotColor(machine.status)}`}></div>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 font-medium text-base mb-1">
                {machine.name}
              </h3>
              <p className={`text-sm font-medium ${getStatusColor(machine.status)}`}>
                {machine.status}
              </p>
            </div>
          </div>
        </button>
      ))}
      
      {/* Status Overview */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-800 font-medium mb-6">Status Overview</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {machineData.filter(m => m.status === 'ON').length}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-500 mb-2">
              {machineData.filter(m => m.status === 'OFF').length}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
              Offline
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductList = (products: Product[]) => (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div>
                <h3 className="text-gray-900 font-medium text-base mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500">On: {product.operation}</p>
                <p className="text-xs text-gray-400">Date: {product.date}</p>
              </div>
            </div>
            <button
              onClick={() => handleSeeDetails(product)}
              className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
            >
              See Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDetailsView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <h1 className="text-2xl font-bold text-gray-900">{selectedProduct?.name}</h1>
        </div>
        <button
          onClick={handleClose}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <span>Close</span>
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date : DD/MM/YY</label>
          <div className="text-gray-900 text-lg">{selectedProduct?.date}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operation</label>
          <div className="text-gray-900 text-lg">{selectedProduct?.operation}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            Active
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Machine Assignment</label>
          <div className="text-gray-900 text-lg">Machine #{selectedProduct?.id}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Progress</label>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full" style={{width: '75%'}}></div>
          </div>
          <div className="text-sm text-gray-600 mt-2">75% Complete</div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (selectedProduct) return renderDetailsView();
    if (selectedFilter === 'Product Type') return renderProductList(productData);
    return renderMachineView();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Header */}
      <header className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-blue-700" />
        </button>
        
        <h1 className="text-xl font-semibold text-blue-700">Work Panel</h1>
        
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-lg">A</span>
        </div>
      </header>

      {/* Section Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setCurrentView('live')}
          className={`flex-1 py-3 flex items-center justify-center ${
            currentView === 'live' 
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Live Products
        </button>
        <button
          onClick={() => setCurrentView('past')}
          className={`flex-1 py-3 flex items-center justify-center ${
            currentView === 'past' 
              ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Past Products
        </button>
      </div>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {selectedProduct ? (
            renderDetailsView()
          ) : (
            <>
              {currentView === 'live' ? (
                getLiveProducts().length > 0 ? (
                  renderProductList(getLiveProducts())
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-2xl">🏁</span>
                    </div>
                    <h3 className="text-gray-500 font-medium mb-2">No Live Products</h3>
                    <p className="text-gray-400 text-sm">
                      All products have completed their lifecycle
                    </p>
                  </div>
                )
              ) : (
                getPastProducts().length > 0 ? (
                  renderProductList(getPastProducts())
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-2xl">📦</span>
                    </div>
                    <h3 className="text-gray-500 font-medium mb-2">No Past Products</h3>
                    <p className="text-gray-400 text-sm">
                      No completed products found
                    </p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}