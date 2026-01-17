import { ChevronRight } from "lucide-react"; 

export default function Sidebar() {
  const categories = [
    { name: "Tablets & Pills", icon: "https://i.ibb.co.com/fGqn1y5X/3299031.png" },
    { name: "Syrup", icon: "https://i.ibb.co.com/0W3XZPp/4465484.png" },
    { name: "Device", icon: "https://i.ibb.co.com/rKBhGyFc/4675476.png" },
    { name: "Skin Care", icon: "https://i.ibb.co.com/JWQhfs8x/5405186.png" },
    { name: "Cream & Moisturizer", icon: "https://i.ibb.co.com/p6qWCzBt/7350822.png" },
    { name: "Diabetic Care", icon: "https://i.ibb.co.com/MxrrwSSx/11748892.png" },
  ];

  return (
    <aside className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
     
      <h3 className="bg-[#10B981] text-white px-4 py-3 font-bold flex items-center gap-2">
        <span className="text-xl">≡</span> Shop By Department
      </h3>

      <ul>
        {categories.map((cat) => (
          <li
            key={cat.name}
            className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-none hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3">
             
              <img
                src={cat.icon}
                alt={cat.name}
                className="w-26 h-10 object-contain"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#10B981]">
                {cat.name}
              </span>
            </div>
            
           
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#10B981]" />
          </li>
        ))}
      </ul>
    </aside>
  );
}