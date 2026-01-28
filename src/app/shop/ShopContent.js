"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function ShopContent({ initialProducts, initialCategories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const selectedCategories = searchParams.getAll("cat");
  const selectedSubCategories = searchParams.getAll("sub");
  const activeBrand = searchParams.get("brand");

  const handleToggle = (paramName, value) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(paramName);

    if (currentValues.includes(value)) {
      const updated = currentValues.filter((v) => v !== value);
      params.delete(paramName);
      updated.forEach((v) => params.append(paramName, v));
    } else {
      params.append(paramName, value);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearPrice = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  const handleClearBrand = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("brand");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // CORRECTED FILTER LOGIC
  const filteredProducts = initialProducts.filter((product) => {
    const price = product.salePrice || 0;

    // 1. Price Logic
    const matchesPrice =
      (minPrice === "" || price >= Number(minPrice)) &&
      (maxPrice === "" || price <= Number(maxPrice));

    // 2. Category Logic (Matches the 'cat' query param)
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category?.[0]);

    // 3. Subcategory Logic (Matches the 'sub' query param)
    const matchesSubCategory =
      selectedSubCategories.length === 0 ||
      selectedSubCategories.includes(product.subCategory?.[0]);

    // 4. Brand Logic (Matches the 'brand' query param from the details page)
    const matchesBrand = !activeBrand || product.brand === activeBrand;

    return matchesPrice && matchesCategory && matchesSubCategory && matchesBrand;
  });

  return (
    <main className="max-w-[1300px] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4 space-y-6">
          {/* 1. Filter by Price */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Filter by Price</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#10B981]"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#10B981]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-[#10B981] text-white py-2 rounded-lg text-xs font-bold">Apply</button>
              <button onClick={handleClearPrice} className="bg-gray-400 text-white py-2 rounded-lg text-xs font-bold">
                Clear
              </button>
            </div>
          </div>

          {/* 2. Filter by Category */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Filter by Category</h3>
            <div className="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar">
              {initialCategories.map((cat) => (
                <div key={cat._id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`cat-${cat._id}`}
                    checked={selectedCategories.includes(cat.parentCategory)}
                    onChange={() => handleToggle("cat", cat.parentCategory)}
                    className="w-4 h-4 accent-[#10B981] cursor-pointer"
                  />
                  <label htmlFor={`cat-${cat._id}`} className="text-sm text-gray-600 cursor-pointer">
                    {cat.parentCategory}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Filter by Subcategory */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Filter by Subcategory</h3>
            <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
              {initialCategories.map((cat) =>
                cat.subCategory?.map((sub) => (
                  <div key={sub._id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`sub-${sub._id}`}
                      checked={selectedSubCategories.includes(sub.title)}
                      onChange={() => handleToggle("sub", sub.title)}
                      className="w-4 h-4 accent-[#10B981] cursor-pointer"
                    />
                    <label
                      htmlFor={`sub-${sub._id}`}
                      className="text-sm text-gray-600 cursor-pointer hover:text-[#10B981]"
                    >
                      {sub.title}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="lg:w-3/4">
          {/* Active Brand Indicator */}
          {activeBrand && (
            <div className="mb-4 p-4 bg-purple-50 border border-purple-100 rounded-xl flex justify-between items-center">
              <p className="text-sm text-purple-800">
                Showing products for brand: <span className="font-bold">{activeBrand}</span>
              </p>
              <button
                onClick={handleClearBrand}
                className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition-colors"
              >
                Clear Filter ✕
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700">Total {filteredProducts.length} items Found</h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-20 rounded-2xl border border-dashed border-gray-200 text-center">
              <p className="text-gray-400">No products found matching these filters.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}