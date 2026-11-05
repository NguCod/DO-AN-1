import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { ChatInterface } from '../chat/ChatInterface';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme/constants';

interface LayoutProps {
  children: ReactNode;
  cartItemCount?: number;
}

const FOOTER_CATEGORIES = [
  { name: 'Vợt cầu lông', path: '/products?category=Vợt cầu lông' },
  { name: 'Giày cầu lông', path: '/products?category=Giày cầu lông' },
  { name: 'Quả cầu lông', path: '/products?category=Quả cầu lông' },
  { name: 'Phụ kiện', path: '/products?category=Phụ kiện' },
];

export function Layout({ children, cartItemCount = 0 }: LayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: COLORS.background, color: COLORS.textMain, fontFamily: TYPOGRAPHY.fontFamily, fontSize: '15px', lineHeight: 1.6, letterSpacing: '0.01em' }}>
      <Header cartItemCount={cartItemCount} />

      <main style={{ flex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: `${SPACING.lg} ${SPACING.md}`, boxSizing: 'border-box' }}>
        {children}
      </main>

      <footer style={{ backgroundColor: '#1a1a1a', color: COLORS.background, padding: `${SPACING.xl} ${SPACING.md}`, marginTop: 'auto' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: SPACING.xl }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: SPACING.md }}>
                <img src="/logo.svg" alt="BadmintonAI Shop" style={{ height: '36px' }} />
              </div>
              <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: 1.6 }}>Chuyên cung cấp dụng cụ cầu lông chính hãng. Tư vấn chọn vợt phù hợp với phong cách chơi của bạn.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: SPACING.md, fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Danh mục</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', opacity: 0.8 }}>
                {FOOTER_CATEGORIES.map((cat) => (
                  <li key={cat.name} style={{ marginBottom: '0.5rem' }}>
                    <Link to={cat.path} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: SPACING.md, fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hỗ trợ</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', opacity: 0.8 }}>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Sản phẩm</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/cart" style={{ color: 'inherit', textDecoration: 'none' }}>Giỏ hàng</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Đăng nhập</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: SPACING.md, fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Liên hệ</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', opacity: 0.8 }}>
                <li style={{ marginBottom: '0.5rem' }}>Email: support@badmintonai.shop</li>
                <li style={{ marginBottom: '0.5rem' }}>Hotline: 1900 xxxx</li>
                <li style={{ marginBottom: '0.5rem' }}>Hà Nội &amp; TP.HCM</li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: SPACING.xl, paddingTop: SPACING.md, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', opacity: 0.6 }}>
            © {new Date().getFullYear()} BadmintonAI Shop. All rights reserved.
          </div>
        </div>
      </footer>

      <button onClick={() => setIsChatOpen(!isChatOpen)} style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 100, width: '56px', height: '56px', borderRadius: '50%', backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(227, 77, 77, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', transition: 'transform 0.2s' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isChatOpen ? '✕' : '💬'}
      </button>

      {isChatOpen && (
        <div style={{ position: 'fixed', bottom: '80px', right: '1.5rem', zIndex: 99 }}>
          <ChatInterface onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
}