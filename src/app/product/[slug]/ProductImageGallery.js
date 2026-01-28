"use client";
import React, { useState, useEffect } from "react";

export default function ProductImageGallery({ images, productName }) {
  const [mainImage, setMainImage] = useState(images?.[0] || "/placeholder.png");
  useEffect(() => {
    if (images?.[0]) {
      setMainImage(images[0]);
    }
  }, [images]);
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate mouse position in percentage (0% to 100%)
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Move the "origin" of the scale to follow the mouse
    e.currentTarget.querySelector('img').style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <div className="space-y-4">
      {/* Main Zoom Container */}
      <div 
        className="relative border border-gray-50 rounded-2xl flex items-center justify-center bg-white h-[400px] overflow-hidden cursor-zoom-in group"
        onMouseMove={handleMouseMove}
      >
        <img 
          src={mainImage} 
          alt={productName}
          className="max-h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[3]" 
          /* ^ CHANGE SCALE[3] to [4] or [5] for even more zoom ^ */
        />
        
        {/* Indicators for the user */}
        <div className="absolute bottom-4 right-4 bg-black/10 px-2 py-1 rounded text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Roll to zoom
        </div>
      </div>

      {/* Thumbnails - Now Interactive */}
      <div className="flex gap-3">
        {images?.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setMainImage(img)}
            className={`w-20 h-20 border-2 rounded-lg p-1 transition-all ${
              mainImage === img ? 'border-pink-500' : 'border-gray-100 hover:border-pink-200'
            }`}
          >
            <img src={img} className="w-full h-full object-contain" alt="thumbnail" />
          </button>
        ))}
      </div>
    </div>
  );
}