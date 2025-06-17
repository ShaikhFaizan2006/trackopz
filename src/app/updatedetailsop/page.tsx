'use client';
import React, { useState } from 'react';
import { Menu, ChevronDown, Check } from 'lucide-react';
import Sidebar from '@/components/sidebar';

// Type definitions
type Product = 'Product A' | 'Product B' | 'Product C' | 'Product D' | 'Product E';
type DispatchStatus = 'Dispatched' | 'Pending' | 'In Transit';
type ProcessStepKey = 'deburring' | 'finalInspect' | 'oiling';

interface ProcessSteps {
  deburring: boolean;
  finalInspect: boolean;
  oiling: boolean;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

interface ProcessCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

interface UpdateData {
  product: Product;
  processSteps: ProcessSteps;
  dispatchStatus: DispatchStatus;
}

export default function UpdateDetailsPage(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>('Product A');
  const [selectedDispatchStatus, setSelectedDispatchStatus] = useState<DispatchStatus>('Dispatched');
  const [processSteps, setProcessSteps] = useState<ProcessSteps>({
    deburring: true,
    finalInspect: true,
    oiling: true
  });

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const products: Product[] = [
    'Product A',
    'Product B',
    'Product C',
    'Product D',
    'Product E'
  ];

  const dispatchStatuses: DispatchStatus[] = [
    'Dispatched',
    'Pending',
    'In Transit',
  ];

  const handleProcessStepChange = (step: ProcessStepKey): void => {
    setProcessSteps(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  const handleUpdate = (): void => {
    const updateData: UpdateData = {
      product: selectedProduct,
      processSteps: processSteps,
      dispatchStatus: selectedDispatchStatus
    };
    console.log('Updating details:', updateData);
    // Here you would typically send the data to your backend
  };

  const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
    label, 
    value, 
    options, 
    onChange 
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <span className="text-gray-700">{value}</span>
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
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
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

  const ProcessCheckbox: React.FC<ProcessCheckboxProps> = ({ 
    label, 
    checked, 
    onChange 
  }) => {
    return (
      <div className="bg-blue-50 rounded-lg p-4 mb-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-gray-700 font-medium">{label}</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              checked 
                ? 'bg-blue-700 border-blue-700' 
                : 'bg-white border-gray-300 hover:border-gray-400'
            }`}>
              {checked && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
          </div>
        </label>
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
      <header className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <button 
          onClick={handleMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-blue-700" />
        </button>
        
        <h1 className="text-xl font-semibold text-blue-700">Update Details</h1>
        
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-lg">A</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Finished Status */}
          <CustomDropdown
            label="Finished Status"
            value={selectedProduct}
            options={products}
            onChange={(value: string) => setSelectedProduct(value as Product)}
          />

          {/* Process Steps */}
          <div className="mb-6">
            <ProcessCheckbox
              label="Deburring"
              checked={processSteps.deburring}
              onChange={() => handleProcessStepChange('deburring')}
            />
            <ProcessCheckbox
              label="Final Inspect"
              checked={processSteps.finalInspect}
              onChange={() => handleProcessStepChange('finalInspect')}
            />
            <ProcessCheckbox
              label="Oiling"
              checked={processSteps.oiling}
              onChange={() => handleProcessStepChange('oiling')}
            />
          </div>

          {/* Dispatch Status */}
          <CustomDropdown
            label="Dispatch Status"
            value={selectedDispatchStatus}
            options={dispatchStatuses}
            onChange={(value: string) => setSelectedDispatchStatus(value as DispatchStatus)}
          />

          {/* Update Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleUpdate}
              className="bg-white text-blue-700 px-8 py-3 rounded-full font-medium hover:bg-blue-700 hover:text-white transition-colors shadow-lg"
            >
              Update
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}