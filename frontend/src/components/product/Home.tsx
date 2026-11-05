import { Link } from 'react-router-dom';
import { ProductList } from './ProductList';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../mocks/data';
import { COLORS, SPACING } from '../../theme/constants';
import { ArrowRight, ChevronRight, Star, TrendingUp, Shield } from 'lucide-react';

export function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 6);
  const topRated = MOCK_PRODUCTS.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);
  const newArrivals = MOCK_PRODUCTS.slice(8, 12);

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: COLORS.primary, color: COLORS.background, padding: `${SPACING['2xl']} ${SPACING.md}`, position: 'relative', marginBottom: SPACING.xl }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: SPACING.xl, alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: SPACING.md }}>
              Trải nghiệm mua sắm cầu lông thông minh với <span style={{ color: COLORS.accent }}>AI</span>
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: SPACING.lg, maxWidth: '600px' }}>
              Tư vấn chọn vợt, giày, phụ kiện phù hợp nhất với phong cách và trình độ của bạn.
            </p>
            <div style={{ display: 'flex', gap: SPACING.md, flexWrap: 'wrap' }}>
              <Link to="/products" style={{ padding: `${SPACING.md} ${SPACING.xl}`, backgroundColor: COLORS.background, color: COLORS.primary, borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: SPACING.sm }}>
                Xem sản phẩm <ArrowRight size={20} />
              </Link>
              <button style={{ padding: `${SPACING.md} ${SPACING.xl}`, backgroundColor: 'transparent', color: COLORS.background, border: `2px solid ${COLORS.background}`, borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: SPACING.sm }}>
                <Shield size={20} /> Đảm bảo chất lượng
              </button>
            </div>
          </div>
          <div style={{ display: { xs: 'none', lg: 'block' } as any }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ aspectRatio: '16/9', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600 }}>
                  🏸 Welcome to BadmintonAI Shop
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `0 ${SPACING.md}`, marginBottom: SPACING.xl }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: SPACING.lg }}>
          {[
            { icon: '🏸', label: 'Sản phẩm', value: '15+' },
            { icon: '⭐', label: 'Đánh giá trung bình', value: '4.6' },
            { icon: '🚚', label: 'Giao hàng toàn quốc', value: '24h' },
            { icon: '💬', label: 'Tư vấn AI', value: 'Miễn phí' },
          ].map((stat, idx) => (
            <div key={idx} style={{ backgroundColor: COLORS.surface, padding: SPACING.lg, borderRadius: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: SPACING.sm }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.primary, marginBottom: SPACING.xs }}>{stat.value}</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `0 ${SPACING.md}`, marginBottom: SPACING.xl }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Danh mục nổi bật</h2>
          <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, fontSize: '0.875rem', fontWeight: 600, color: COLORS.primary, textDecoration: 'none' }}>
            Xem tất cả <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: SPACING.lg }}>
          {MOCK_CATEGORIES.map((cat) => (
            <Link key={cat.id} to="/products" style={{ backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.md, textAlign: 'center', textDecoration: 'none', color: COLORS.textMain, transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,0,0,0.12)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ aspectRatio: '1/1', borderRadius: '0.5rem', backgroundColor: COLORS.background, marginBottom: SPACING.sm, overflow: 'hidden' }}>
                <img src={cat.imageUrl} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `0 ${SPACING.md}`, marginBottom: SPACING.xl }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Sản phẩm nổi bật</h2>
            <p style={{ color: COLORS.textSecondary, fontSize: '0.875rem' }}>Các sản phẩm được yêu thích nhất hiện nay</p>
          </div>
          <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, borderRadius: '0.375rem', fontWeight: 600, textDecoration: 'none' }}>
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </div>
        <ProductList products={featuredProducts} onAddToCart={(p) => console.log('Add to cart:', p.name)} />
      </div>

      {/* Top Rated */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `0 ${SPACING.md}`, marginBottom: SPACING.xl }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.lg }}>
          <Star size={24} style={{ color: '#F59E0B' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Đánh giá cao nhất</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: SPACING.lg }}>
          {topRated.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} style={{ backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.md, textDecoration: 'none', color: COLORS.textMain, display: 'flex', gap: SPACING.md, alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary, marginBottom: '0.25rem' }}>{p.brand}</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
                  <span style={{ color: '#F59E0B' }}>{'★'.repeat(Math.round(p.rating ?? 0))}{'☆'.repeat(5 - Math.round(p.rating ?? 0))}</span>
                  <span style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>({p.rating?.toFixed(1)})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `0 ${SPACING.md}`, marginBottom: SPACING.xl }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.lg }}>
          <TrendingUp size={24} style={{ color: COLORS.primary }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Sản phẩm mới về</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: SPACING.lg }}>
          {newArrivals.map((p) => (
            <div key={p.id} style={{ backgroundColor: COLORS.background, borderRadius: '0.75rem', border: `1px solid ${COLORS.border}`, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '4/3', backgroundColor: COLORS.surface, overflow: 'hidden' }}>
                  <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', top: SPACING.sm, left: SPACING.sm, backgroundColor: COLORS.accent, color: COLORS.background, fontSize: '0.75rem', fontWeight: 700, padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>MỚI</div>
              </div>
              <div style={{ padding: SPACING.md }}>
                <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>{p.category}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0.25rem 0' }}>{p.name}</h3>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.primary, marginBottom: SPACING.sm }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p.price)}
                </div>
                <button onClick={() => console.log('Add to cart:', p.name)} style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer' }}>Thêm vào giỏ</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: COLORS.surface, borderRadius: '0.75rem', maxWidth: '1280px', margin: '0 auto', padding: SPACING.xl, textAlign: 'center', marginBottom: SPACING.xl }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.md }}>Sẵn sàng nâng tầm trải nghiệm của bạn?</h2>
        <p style={{ fontSize: '1.125rem', color: COLORS.textSecondary, maxWidth: '600px', margin: '0 auto', marginBottom: SPACING.lg }}>
          Khám phá bộ sưu tập đầy đủ với hơn 15 sản phẩm chất lượng cao và tận hưởng tư vấn AI miễn phí.
        </p>
        <Link to="/products" style={{ padding: `${SPACING.md} ${SPACING.xl}`, backgroundColor: COLORS.primary, color: COLORS.background, borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: SPACING.sm }}>
          Mua ngay <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
