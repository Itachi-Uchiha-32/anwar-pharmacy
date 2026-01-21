"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  
  const handleAddToCart = () => {
    
    addToCart(product, qty);
  };

  const handleWhatsApp = () => {
    const message = `Hello Anwar Pharmacy, I am interested in: ${product.name}. Quantity: ${qty}`;
    window.open(`https://wa.me/01533303708?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCall = () => {
    window.open("tel:01533303708");
  };

  return (
    <div className="space-y-4">
      {/* Quantity & Buy Row - Matches Screenshot 1 */}
      <div className="flex items-center gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-200 rounded-lg h-11 px-2 bg-white shadow-sm">
          <button 
            onClick={() => setQty(Math.max(1, qty - 1))} 
            className="px-2 text-gray-500 font-bold hover:text-[#10B981] transition-colors"
          >
            −
          </button>
          <input 
            type="text" 
            value={qty} 
            readOnly 
            className="w-8 text-center text-sm font-bold text-gray-800 outline-none" 
          />
          <button 
            onClick={() => setQty(qty + 1)} 
            className="px-2 text-gray-500 font-bold hover:text-[#10B981] transition-colors"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-[#10B981] hover:bg-emerald-600 text-white h-11 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          🛒 যোগ করুন
        </button>

        {/* Order Now Button */}
        <button className="bg-[#F97316] hover:bg-orange-600 text-white px-6 h-11 rounded-lg font-bold text-sm transition-all active:scale-95">
          অর্ডার করুন
        </button>
      </div>

      {/* Contact Row - WhatsApp and Call */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={handleWhatsApp}
          className="bg-[#065F46] hover:bg-emerald-900 text-white py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          💬 হোয়াটসঅ্যাপ অর্ডার
        </button>
        <button 
          onClick={handleCall}
          className="bg-[#701A75] hover:bg-purple-900 text-white py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          📞 কলে অর্ডার করুন
        </button>
      </div>

      {/* Utility Actions - Heart and Share */}
      <div className="flex justify-end gap-3 pt-2">
        <button className="p-2 border border-gray-200 rounded-full text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="p-2 border border-gray-200 rounded-full text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
}