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

// Price string parser: "6 triệu" -> 6000000, "1,2 tỷ" -> 1200000000, "450000" -> 450000, "900 nghìn–1,5 triệu" -> 1500000
export function formatPrice(priceStr: string): number {
  if (!priceStr) return 0;
  const map: Record<string, number> = {
    'triệu': 1_000_000,
    'tỷ': 1_000_000_000,
    'nghìn': 1_000,
  };
  const matches = [...priceStr.matchAll(/([\d,.]+)\s*([a-zà-ỹ]+)/gi)];
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const num = parseFloat(lastMatch[1].replace(',', '.'));
    const unit = lastMatch[2].toLowerCase();
    return num * (map[unit] || 1);
  }
  const nums = priceStr.match(/[\d,.]+/g);
  if (nums && nums.length > 0) {
    return parseFloat(nums[nums.length - 1].replace(',', '.'));
  }
  return 0;
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

export async function customerRegister(data: any) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Register failed')
  }
  return res.json()
}

export async function customerLogin(credentials: any) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Login failed')
  }
  return res.json()
}

export async function addToCart(token: string, productId: number, quantity: number = 1) {
  const res = await fetch(`${API}/cart/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ productId, quantity }),
  })
  if (!res.ok) throw new Error('Add to cart failed')
  return res.json()
}

export async function fetchCart(token: string) {
  const res = await fetch(`${API}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function deleteCartItem(token: string, itemId: number) {
  const res = await fetch(`${API}/cart/items/${itemId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Delete failed')
  return res.json()
}

export async function placeOrder(token: string) {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Order failed')
  return res.json()
}

export async function fetchOrders(token: string) {
  const res = await fetch(`${API}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to load orders')
  return res.json()
}

export async function fetchPublicStats(): Promise<{ totalProducts: number; totalBrands: number; totalSeries: number }> {
  const res = await fetch(`${API}/public/stats`)
  if (!res.ok) return { totalProducts: 0, totalBrands: 0, totalSeries: 0 }
  return res.json()
}

export async function sendChatMessage(message: string, history: { role: string; content: string }[]): Promise<string> {
  const res = await fetch(`${API}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })
  if (!res.ok) throw new Error('AI chat request failed')
  const data = await res.json()
  return data.message
}
