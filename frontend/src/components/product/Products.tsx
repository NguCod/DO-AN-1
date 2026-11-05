import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from './ProductList';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS } from '../../mocks/data';
import { COLORS, SPACING } from '../../theme/constants';
import { Filter, Sliders } from 'lucide-react';

interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

const INITIAL_FILTERS: FilterState = {
  category: 'all',
  brand: 'all',
  minPrice: 0,
  maxPrice: 5000000,
  search: '',
};

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'all';
    const brand = searchParams.get('brand') || 'all';
    return { ...INITIAL_FILTERS, search, category, brand };
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.brand !== 'all') params.set('brand', filters.brand);
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const availableCategories = ['all', ...MOCK_CATEGORIES.map(c => c.name)];
  const availableBrands = ['all', ...MOCK_BRANDS.map(b => b.name)];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      if (filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.brand !== 'all' && p.brand !== filters.brand) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(price);

  return (
    <div style={{ padding: `${SPACING.md} 0`, maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.lg }}>Danh sách sản phẩm</h1>

      <div style={{ display: 'flex', gap: SPACING.lg, flexDirection: { xs: 'column', lg: 'row' } as any }}>
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

            {/* Search */}
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

            {/* Category */}
            <div style={{ marginBottom: SPACING.lg }}>
              <label htmlFor="category" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.375rem' }}>Danh mục</label>
              <select
                id="category"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                style={{ width: '100%', padding: '0.625rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem', backgroundColor: 'white' }}
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'Tất cả danh mục' : cat}</option>
                ))}
              </select>
            </div>

            {/* Brand */}
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

            {/* Price range */}
            <div style={{ marginBottom: SPACING.lg }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.375rem' }}>Khoảng giá</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.xs }}>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: +e.target.value })}
                  placeholder="Min"
                  min="0"
                  step="50000"
                  style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem' }}
                />
                <span>–</span>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })}
                  placeholder="Max"
                  min="0"
                  step="50000"
                  style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem' }}
                />
              </div>
              <div style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>
                {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
              </div>
            </div>

            <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary, padding: SPACING.sm, backgroundColor: COLORS.background, borderRadius: '0.375rem', textAlign: 'center' }}>
              <strong>{filteredProducts.length}</strong> sản phẩm phù hợp
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
                  Hiển thị {filteredProducts.length} sản phẩm
                  {filters.category !== 'all' && ` trong danh mục "${filters.category}"`}
                  {filters.brand !== 'all' && ` thuộc thương hiệu "${filters.brand}"`}
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{ display: { xs: 'flex', lg: 'none' } as any, alignItems: 'center', gap: SPACING.sm, padding: `${SPACING.sm} ${SPACING.md}`, backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '0.375rem', cursor: 'pointer' }}
              >
                <Sliders size={16} /> Lọc
              </button>
            </div>
          </div>

          <ProductList products={filteredProducts} />

          {filteredProducts.length === 0 && (
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