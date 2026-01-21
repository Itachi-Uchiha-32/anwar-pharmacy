import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { shopApi } from "../../lib/api";
import ShopContent from "./ShopContent";


export const metadata = {
  title: "All Product | Anwar Pharmacy",
  description: "Browse our wide range of authentic medicines, healthcare products, and wellness essentials at Anwar Pharmacy.",
  openGraph: {
    title: "Anwar Pharmacy",
    description: "Your trusted partner in healthcare. Quality medicine delivered to your door.",
  }
};

export default async function ShopPage() {
  let products = [];
  let categories = [];

  try {
    
    const [prodData, catResponse] = await Promise.all([
      shopApi.getProducts(),
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
      

      <ShopContent initialProducts={products} initialCategories={categories} />

      <Footer />
    </div>
  );
}