'use client';
import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import Sidebar from '@/components/sidebar';

// Type definitions
interface JobData {
  machine: string;
  product: string;
  state: string;
  stage: string;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

// Custom Dropdown Component
const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
  label, 
  value, 
  options, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: string): void => {
    onChange(option);
    setIsOpen(false);
  };

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 md:mb-6">
      <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={handleToggle}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <span className="text-gray-700 truncate max-w-[calc(100%-30px)]">{value}</span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-sm md:text-base"
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

export default function AddJobsForm() {
  const [selectedMachine, setSelectedMachine] = useState<string>('Cutting MC/1');
  const [selectedProduct, setSelectedProduct] = useState<string>('Product A');
  const [selectedState, setSelectedState] = useState<string>('ON');
  const [selectedStage, setSelectedStage] = useState<string>('Milling');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const machines: string[] = [
    'Cutting MC/1',
    'Milling 1',
    'Milling 2',
    'Drilling',
    'CNC Finished'
  ];


  const states: string[] = [
    'ON',
    'OFF',
  ];


  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = (): void => {
    setSidebarOpen(false);
  };

  const handleAddJob = (): void => {
    const jobData: JobData = {
      machine: selectedMachine,
      product: selectedProduct,
      state: selectedState,
      stage: selectedStage
    };
    console.log('Adding job:', jobData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleCloseSidebar} 
      />

      {/* Header */}
      <header className="bg-blue-700 shadow-sm px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <button 
          onClick={handleMenuClick}
          className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        
        <h1 className="text-lg md:text-xl font-semibold text-white text-center flex-grow">Add Jobs</h1>
        
        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-base md:text-lg">A</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 py-6 flex-grow">
        <div className="w-full max-w-md mx-auto">
          {/* Select Machine/Process */}
          <CustomDropdown
            label="Select Machine/Process"
            value={selectedMachine}
            options={machines}
            onChange={setSelectedMachine}
          />

          {/* Product */}
          <div className="mb-4 md:mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
              Product ID
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
              placeholder="A-1825"
            />
          </div>


          {/* State */}
          <CustomDropdown
            label="State"
            value={selectedState}
            options={states}
            onChange={setSelectedState}
          />

       

          {/* Add Button */}
          <div className="flex justify-center mt-6 md:mt-8">
            <button
              onClick={handleAddJob}
              className="w-full md:w-auto bg-white text-blue-700 px-6 md:px-8 py-3 rounded-full font-medium hover:bg-blue-700 hover:text-white transition-colors shadow-lg"
            >
              Add
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}