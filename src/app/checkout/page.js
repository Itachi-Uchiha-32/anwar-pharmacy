"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "Inside Dhaka City (ঢাকা সিটির ভেতর)",
    address: "",
    note: ""
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = formData.area.includes("Inside") ? 60 : 120; 
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault(); 

    
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

    
    
    router.push(`/checkout/order/${orderId}`);
    
    
    if (clearCart) clearCart();
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-10">
      <Navbar />
      
      {/* Wrap the content in a form to enable 'required' validation */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-10 py-8 max-w-[1400px] mx-auto">
        
        {/* LEFT COLUMN: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Your Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter Your Name" 
                  className="w-full p-2.5 border rounded-md text-gray-900 focus:ring-1 focus:ring-[#10B981] outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Mobile Number</label>
                <input 
                  required 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Mobile Number" 
                  className="w-full text-gray-800 p-2.5 border rounded-md focus:ring-1 focus:ring-[#10B981] outline-none" 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">Select your area</label>
              <select 
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                className="w-full p-2.5 border rounded-md bg-white outline-none text-gray-800"
              >
                <option>Inside Dhaka City (ঢাকা সিটির ভেতর)</option>
                <option>Outside Dhaka City (ঢাকা সিটির বাইরে)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">Your Address</label>
              <input 
                required 
                type="text" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Enter full address (House, Road, Area, District, Postal Code)" 
                className="w-full p-2.5 border rounded-md outline-none text-gray-800" 
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-1">Your Note (Optional)</label>
              <textarea 
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="Note..." 
                rows="3" 
                className="w-full p-2.5 border rounded-md text-gray-800 outline-none resize-none"
              ></textarea>
            </div>

            {/* Payment Info */}
            <h3 className="font-bold text-gray-800 mb-4">Payment Info :</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <label className="flex items-center gap-3 cursor-pointer text-gray-700">
                <input type="radio" name="payment" defaultChecked className="w-4 h-4 accent-[#10B981]" />
                <span className="text-sm font-bold uppercase">Cash on delivery</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-gray-700">
                <input type="radio" name="payment" className="w-4 h-4 accent-[#10B981]" />
                <span className="text-sm font-bold uppercase">Payment Method</span>
              </label>
            </div>

            {/* Changed to type="submit" so the browser validates 'required' fields */}
            <button 
              type="submit"
              className="w-full bg-[#10B981] text-white font-bold py-3 rounded-md mt-6 hover:bg-emerald-600 transition-colors uppercase tracking-wide cursor-pointer"
            >
              Confirm Order
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Product List</h2>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-center border border-gray-100 p-2 rounded-md">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[#10B981] font-bold text-sm">৳{item.price}</span>
                      <div className="flex items-center border rounded h-7">
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-50 text-gray-700 cursor-pointer">-</button>
                        <span className="px-2 text-xs font-bold text-gray-700">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-50 text-gray-700 cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-4">
              <h3 className="font-bold text-gray-800 mb-2">Order Summary</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">৳ {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-gray-800">৳ {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-[#10B981] border-t pt-2">
                <span>Total</span>
                <span>৳ {total}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input type="text" placeholder="Enter your coupon code" className="text-gray-800 flex-1 p-2 border rounded-md text-sm outline-none focus:border-[#10B981]" />
              <button type="button" className="bg-[#10B981] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-emerald-600">
                Apply
              </button>
            </div>
          </div>
        </div>
      </form>
      <Footer/>
    </div>
  );
}