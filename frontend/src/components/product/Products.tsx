import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from './ProductList';
import { COLORS, SPACING } from '../../theme/constants';
import { Filter, Sliders } from 'lucide-react';
import { fetchProducts, fetchBrands, formatPrice } from '../../services/api';

interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

const INITIAL_FILTERS: FilterState = {
  category: '',
  brand: 'all',
  minPrice: 0,
  maxPrice: 5_000_000,
  search: '',
};

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const brand = searchParams.get('brand') || 'all';
    return { ...INITIAL_FILTERS, category, search, brand };
  });
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands().then((b) => setBrands(b.map((x: any) => ({ id: x.id, name: x.name }))));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({
      category: filters.category !== 'all' ? filters.category : undefined,
      brand: filters.brand !== 'all' ? filters.brand : undefined,
      search: filters.search || undefined,
    }).then((data) => {
      let filtered = data;
      if (filters.minPrice > 0) filtered = filtered.filter(p => formatPrice(p.price) >= filters.minPrice);
      if (filters.maxPrice < Infinity) filtered = filtered.filter(p => formatPrice(p.price) <= filters.maxPrice);
      setProducts(filtered);
      setLoading(false);
    });
  }, [filters.category, filters.brand, filters.search, filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.brand !== 'all') params.set('brand', filters.brand);
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const availableBrands = ['all', ...brands.map(b => b.name)];

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
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
                <Filter size={20} />
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Lọc sản phẩm</h2>
              </div>
              <button onClick={handleReset} style={{ fontSize: '0.75rem', color: COLORS.primary, background: 'none', border: 'none', cursor: 'pointer' }}>Đặt lại</button>
            </div>

            <div style={{ marginBottom: SPACING.lg }}>
              <label htmlFor="search" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.375rem' }}>Tìm kiếm</label>
              <input
                id="search"
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Nhập tên sản phẩm..."
                style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ marginBottom: SPACING.lg }}>
              <label htmlFor="brand" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.375rem' }}>Thương hiệu</label>
              <select
                id="brand"
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem', backgroundColor: 'white' }}
              >
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand === 'all' ? 'Tất cả thương hiệu' : brand}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: SPACING.lg }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.375rem' }}>Khoảng giá</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.xs }}>
                <input
                  type="number"
                  value={filters.minPrice / 1000000}
                  onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) * 1000000 })}
                  placeholder="Min (triệu)"
                  min="0"
                  step="0.5"
                  style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem' }}
                />
                <span>–</span>
                <input
                  type="number"
                  value={filters.maxPrice / 1000000}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) * 1000000 })}
                  placeholder="Max (triệu)"
                  min="0"
                  step="0.5"
                  style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem' }}
                />
              </div>
              <div style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>
                {filters.minPrice / 1000000} – {filters.maxPrice / 1000000} triệu VND
              </div>
            </div>

            <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary, padding: SPACING.sm, backgroundColor: COLORS.background, borderRadius: '0.375rem', textAlign: 'center' }}>
              {loading ? 'Đang tải...' : <><strong>{products.length}</strong> sản phẩm phù hợp</>}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: SPACING.lg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>Kết quả tìm kiếm</h2>
                <p style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>
                  Hiển thị {products.length} sản phẩm
                  {filters.brand !== 'all' && ` thuộc thương hiệu "${filters.brand}"`}
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{ display: showFilters ? 'flex' : 'none', alignItems: 'center', gap: SPACING.sm, padding: `${SPACING.sm} ${SPACING.md}`, backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '0.375rem', cursor: 'pointer' }}
              >
                <Sliders size={16} /> Lọc
              </button>
            </div>
          </div>

          <ProductList products={products.map((p: any) => ({
            id: String(p.id),
            name: p.name,
            brand: p.brand.name,
            price: formatPrice(p.price),
            description: p.playstyle,
            category: p.series,
            imageUrl: p.imageUrl || '/placeholder.jpg',
            stock: 99,
            attributes: { weight: p.weight, balance: p.balance, stiffness: p.stiffness },
          }))} />

          {products.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: `${SPACING.xl} 0`, backgroundColor: COLORS.surface, borderRadius: '0.75rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: SPACING.md }}>🔍</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: SPACING.sm }}>Không tìm thấy sản phẩm phù hợp</h3>
              <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.md }}>Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
              <button onClick={handleReset} style={{ padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 600 }}>Xóa tất cả bộ lọc</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
