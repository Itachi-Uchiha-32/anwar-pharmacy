"use client";
import { useCart } from "../context/CartContext";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";


export default function CartDrawer() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeItem } = useCart();
  const router = useRouter();
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const handleCheckout = () => {
    toggleCart(); 
    router.push("/checkout"); 
  };
  return (
    <>
      {/* 1. DARK OVERLAY - Fades in/out */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[998] transition-opacity duration-300 ease-in-out ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`} 
        onClick={toggleCart} 
      />
      
      {/* 2. DRAWER PANEL - Slides in/out from right */}
      <div className={`fixed right-0 top-0 z-[999] w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        
        {/* Header */}
        <div className="bg-[#10B981] p-4 flex justify-between items-center text-white shadow-md">
          <h2 className="font-bold text-lg">Shopping Cart</h2>
          <button 
            onClick={toggleCart} 
            className="hover:bg-white/20 p-2 rounded-full transition-all active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        {/* Product List Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="flex gap-4 border border-gray-100 p-3 rounded-lg shadow-sm hover:border-green-100 transition-colors"
              >
                <img src={item.image} className="w-16 h-16 object-contain rounded" alt={item.name} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                  <div className="text-[#10B981] font-bold text-sm mt-1">৳{item.price}</div>
                  
                  <div className="flex items-center border border-gray-200 w-fit rounded mt-2 text-xs overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                      className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border-r transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 font-bold bg-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                      className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border-l transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
              <span className="text-4xl">🛒</span>
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Sticky Footer Button */}
        <div className="p-4 border-t bg-white">
          <button onClick={handleCheckout} disabled={cartItems.length === 0} className="w-full bg-[#10B981] text-white py-4 rounded-xl font-bold flex justify-between px-6 hover:bg-emerald-600 transition-all active:scale-[0.97] shadow-lg shadow-green-100">
            <span className="uppercase tracking-wider text-sm">Proceed To Checkout</span>
            <span className="bg-white/20 px-3 py-1 rounded text-sm font-black">৳ {totalAmount}</span>
          </button>
        </div>
      </div>
    </>
  );
}