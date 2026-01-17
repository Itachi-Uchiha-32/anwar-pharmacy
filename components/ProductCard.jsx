"use client"; 

import Link from "next/link";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
 

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); 

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300">
      
      
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-[#10B981] text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
          {discount}% off
        </div>
      )}

      
      <button className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors z-10">
        <Heart size={18} />
      </button>

      
      <Link href={`/product/${product.slug}`} className="block">
        <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>

      
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#10B981] font-bold text-sm">
          BDT {product.price}
        </span>
        {product.oldPrice && (
          <span className="text-gray-400 line-through text-[10px]">
            BDT {product.oldPrice}
          </span>
        )}
      </div>

      
      <Link href={`/product/${product.slug}`}>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mb-3 hover:text-[#10B981] transition-colors cursor-pointer">
          {product.name}
        </h3>
      </Link>

      
      <div className="flex gap-2">
        <button 
          onClick={() => addToCart(product)} 
          className="flex-1 border bg-white border-[#10B981] text-[#10B981] text-[10px] hover:text-white hover:bg-green-400 cursor-pointer font-bold py-2 rounded-md transition-colors"
        >
          Add To Cart
        </button>
        <Link
          href={`/product/${product.slug}`}
          className="flex-1 bg-[#10B981] text-white text-[10px] font-bold py-2 rounded-md text-center hover:bg-emerald-600 transition-colors"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}