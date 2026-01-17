"use client";
import React, { useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import ProductCard from "../../../components/ProductCard";
import { products } from "../../../data/products";




export default function ShopPage() {
  const [filterCategory, setFilterCategory] = useState("");

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-4 md:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
         
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-4 border-b pb-2">Filter by Price</h3>
              <div className="flex gap-2 mb-4">
                <input type="number" placeholder="Min" className="text-gray-700 w-full p-2 border rounded-md text-xs outline-none" />
                <input type="number" placeholder="Max" className="text-gray-700 w-full p-2 border rounded-md text-xs outline-none" />
              </div>
              <button className="w-full bg-[#10B981] text-white py-2 rounded-md text-xs font-bold">Apply</button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-4 border-b pb-2">Filter by Category</h3>
              <div className="space-y-3">
                {["Tablets & Pills", "Syrup", "Device", "Skin Care"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-[#10B981]" />
                    <span className="text-xs font-medium text-gray-600 group-hover:text-[#10B981]">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

         
          <section className="lg:w-3/4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-gray-700">Total {products.length} items Found</h2>
              <select className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg p-2 outline-none">
                <option>Sort By Price</option>
                <option>Price: Low to High</option>
              </select>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}