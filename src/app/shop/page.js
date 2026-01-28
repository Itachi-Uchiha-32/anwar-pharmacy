
import { shopApi } from "../../lib/api";
import ShopContent from "./ShopContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ShopPage({ searchParams }) {
  
  const filters = await searchParams;
  const activeCat = filters.cat; 
  const activeSub = filters.sub;

  let products = [];
  let categories = [];

  try {
    const [prodData, catResponse] = await Promise.all([
      shopApi.getProducts(activeCat, activeSub), 
      shopApi.getCategories()
    ]);
    products = prodData || [];
    categories = catResponse || [];
  } catch (error) {
    console.error("Failed to load shop data:", error);
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Navbar />
      {/* Passing data down to client component */}
      <ShopContent 
        initialProducts={products} 
        initialCategories={categories} 
      />
      <Footer />
    </div>
  );
}