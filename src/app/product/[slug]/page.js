import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { shopApi } from "@/lib/api";
import ProductActions from "./ProductActions"; 

export async function generateMetadata({ params }) {
  const { slug } = await params; 
  const response = await shopApi.getProductDetails(slug);
  const product = response?.data;

  if (!product) return { title: "Product Not Found | Anwar Pharmacy" };

  return {
    title: `${product.name} - Anwar Pharmacy`,
    description: `Buy ${product.name} at Anwar Pharmacy. Quality healthcare products delivered to your door.`,
    openGraph: { images: [product.imageURLs?.[0]] },
  };
}

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  const response = await shopApi.getProductDetails(slug);
  const product = response?.data;

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Navbar />
      
      <main className="max-w-[1300px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          
          <div className="space-y-8">
            {/* Main Product Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 grid md:grid-cols-2 gap-10">
              
              {/* Left: Image Section */}
              <div className="space-y-4">
                <div className="relative border border-gray-50 rounded-2xl p-6 flex items-center justify-center bg-white h-[400px]">
                  <img 
                    src={product.imageURLs?.[0] || "/placeholder.png"} 
                    
                    alt={`${product.name} - ${product.brand} ${product.category?.[0] || ''} at Anwar Pharmacy`} 
                    className="max-h-full object-contain" 
                  />
                  {/* Arrows overlay if you want to implement a slider later */}
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-400 hover:text-gray-800">←</button>
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-400 hover:text-gray-800">→</button>
                </div>
                <div className="flex gap-3">
                  <div className="w-20 h-20 border-2 border-pink-500 rounded-lg p-1">
                     <img src={product.imageURLs?.[0]} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>

              {/* Right: Info Section */}
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-[#1F2937] mb-2">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                   <div className="flex text-yellow-400 text-sm">★★★★★</div>
                   <span className="text-xs font-bold text-[#10B981]">In Stock</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-black text-[#F97316]">TK {product.salePrice}.00</span>
                  <span className="text-gray-400 line-through text-sm italic">TK {product.productPrice}.00</span>
                  <span className="bg-pink-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {product.discount}% OFF
                  </span>
                </div>

                {/* INTERACTIVE ACTIONS (Quantity, Buy, Buttons) */}
                <ProductActions product={product} />

                <div className="mt-8 space-y-2 border-t pt-6">
                  <p className="text-sm font-bold text-gray-700">
                    Category: <span className="text-purple-600 font-medium">{product.category?.[0]}</span>
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    Brand: <span className="text-purple-600 font-medium">{product.brand}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Centered Tab Section */}
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
               {/* Related Products list would go here */}
            </div>
            <Sidebar />
          </aside>

        </div>
      </main>
      <Footer/>
    </div>
  );
}