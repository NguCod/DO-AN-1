import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from './ProductList';
import { COLORS, SPACING } from '../../theme/constants';
import { Filter } from 'lucide-react';
import { fetchProducts, fetchBrands, formatPrice } from '../../services/api';

interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-enable @typescript-eslint/no-unused-vars */

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Read filters from URL params directly
  const filters: FilterState = {
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || 'all',
    search: searchParams.get('search') || '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 5_000_000,
  };

  useEffect(() => {
    fetchBrands().then((b) => setBrands(b.map((x: any) => ({ id: x.id, name: x.name }))));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({
      category: filters.category || undefined,
      brand: filters.brand !== 'all' ? filters.brand : undefined,
      search: filters.search || undefined,
    }).then((data) => {
      let filtered = data;
      if (filters.minPrice > 0) filtered = filtered.filter(p => formatPrice(p.price) >= filters.minPrice);
      if (filters.maxPrice < 5_000_000) filtered = filtered.filter(p => formatPrice(p.price) <= filters.maxPrice);
      setProducts(filtered);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [filters.category, filters.brand, filters.search, filters.minPrice, filters.maxPrice]);

  const availableBrands = ['all', ...brands.map(b => b.name)];

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div style={{ padding: `${SPACING.md} 0`, maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.lg }}>Danh sách sản phẩm</h1>

      <div style={{ display: 'flex', gap: SPACING.lg }}>
        {/* Sidebar filters */}
        <div style={{ flex: '0 0 300px' }}>
          <div style={{ position: 'sticky', top: '100px', backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.lg, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
                <Filter size={18} style={{ color: COLORS.primary }} />
                <span style={{ fontWeight: 600 }}>Bộ lọc</span>
              </div>
              <button onClick={handleReset} style={{ fontSize: '0.875rem', color: COLORS.primary, background: 'none', border: 'none', cursor: 'pointer' }}>Đặt lại</button>
            </div>

            {/* Search */}
            <div style={{ marginBottom: SPACING.lg }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.sm }}>Tìm kiếm</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) newParams.set('search', e.target.value);
                  else newParams.delete('search');
                  setSearchParams(newParams);
                }}
                placeholder="Tìm sản phẩm..."
                style={{ width: '100%', padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }}
              />
            </div>

            {/* Brand filter */}
            <div style={{ marginBottom: SPACING.lg }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.sm }}>Thương hiệu</label>
              <select
                value={filters.brand}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value !== 'all') newParams.set('brand', e.target.value);
                  else newParams.delete('brand');
                  setSearchParams(newParams);
                }}
                style={{ width: '100%', padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }}
              >
                {availableBrands.map((b) => <option key={b} value={b}>{b === 'all' ? 'Tất cả' : b}</option>)}
              </select>
            </div>

            <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary, padding: SPACING.sm, backgroundColor: COLORS.background, borderRadius: '0.375rem', textAlign: 'center' }}>
              {loading ? 'Đang tải...' : <><strong>{products.length}</strong> sản phẩm phù hợp</>}
            </div>
          </div>
        </div>

        {/* Product list */}
        <div style={{ flex: 1 }}>
          <ProductList
            isLoading={loading}
            products={products.map((p: any) => ({
              id: String(p.id),
              name: p.name,
              brand: p.brand?.name || '',
              price: formatPrice(p.price),
              description: p.playstyle || '',
              category: p.series,
              imageUrl: p.imageUrl || '/placeholder.jpg',
              stock: 99,
              attributes: { weight: p.weight, balance: p.balance, stiffness: p.stiffness },
            }))}
          />
        </div>
      </div>
    </div>
  );
}