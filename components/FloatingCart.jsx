"use client";

import { useCart } from "../context/CartContext";


export default function FloatingCart() {
  const { cartItems, toggleCart } = useCart();
  
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div 
      onClick={toggleCart}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] cursor-pointer group"
    >
      <div className="bg-[#B0D5CB] rounded-lg shadow-xl overflow-hidden flex flex-col items-center">
        
        <div className="bg-[#B0D5CB] px-3 py-2 flex flex-col items-center border-b border-gray-100/20">
          <span className="text-xs text-gray-600 font-medium">{itemCount} Items</span>
        </div>
        
        <div className="bg-[#10B981] text-white px-3 py-2 w-full text-center">
          <span className="text-sm font-bold">৳ {totalAmount}</span>
        </div>
      </div>
    </div>
  );
}