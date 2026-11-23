const API = 'http://localhost:3000/api';

interface ApiProduct {
  id: number;
  name: string;
  brand: string;
  series: string;
  price: string;
  weight: string;
  stiffness: string;
  balance: string;
  playstyle: string;
  imageUrl: string;
  brandData?: { name: string };
}

export function formatPrice(priceStr: string): number {
  if (!priceStr) return 0;
  const map: Record<string, number> = {
    'triệu': 1_000_000,
    'tỷ': 1_000_000_000,
  };
  const clean = priceStr.toLowerCase().replace(/[\d,.–]/g, '').trim();
  const nums = priceStr.match(/[\d,.]+/g);
  if (!nums || nums.length === 0) return 0;
  const num = parseFloat(nums[nums.length - 1].replace(',', '.'));
  return num * (map[clean] || 1);
}

export async function fetchProducts(params?: { brand?: string; series?: string; search?: string; category?: string }): Promise<ApiProduct[]> {
  const query = new URLSearchParams();
  if (params?.brand) query.set('brand', params.brand);
  if (params?.series) query.set('series', params.series);
  if (params?.search) query.set('search', params.search);
  if (params?.category) query.set('category', params.category);
  const res = await fetch(`${API}/products?${query}`);
  return res.json();
}

export async function fetchProductById(id: number): Promise<ApiProduct | null> {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchBrands(): Promise<{ id: number; name: string; slug: string; _count: { products: number } }[]> {
  const res = await fetch(`${API}/brands`);
  return res.json();
}

export async function adminLogin(credentials: any) {
  const res = await fetch(`${API}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  return res.json();
}

export async function fetchAdminStats(token: string) {
  const res = await fetch(`${API}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function fetchAdminProducts(token: string, params?: any) {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    });
  }
  const qs = query.toString();
  const res = await fetch(`${API}/admin/products${qs ? `?${qs}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Không thể tải danh sách sản phẩm');
  }
  return res.json();
}

export async function fetchAdminBrands(token: string) {
  const res = await fetch(`${API}/admin/brands`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteAdminProduct(token: string, id: number) {
  const res = await fetch(`${API}/admin/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteAdminBrand(token: string, id: number) {
  const res = await fetch(`${API}/admin/brands/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Delete failed');
  }
  return res.json();
}

export async function createAdminBrand(token: string, data: any) {
  const res = await fetch(`${API}/admin/brands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Create failed');
  }
  return res.json();
}

export async function updateAdminBrand(token: string, id: number, data: any) {
  const res = await fetch(`${API}/admin/brands/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Update failed');
  }
  return res.json();
}

export async function createAdminProduct(token: string, data: any, file?: File | null) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (file) formData.append('image', file);

  const res = await fetch(`${API}/admin/products`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Create failed');
  }
  return res.json();
}

export async function updateAdminProduct(token: string, id: number, data: any, file?: File | null) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (file) formData.append('image', file);

  const res = await fetch(`${API}/admin/products/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Update failed');
  }
  return res.json();
}

export async function fetchAdminUsers(token: string) {
  const res = await fetch(`${API}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteAdminUser(token: string, id: number) {
  const res = await fetch(`${API}/admin/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Delete failed');
  }
  return res.json();
}

export async function fetchPublicStats() {
  const res = await fetch(`${API}/public/stats`);
  return res.json();
}