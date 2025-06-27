'use client';
import React, { useState } from 'react';
import { Menu, Clock, Trash2, Check, X } from 'lucide-react';
import Sidebar from '@/components/sidebar';

interface Product {
  id: number;
  name: string;
  process: string;
  status: string;
}

export default function ProductListPage(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Product A",
      process: "Milling",
      status: "active"
    },
    {
      id: 2,
      name: "Product B",
      process: "Cutting",
      status: "active"
    },
    {
      id: 3,
      name: "Product C",
      process: "Milling",
      status: "active"
    },
    {
      id: 4,
      name: "Product D",
      process: "Milling",
      status: "active"
    },
    {
      id: 5,
      name: "Product E",
      process: "Drilling",
      status: "active"
    }
  ]);
  const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false);

  const handleMenuClick = (): void => {
    setSidebarOpen(true);
  };

  const handleProductClick = (product: Product): void => {
    console.log('Product clicked:', product);
    // Navigate to product details or perform action
  };

  const handleClearProducts = (): void => {
    setIsConfirmingClear(true);
  };

  const confirmClearProducts = (): void => {
    setProducts([]);
    setIsConfirmingClear(false);
  };

  const cancelClearProducts = (): void => {
    setIsConfirmingClear(false);
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
        
        <h1 className="text-xl font-semibold text-blue-700">Recently Added</h1>
        
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-lg">A</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Clear Button with Confirmation */}
          {products.length > 0 && (
            <div className="mb-4 flex justify-end items-center space-x-3">
              {isConfirmingClear ? (
                <>
                  <span className="text-sm text-gray-600">Confirm clear all?</span>
                  <button
                    onClick={confirmClearProducts}
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={cancelClearProducts}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleClearProducts}
                  className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </button>
              )}
            </div>
          )}

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
                      <span className="text-gray-500 text-sm">On:</span>
                      <span className="text-gray-600 text-sm font-medium">
                        {product.process}
                      </span>
                    </div>
                  </div>

                  {/* Process Icon */}
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

          {/* Summary Stats */}
          {products.length > 0 && (
            <div className="mt-8 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {products.length}
                </div>
                <div className="text-gray-500 text-sm">
                  Total Products
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {products.filter((p: Product) => p.process === 'Milling').length}
                  </div>
                  <div className="text-xs text-gray-500">Milling</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {products.filter((p: Product) => p.process === 'Cutting').length}
                  </div>
                  <div className="text-xs text-gray-500">Cutting</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">
                    {products.filter((p: Product) => p.process === 'Drilling').length}
                  </div>
                  <div className="text-xs text-gray-500">Drilling</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}