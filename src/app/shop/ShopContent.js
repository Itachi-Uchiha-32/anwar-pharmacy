"use client";
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ShopContent({ initialProducts, initialCategories }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Filter Logic
  const filteredProducts = initialProducts.filter((product) => {
    const price = product.salePrice || 0;
    const matchesPrice = 
      (minPrice === "" || price >= Number(minPrice)) &&
      (maxPrice === "" || price <= Number(maxPrice));
    
    const matchesCategory = 
      selectedCategories.length === 0 || 
      (product.category && selectedCategories.some(cat => product.category.includes(cat)));

    return matchesPrice && matchesCategory;
  });

  const handleClearPrice = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <main className="max-w-[1300px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR: Matches Screenshot with Price, Category, and Subcategory */}
        <aside className="lg:w-1/4 space-y-6">
          
          {/* 1. NEW: Filter by Price Section */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Filter by Price</h3>
            <div className="flex gap-2 mb-4">
              <input 
                type="number" 
                placeholder="Min" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#10B981]"
              />
              <input 
                type="number" 
                placeholder="Max" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#10B981]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className="bg-[#10B981] text-white py-2 rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors"
              >
                Apply
              </button>
              <button 
                onClick={handleClearPrice}
                className="bg-gray-400 text-white py-2 rounded-lg text-xs font-bold hover:bg-gray-500 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* 2. Filter by Category Section */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Filter by Category</h3>
            <div className="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar">
              {initialCategories.map((cat) => (
                <div key={cat._id} className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id={`cat-${cat._id}`}
                    onChange={() => {
                      setSelectedCategories(prev => 
                        prev.includes(cat.parentCategory) 
                          ? prev.filter(c => c !== cat.parentCategory) 
                          : [...prev, cat.parentCategory]
                      )
                    }}
                    className="w-4 h-4 accent-[#10B981] cursor-pointer"
                  />
                  <label htmlFor={`cat-${cat._id}`} className="text-sm text-gray-600 cursor-pointer hover:text-[#10B981]">
                    {cat.parentCategory}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Filter by Subcategory Section */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Filter by Subcategory</h3>
            <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
              {initialCategories.map((cat) => 
                cat.subCategory?.map((sub) => (
                  <div key={sub._id} className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id={`sub-${sub._id}`}
                      className="w-4 h-4 accent-[#10B981] cursor-pointer"
                    />
                    <label htmlFor={`sub-${sub._id}`} className="text-sm text-gray-600 cursor-pointer hover:text-[#10B981]">
                      {sub.title}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID SECTION */}
        <section className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <h2 className="text-sm font-bold text-gray-700">Total {filteredProducts.length} items Found</h2>
             <div className="flex items-center gap-2">
               <span className="text-xs text-gray-500">Sort by:</span>
               <select className="border-none bg-gray-50 rounded-lg p-2 text-xs font-semibold outline-none text-gray-700 cursor-pointer">
                  <option>Sort By Price</option>
                  <option>Newest First</option>
               </select>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}