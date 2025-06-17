'use client';
import React, { useState } from 'react';
import { Menu, Download, ChevronDown } from 'lucide-react';
import Sidebar from '@/components/sidebarm';

// Type definitions
type ReportType = 'Product Wise' | 'Machine Wise' | 'Date Wise' | 'Operator Wise' | 'Status Wise' | 'Department Wise';

interface CustomDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('Product Wise');
  const [reportTypeDropdownOpen, setReportTypeDropdownOpen] = useState<boolean>(false);

  const reportTypes: ReportType[] = [
    'Product Wise',
    'Machine Wise',
    'Date Wise',
    'Operator Wise',
    'Status Wise',
    'Department Wise'
  ];

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const handleDownload = (): void => {
    // Handle download logic here
    console.log('Downloading report:', selectedReportType);
    // You can add actual download functionality here
  };

  const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
    value, 
    options, 
    onChange, 
    isOpen, 
    setIsOpen 
  }) => {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
            {options.map((option: string, index: number) => (
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
          >
            <Menu className="w-6 h-6 text-blue-700" />
          </button>
          <h1 className="text-lg font-semibold text-blue-700">Reports</h1>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">A</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Download Reports Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Download className="w-5 h-5 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900 uppercase tracking-wide">
                Download Reports
              </h2>
            </div>

            {/* Daily Reports Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Daily Reports</h3>
              
              <div className="space-y-4">
                <CustomDropdown
                  value={selectedReportType}
                  options={reportTypes}
                  onChange={(value: string) => setSelectedReportType(value as ReportType)}
                  isOpen={reportTypeDropdownOpen}
                  setIsOpen={setReportTypeDropdownOpen}
                />

                <button
                  onClick={handleDownload}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Additional Report Options */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Weekly Reports</h3>
              <button
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Generate Weekly Report
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Monthly Reports</h3>
              <button
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Generate Monthly Report
              </button>
            </div>
          </div>

          {/* Recent Downloads */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Downloads</h3>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Product Wise Report</p>
                    <p className="text-xs text-gray-500">Downloaded 2 hours ago</p>
                  </div>
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Machine Wise Report</p>
                    <p className="text-xs text-gray-500">Downloaded yesterday</p>
                  </div>
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}