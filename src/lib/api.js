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

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export const shopApi = {
  getBanners: async () => {
    const result = await apiFetch("/banner/website?status=active&sort=position");
    
    return result.data?.data || []; 
    },

  
  getCategories: async () => {
    const result = await apiFetch(`/category/website/${STORE_ID}`);
    return result.data || []; 
  },

  getProducts: async () => {
    const result = await apiFetch("/product/website");
    
    return result.data?.data || [];
  },

  getProductDetails: (slug) => 
    apiFetch(`/product/path/${slug}`),
};