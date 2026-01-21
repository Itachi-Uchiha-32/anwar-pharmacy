import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { shopApi } from "../lib/api"; 


export const metadata = {
  title: "Home | Anwar Pharmacy",
  description: "Browse our latest arrivals and categories.",
};

export default async function HomePage() {
  
  let products = [];
  let categories = [];
  let banners = [];

  try {
    const [prodRes, catRes, bannerRes] = await Promise.all([
      shopApi.getProducts(),
      shopApi.getCategories(),
      shopApi.getBanners()
    ]);
    
    products = prodRes || []; 
    categories = catRes || [];
    banners = bannerRes || [];
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
         
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <div className="space-y-8">
           
            {/* Banner Section */}
            <div className="w-full h-[150px] md:h-[300px] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              {banners.length > 0 ? (
                <img 
                  src={banners[0].imageURLs || banners[0].image} 
                  alt="Pharmacy Banner" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" /> 
              )}
            </div>

            {/* Categories Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Shop by Category</h2>
                <button className="text-xs text-gray-500 bg-white border px-3 py-1 rounded hover:bg-gray-50">View All</button>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {categories.slice(0, 6).map((cat) => (
                  <div key={cat._id} className="flex flex-col items-center group cursor-pointer bg-white border border-gray-100 rounded-lg py-4 hover:shadow-md transition-all">
                    <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-2">
                      <img 
                        src={cat.imageURLs}
                        alt={cat.parentCategory} 
                        className="w-full h-full object-contain p-1" 
                      />
                    </div>
                    <span className="text-[10px] md:text-xs text-center font-bold text-gray-700 px-1 line-clamp-1">
                      {cat.parentCategory}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Products Section */}
            <section className="pb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">New Arrivals</h2>
                <button className="text-xs text-gray-500 bg-white border px-3 py-1 rounded hover:bg-gray-50">See More</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}