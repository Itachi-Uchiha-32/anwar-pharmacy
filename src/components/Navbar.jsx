"use client";
import Link from "next/link";
import { ShoppingBag, Heart, Search, UserCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { toggleCart } = useCart();
  return (
    <header className="bg-white border-b">
      
      <div className="container mx-auto flex items-center gap-4 py-3 px-4">

        
        <Link href="/" className="text-xl font-bold text-green-600">
          Anwar Pharmacy
        </Link>

        
        <div className="flex-1">
          <div className="flex border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full px-3 py-2 outline-none text-gray-700"
            />
            <button className="bg-green-500 px-4 text-white">
              <Search size={20} />
            </button>
          </div>
        </div>

        
        <div className="flex items-center gap-4 text-sm">
          <button onClick={toggleCart} className="text-gray-400 hover:text-red-500 transition-colors">
            <ShoppingBag size={25} />
            </button>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart size={25} />
          </button>
          <button className="border px-3 py-1 rounded border-gray-400 text-gray-600 cursor-pointer flex justify-center items-center gap-2">Login <UserCircle size={20}/>
          </button>
        </div>
      </div>

      
      <nav className="bg-gray-200 text-black">
        <div className="container mx-auto flex items-center gap-6 px-4 py-2 text-sm">
          <button className="bg-green-600 px-4 py-1 rounded text-white">
            Browse Categories ▾
          </button>

          <Link href="/">Home</Link>
          <Link href="/shop">All Product</Link>
          <Link href="/">Offer</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Free Delivery</Link>
        </div>
      </nav>
    </header>
  );
}
