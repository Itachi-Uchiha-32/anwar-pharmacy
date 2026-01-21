"use client";
import React, { use } from "react";
import { CheckCircle, Printer, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "../../../../context/CartContext";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";


export default function OrderSuccess({ params }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 60; 
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-gray-800">
      <Navbar />
      <div className="pt-10 pb-12 max-w-[800px] mx-auto px-4 text-center">
        
        
        <div className="flex justify-center mb-3">
          <CheckCircle className="text-[#10B981]" size={48} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Thank you for your order!</h1>
        <p className="text-gray-700 text-sm mt-1">
          Your order <span className="font-bold text-gray-900">#INV-{orderId}</span> has been confirmed.
        </p>

        
        <div className="bg-white mt-8 p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
             <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Order Status</span>
             <span className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Confirmed</span>
          </div>
          <div className="relative px-4">
             <div className="absolute top-2 left-4 right-4 h-[3px] bg-gray-100 z-0 rounded-full"></div>
             <div className="absolute top-2 left-4 w-1/4 h-[3px] bg-[#10B981] z-0 rounded-full"></div>
             <div className="flex justify-between relative z-10">
               {["Confirmed", "Processing", "Shipped", "Delivered"].map((step, i) => (
                 <div key={step} className="flex flex-col items-center gap-3">
                   <div className={`w-4 h-4 rounded-full border-[3px] border-white shadow-sm ${i === 0 ? "bg-[#10B981]" : "bg-gray-200"}`}></div>
                   <span className={`text-[10px] font-bold ${i === 0 ? "text-gray-700" : "text-gray-400"}`}>{step}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        
        <div className="bg-white mt-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Order Details</h3>
            <p className="text-[10px] text-gray-600 font-medium mt-0.5">Order #INV-{orderId}</p>
          </div>
          
          <div className="divide-y divide-gray-50 px-6">
            {cartItems.map((item) => (
              <div key={item.id} className="py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl p-1.5 flex items-center justify-center">
                    <img src={item.image} alt="" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-bold text-gray-800 leading-snug">{item.name}</p>
                    <p className="text-[11px] text-gray-600 font-bold uppercase tracking-tight">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-[13px] font-black text-gray-800">৳{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-left">
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h4 className="font-bold text-[10px] text-gray-700 uppercase border-b border-gray-50 pb-3 mb-4 tracking-widest">Shipping Information</h4>
             <p className="text-[13px] font-bold text-gray-800 mb-1">Case On Delivery</p>
             <p className="text-[12px] text-gray-700 font-medium leading-relaxed">153 North Bashbao Dhaka</p>
           </div>
           
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h4 className="font-bold text-[10px] text-gray-700 uppercase border-b border-gray-50 pb-3 mb-4 tracking-widest">Payment Information</h4>
             <div className="space-y-2.5 text-[13px]">
               <div className="flex justify-between text-gray-700 font-bold"><span>Subtotal</span><span className="text-gray-800">৳{subtotal.toFixed(2)}</span></div>
               <div className="flex justify-between text-gray-700 font-bold"><span>Shipping</span><span className="text-gray-800">৳{deliveryFee.toFixed(2)}</span></div>
               <div className="flex justify-between border-t border-gray-50 pt-3 font-black text-gray-900 text-sm">
                 <span>Total</span>
                 <span className="text-[#10B981]">৳{total.toFixed(2)}</span>
               </div>
             </div>
           </div>
        </div>

        
        <div className="flex gap-4 justify-center mt-10">
          <Link href="/" className="bg-[#10B981] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 text-[12px] uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-50 transition-all active:scale-95">
            <ShoppingBag size={16} /> Continue Shopping
          </Link>
          <button onClick={() => window.print()} className="bg-[#4F46E5] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 text-[12px] uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-50 transition-all active:scale-95">
            <Printer size={16} /> Print
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}