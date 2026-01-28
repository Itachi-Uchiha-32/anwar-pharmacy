// src/app/product/[slug]/page.js
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { shopApi } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  const response = await shopApi.getProductDetails(slug);
  const product = response?.data;

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Navbar />
      <main className="max-w-[1300px] mx-auto px-4 py-8">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </div>
  );
}