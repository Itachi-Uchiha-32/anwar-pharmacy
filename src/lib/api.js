const BASE_URL = "https://ecommerce-saas-server-wine.vercel.app/api/v1";
const STORE_ID = process.env.STORE_ID;

async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "store-id": STORE_ID, 
      ...options.headers,
    },
    next: { revalidate: 60 }, 
  });
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
}

export const shopApi = {
  getCategories: async () => {
    const result = await apiFetch(`/category/website/${STORE_ID}`);
    return result.data || []; 
  },

  // UPDATED: Accept category from the page
  getProducts: async (category, subcategory, limit=20) => {
    let endpoint = "/product/website?";
    const params = new URLSearchParams();

    // Set the limit to bypass the default 10
    params.append("limit", limit.toString());

    if (category) {
      const catArray = Array.isArray(category) ? category : [category];
      catArray.forEach(c => params.append("category", c));
    }

    if (subcategory) {
      const subArray = Array.isArray(subcategory) ? subcategory : [subcategory];
      subArray.forEach(s => params.append("subCategory", s));
    }

    const result = await apiFetch(`${endpoint}${params.toString()}`);
    return result.data?.data || [];
  },
  getBanners: async () => {
    const result = await apiFetch("/banner/website?status=active&sort=position");
    
    return result.data?.data || []; 
    },

  getProductDetails: (slug) => 
    apiFetch(`/product/path/${slug}`),
};