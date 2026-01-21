import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Music2, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F3F4F6] pt-12 pb-6 border-t border-gray-200 mt-10">
      <div className="max-w-[1400px] mx-auto px-4">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#10B981] font-bold border">A+</div>
               <span className="font-bold text-gray-800">Anwar Pharmacy</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Anwar Pharmacy Is An Online Pharmacy Store To Provide Our Goods To The Customers.
            </p>
          </div>

          
          <div>
            <h3 className="font-bold text-gray-800 mb-5 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#10B981]" />
                <span>abid3082002@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#10B981]" />
                <span>01533303708</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-[#10B981]" />
                <span>153 North Bashbao Dhaka</span>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="font-bold text-gray-800 mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-[#10B981] transition-colors">Return & Refund Policy</Link></li>
              <li><Link href="#" className="hover:text-[#10B981] transition-colors">Terms and Conditions</Link></li>
              <li><Link href="#" className="hover:text-[#10B981] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#10B981] transition-colors">About us</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="font-bold text-gray-800 mb-5 text-lg">Customer Service</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-[#10B981] transition-colors">Support Center</Link></li>
              <li><Link href="#" className="hover:text-[#10B981] transition-colors">Privacy & Policy</Link></li>
              <li><Link href="#" className="hover:text-[#10B981] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        
        <div className="bg-[#E5E7EB]/50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left mb-8">
          
          
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="font-bold text-gray-800">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#10B981] transition-colors"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#10B981] transition-colors"><Instagram size={16} /></a>
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#10B981] transition-colors"><Youtube size={16} /></a>
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#10B981] transition-colors"><Music2 size={16} /></a>
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#10B981] transition-colors"><MessageCircle size={16} /></a>
            </div>
          </div>

          
          <div className="flex flex-col items-center gap-1">
            <h4 className="font-bold text-gray-800">Call Us Today</h4>
            <span className="text-xl font-bold text-orange-600">01533303708</span>
          </div>

          
          <div className="flex flex-col items-center md:items-end gap-3">
            <h4 className="font-bold text-gray-800">Payment Method</h4>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 grayscale hover:grayscale-0 transition-all">
              <img src="/products/cod.jpg" alt="COD" className="h-10 bg-white rounded px-1 border" />
              <img src="/products/bkash.png" alt="bkash" className="h-10 bg-white rounded px-1 border" />
              <img src="/products/rocket.png" alt="rocket" className="h-10 bg-white rounded px-1 border" />
              <img src="/products/nogod.png" alt="nagad" className="h-10 bg-white rounded px-1 border" />
              <img src="/products/visa.png" alt="visa" className="h-10 bg-white rounded px-1 border" />
              <img src="/products/master.webp" alt="master" className="h-10 bg-white rounded px-1 border" />
            </div>
          </div>
        </div>

        
        <div className="text-center border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-500 font-medium">
            Design & Developed By <span className="text-[#10B981] font-bold">softriple</span>
          </p>
        </div>

      </div>
    </footer>
  );
}