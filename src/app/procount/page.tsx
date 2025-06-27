'use client';
import React, { useState } from 'react';
import { Menu, Clock } from 'lucide-react';
import Sidebar from '@/components/sidebar';

interface Product {
  id: number;
  name: string;
  count: number;
  status: string;
}

export default function ProductListPage(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  // Sample products data
  const products: Product[] = [
    {
      id: 1,
      name: "Product A",
      count: 400,
      status: "active"
    },
    {
      id: 2,
      name: "Product B",
      count: 600,
      status: "active"
    },
    {
      id: 3,
      name: "Product C",
      count: 500,
      status: "active"
    },
    {
      id: 4,
      name: "Product D",
      count: 100,
      status: "active"
    },
    {
      id: 5,
      name: "Product E",
      count: 250,
      status: "active"
    }
  ];

  const handleProductClick = (product: Product): void => {
    console.log('Product clicked:', product);
    // Navigate to product details or perform action
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
        
        <h1 className="text-xl font-semibold text-blue-700">Product History</h1>
        
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-lg">A</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Product List */}
          <div className="space-y-3">
            {products.map((product: Product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="w-full bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all text-left"
              >
                <div className="flex items-center space-x-3">
                  {/* Status Icon */}
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-medium text-base mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-500 text-sm">Total Selected Times: </span>
                      <span className="text-gray-600 text-sm font-medium">
                        {product.count}
                      </span>
                    </div>
                  </div>

                  {/* count Icon */}
                  <div className="flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State (if no products) */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📦</span>
              </div>
              <h3 className="text-gray-500 font-medium mb-2">No products found</h3>
              <p className="text-gray-400 text-sm">
                Add products to see them listed here
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}