import Image from "next/image";
import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import banner from "../../public/products/banner.jpg";
import Footer from "../../components/Footer";
export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          
          
          <div className="hidden md:block">
            <Sidebar />
          </div>

          
          <div className="space-y-8">
            
            
            <div className="w-full h-[300px] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <img 
                src="https://i.ibb.co.com/wZxzBYxS/banner.jpg" 
                alt="Pharmacy Banner" 
                className="w-full h-full object-cover"
              />
            </div>

            

          </div>

        </div>
        <div className="mt-10 px-4">
              <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Category</h2>
                <button className="text-xs text-gray-500 bg-white border px-3 py-1 rounded hover:bg-gray-50">show More</button>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {[
                  { name: "Tablets & Pills", icon: "https://i.ibb.co.com/fGqn1y5X/3299031.png" },
                  { name: "Syrup", icon: "https://i.ibb.co.com/0W3XZPp/4465484.png" },
                  { name: "Device", icon: "https://i.ibb.co.com/rKBhGyFc/4675476.png" },
                  { name: "Skin Care", icon: "https://i.ibb.co.com/JWQhfs8x/5405186.png" },
                  { name: "Cream & Moisturizer", icon: "https://i.ibb.co.com/p6qWCzBt/7350822.png" },
                  { name: "Diabetic Care", icon: "https://i.ibb.co.com/MxrrwSSx/11748892.png" },
                ].map((cat) => (
                  <div key={cat.name} className="flex flex-col items-center group cursor-pointer bg-white border border-gray-100 rounded-lg py-3">
                    <div className="w-16 h-16 md:w-20 md:h-20  flex items-center justify-center group-hover:border-green-500 transition-all mb-2">
                      
                      <img src={cat.icon} alt={cat.name} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                     
                    </div>
                     <span className="text-[11px] md:text-xs text-center font-medium text-gray-600">{cat.name}</span>
                  </div>
                ))}
              </div>
            </section>

            
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">New Arrivals</h2>
                <button className="text-xs text-gray-500 bg-white border px-3 py-1 rounded hover:bg-gray-50">show More</button>
              </div>

              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>

      </main>
      <Footer/>
    </div>
  );
}