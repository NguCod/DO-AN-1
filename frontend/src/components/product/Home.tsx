import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductList } from './ProductList';
import { COLORS, SPACING } from '../../theme/constants';
import { ArrowRight, ChevronRight, Star, TrendingUp, Package, RefreshCw, BadgeCheck, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { fetchProducts, fetchPublicStats, formatPrice } from '../../services/api';

const CATEGORIES = [
  { id: 'cat-1', name: 'Vợt cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/danh_muc/vot-cau-long-yonex.webp' },
  { id: 'cat-3', name: 'Quả cầu lông', imageUrl: 'https://cdn.shopvnb.com/img/300x300/uploads/danh_muc/qua-cau-long.webp' },
];

export function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchPublicStats()]).then(([prods, st]) => {
      setProducts(prods);
      setStats(st);
      setLoading(false);
    });
  }, []);

  if (loading || products.length === 0) {
    return <div style={{ padding: `${SPACING.xl} 0`, textAlign: 'center' }}>Đang tải sản phẩm...</div>;
  }

  const featuredProducts = products.slice(0, 6);
  const newArrivals = products.slice(products.length - 4);

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #d41b1f 50%, #1a1a1a 100%)`,
        color: COLORS.background,
        padding: `${SPACING['2xl']} ${SPACING.md}`,
        position: 'relative',
        marginBottom: SPACING.xl,
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', opacity: 0.1, background: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext x=%2230%22 y=%2250%22 font-size=%2270%22%3E🏸%3C/text%3E%3C/svg%3E")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: SPACING.lg, alignItems: 'flex-start', position: 'relative', zIndex: 10 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: SPACING.sm, backgroundColor: 'rgba(255,255,255,0.2)', padding: `${SPACING.xs} ${SPACING.md}`, borderRadius: '9999px', marginBottom: SPACING.md, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: COLORS.background }}>⚡ KHUYẾN MÃI NGÀY HÔM NAY</span>
            </div>
            <h1 style={{ fontSize: '3.25rem', fontWeight: 800, lineHeight: 1.15, marginBottom: SPACING.md, maxWidth: '620px', letterSpacing: '-0.03em', color: COLORS.background }}>
              Vợt cầu lông <span style={{ color: COLORS.accent }}>chính hãng</span><br />
              tư vấn AI <span style={{ color: COLORS.accent }}>miễn phí</span>
            </h1>
            <p style={{ fontSize: '1.0625rem', opacity: 0.9, marginBottom: SPACING.lg, maxWidth: '520px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
              Hơn {products.length}+ sản phẩm Yonex · Victor · Lining. Giao toàn quốc 24h. Đổi trả trong 30 ngày.
            </p>
            <div style={{ display: 'flex', gap: SPACING.md, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/products')} style={{ padding: `${SPACING.md} ${SPACING.xl}`, backgroundColor: COLORS.accent, color: COLORS.primary, borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: SPACING.sm, border: 'none', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.3)'; }}
              >
                Mua ngay <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Bar */}
      <div style={{ backgroundColor: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `0 ${SPACING.md}`, display: 'flex', justifyContent: 'center', gap: SPACING.xl, flexWrap: 'wrap' }}>
          {[
            { icon: Package, label: 'Giao hàng 24h', desc: 'Nhanh chóng' },
            { icon: RefreshCw, label: 'Đổi trả 30 ngày', desc: 'Dễ dàng' },
            { icon: BadgeCheck, label: 'Chính hãng 100%', desc: 'Cam kết' },
            { icon: MessageCircle, label: 'Tư vấn AI', desc: 'Miễn phí' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, padding: `${SPACING.sm} 0` }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: COLORS.background, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <item.icon size={20} style={{ color: COLORS.primary }} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.textMain }}>{item.label}</div>
                <div style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `${SPACING.xl} ${SPACING.md}`, marginBottom: SPACING.xl }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: SPACING.lg }}>
          {[
            { Icon: Package, label: 'Sản phẩm', value: `${stats?.totalProducts || 0}+` },
            { Icon: Star, label: 'Thương hiệu', value: stats?.totalBrands || '0', color: COLORS.accent },
            { Icon: RefreshCw, label: 'Dòng sản phẩm', value: stats?.totalSeries || 0, color: COLORS.primary },
            { Icon: MessageCircle, label: 'Tư vấn AI', value: 'Miễn phí' },
          ].map((stat, idx) => (
            <div key={idx} style={{ backgroundColor: COLORS.surface, padding: SPACING.lg, borderRadius: '0.75rem', textAlign: 'center', border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING.sm }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: COLORS.background, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <stat.Icon size={28} style={{ color: COLORS.primary }} />
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.primary, marginBottom: SPACING.xs }}>{stat.value}</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `0 ${SPACING.md}`, marginBottom: SPACING.xl }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>Danh mục nổi bật</h2>
          <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, fontSize: '0.875rem', fontWeight: 600, color: COLORS.primary, textDecoration: 'none' }}>
            Xem tất cả <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: SPACING.lg }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={cat.id === 'cat-1' ? '/vot' : '/qua'} style={{ backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.md, textAlign: 'center', textDecoration: 'none', color: COLORS.textMain, transition: 'transform 0.2s, box-shadow 0.2s' }}
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Sản phẩm nổi bật</h2>
            <p style={{ color: COLORS.textSecondary, fontSize: '0.875rem' }}>Các sản phẩm được yêu thích nhất hiện nay</p>
          </div>
          <Link to="/products" style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, borderRadius: '0.375rem', fontWeight: 600, textDecoration: 'none' }}>
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </div>
        <ProductList products={featuredProducts.map((p: any) => ({
          id: String(p.id),
          name: p.name,
          brand: p.brand.name,
          price: formatPrice(p.price), // formatPrice now returns number
          description: p.playstyle,
          category: p.series,
          imageUrl: p.imageUrl || '/placeholder.jpg',
          stock: 99, // Static stock for now
          attributes: { weight: p.weight, balance: p.balance, stiffness: p.stiffness },
        }))} />
      </div>

      {/* New Arrivals */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: `0 ${SPACING.md}`, marginBottom: SPACING.xl }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.lg }}>
          <TrendingUp size={24} style={{ color: COLORS.primary }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>Sản phẩm mới về</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: SPACING.lg }}>
          {newArrivals.map((p: any) => (
            <div key={p.id} style={{ backgroundColor: COLORS.background, borderRadius: '0.75rem', border: `1px solid ${COLORS.border}`, overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '4/3', backgroundColor: COLORS.surface, overflow: 'hidden' }}>
                  <img src={p.imageUrl || '/placeholder.jpg'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', top: SPACING.sm, left: SPACING.sm, backgroundColor: COLORS.accent, color: COLORS.background, fontSize: '0.75rem', fontWeight: 700, padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>MỚI</div>
              </div>
              <div style={{ padding: SPACING.md }}>
                <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>{p.series}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0.25rem 0' }}>{p.name}</h3>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.primary, marginBottom: SPACING.sm }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(formatPrice(p.price))}
                </div>
                <button onClick={() => {
                  const prod = { id: String(p.id), name: p.name, brand: p.brand, price: formatPrice(p.price), description: p.playstyle, category: p.series, imageUrl: p.imageUrl || '/placeholder.jpg', stock: 99, attributes: { weight: p.weight, balance: p.balance, stiffness: p.stiffness } };
                  addToCart(prod);
                  navigate(`/product/${p.id}`);
                }} style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer' }}>Thêm vào giỏ</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: COLORS.surface, borderRadius: '0.75rem', maxWidth: '1280px', margin: '0 auto', padding: SPACING.xl, textAlign: 'center', marginBottom: SPACING.xl }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.md }}>Sẵn sàng nâng tầm trải nghiệm của bạn?</h2>
        <p style={{ fontSize: '1.125rem', color: COLORS.textSecondary, maxWidth: '600px', margin: '0 auto', marginBottom: SPACING.lg }}>
          Khám phá bộ sưu tập đầy đủ với hơn {products.length} sản phẩm chất lượng cao và tận hưởng tư vấn AI miễn phí.
        </p>
        <Link to="/products" style={{ padding: `${SPACING.md} ${SPACING.xl}`, backgroundColor: COLORS.primary, color: COLORS.background, borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: SPACING.sm }}>
          Mua ngay <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
