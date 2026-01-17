import { products } from "../../../../data/products";
import Navbar from "../../../../components/Navbar";
import Sidebar from "../../../../components/Sidebar";
import Footer from "../../../../components/Footer";

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold">
        Product not found
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-10">
      <Navbar />
      
      <main className="max-w-[1300px] mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          
          {/* LEFT SECTION: Product Details & Description */}
          <div className="space-y-6">
            
            {/* Top Card: Image and Actions */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm grid md:grid-cols-2 gap-8">
              
              {/* Image Gallery Column */}
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-center bg-white h-[350px]">
                  <img src={product.image} alt={product.name} className="max-h-full object-contain" />
                </div>
                {/* Thumbnail placeholder */}
                <div className="w-16 h-16 border-2 border-red-500 rounded p-1 cursor-pointer">
                  <img src={product.image} className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Info & Buying Column */}
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h1>
                <div className="flex items-center gap-1 text-[#FBBF24] mb-4">
                  {"★".repeat(5)} <span className="text-gray-400 text-xs ml-2">In Stock</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-black text-[#F97316]">TK {product.price}.00</span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">TK {product.oldPrice}.00</span>
                  )}
                  <span className="bg-[#EF4444] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                </div>

                {/* Quantity & Cart Actions */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex border border-gray-300 rounded overflow-hidden h-10">
                    <button className="px-3 bg-gray-50 hover:bg-gray-100">-</button>
                    <input type="text" value="1" className="w-10 text-center text-sm border-x outline-none" readOnly />
                    <button className="px-3 bg-gray-50 hover:bg-gray-100">+</button>
                  </div>
                  <button className="bg-[#10B981] hover:bg-emerald-600 text-white px-4 h-10 rounded font-bold text-sm flex items-center gap-2">
                    🛒 যোগ করুন
                  </button>
                  <button className="bg-[#F97316] hover:bg-orange-600 text-white px-4 h-10 rounded font-bold text-sm">
                    অর্ডার করুন
                  </button>
                </div>

                {/* Secondary Order Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="bg-[#065F46] text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-2">
                    💬 হোয়াটসঅ্যাপ অর্ডার
                  </button>
                  <button className="bg-[#701A75] text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-2">
                    📞 কলে অর্ডার করুন
                  </button>
                </div>

                <div className="border-t pt-4 text-xs space-y-2">
                  <p><span className="font-bold text-gray-700">Category:</span> <span className="text-purple-600 cursor-pointer">{product.category}</span></p>
                  <p><span className="font-bold text-gray-700">Brand:</span><span className="text-purple-600 cursor-pointer"> {product.brand || "General"}</span></p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex border-b bg-gray-50">
                <button className="px-6 py-3 bg-[#10B981] text-white text-sm font-bold rounded-t-lg">Description</button>
                <button className="px-6 py-3 text-gray-500 text-sm hover:text-gray-800">Review (0)</button>
                <button className="px-6 py-3 text-gray-500 text-sm hover:text-gray-800">Video</button>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Description:</h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Sidebar & Related Products */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-4">Related Products</h3>
              <p className="text-xs text-gray-400 italic">No related products found.</p>
            </div>

            {/* Category Sidebar */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <Sidebar />
            </div>
          </div>

        </div>
      </main>
      <Footer/>
    </div>
  );
}