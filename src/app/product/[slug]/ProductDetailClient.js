"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import ProductImageGallery from "./ProductImageGallery";
import ProductActions from "./ProductActions";
import Sidebar from "@/components/Sidebar";

export default function ProductDetailClient({ product }) {
  
  const [selectedVariant, setSelectedVariant] = useState(
    product.variantType && product.variant?.length > 0 ? product.variant[0] : null
  );

  
  const currentPrice = selectedVariant ? selectedVariant.salePrice : product.salePrice;
  const originalPrice = selectedVariant ? selectedVariant.productPrice : product.productPrice;
  const currentDiscount = selectedVariant ? selectedVariant.discount : product.discount;
  
  
  const galleryImages = useMemo(() => {
    if (selectedVariant?.image) {
      return [selectedVariant.image, ...product.imageURLs];
    }
    return product.imageURLs;
  }, [selectedVariant, product.imageURLs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      <div className="space-y-8">
        {/* Main Product Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 grid md:grid-cols-2 gap-10">
          
          {/* Left: Image Section */}
          <div className="space-y-4">
            <ProductImageGallery 
              key={selectedVariant?._id || "base"} 
              images={galleryImages} 
              productName={product.name} 
            />
          </div>

          {/* Right: Info Section */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#1F2937] mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
               <div className="flex text-yellow-400 text-sm">★★★★★</div>
               <span className="text-xs font-bold text-[#10B981]">In Stock</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-black text-[#F97316]">TK {currentPrice}.00</span>
              <span className="text-gray-400 line-through text-sm italic">TK {originalPrice}.00</span>
              <span className="bg-pink-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {currentDiscount}% OFF
              </span>
            </div>

            {/* Variant Selector (Pack Size) */}
            {product.variantType && product.variant?.length > 0 && (
              <div className="mb-6 space-y-3">
                <h3 className="text-sm font-bold text-gray-700 uppercase">Pack size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variant.map((v) => (
                    <button
                      key={v._id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                        selectedVariant?._id === v._id
                          ? "border-pink-500 bg-pink-50 text-pink-600 shadow-sm"
                          : "border-gray-200 text-gray-600 hover:border-pink-200"
                      }`}
                    >
                      {v.attributes["pack size"]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ProductActions product={{ ...product, salePrice: currentPrice, _id: selectedVariant?._id || product._id }} />

            {/* Restored Category and Brand Section */}
            <div className="mt-8 space-y-2 border-t pt-6">
              <p className="text-sm font-bold text-gray-700">
                Category:{" "}
                    <Link 
                    href={`/shop?cat=${encodeURIComponent(product.category?.[0])}`}
                    className="text-purple-600 font-medium hover:text-pink-600 hover:underline transition-colors"
                    >
                    {product.category?.[0]}
                    </Link>
              </p>
              <p className="text-sm font-bold text-gray-700">
                Brand:{" "}
                    <Link 
                    href={`/shop?brand=${encodeURIComponent(product.brand)}`}
                    className="text-purple-600 font-medium hover:text-pink-600 hover:underline transition-colors"
                    >
                    {product.brand}
                    </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Description, Review, Video */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-center gap-4 p-4 border-b">
            <button className="px-8 py-2 bg-[#10B981] text-white rounded-full text-sm font-bold">Description</button>
            <button className="px-8 py-2 bg-gray-50 text-gray-500 rounded-full text-sm font-bold border hover:bg-white">Review (0)</button>
            <button className="px-8 py-2 bg-gray-50 text-gray-500 rounded-full text-sm font-bold border hover:bg-white">Video</button>
          </div>
          <div className="p-10">
            <div 
              className="prose prose-sm max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.description }} 
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="font-bold border-b-2 border-pink-500 inline-block mb-4">Related Products</h3>
        </div>
        <Sidebar />
      </aside>
    </div>
  );
}