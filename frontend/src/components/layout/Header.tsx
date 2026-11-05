import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { COLORS, SPACING } from '../../theme/constants';

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  return (
    <header style={{ position: 'sticky', top: 0, backgroundColor: COLORS.background, borderBottom: `1px solid ${COLORS.border}`, zIndex: 50, padding: SPACING.md }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: SPACING.md, alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 700, fontSize: '1.5rem', color: COLORS.primary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ⚡ BadmintonAI
        </Link>

        <div style={{ maxWidth: '400px', width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <input type="search" placeholder="Tìm kiếm sản phẩm..." style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.25rem', borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem', outline: 'none' }} onFocus={(e) => { e.currentTarget.style.borderColor = COLORS.primary; e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`; }} onBlur={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = 'none'; }} />
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
          </div>
        </div>

        <nav style={{ display: 'flex', gap: SPACING.md, alignItems: 'center' }}>
          <Link to="/products" style={{ textDecoration: 'none', color: COLORS.textMain, fontWeight: 500, padding: '0.5rem 1rem', borderRadius: '0.375rem' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.surface)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>Sản phẩm</Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: COLORS.textMain, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: '0.375rem' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.surface)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span style={{ backgroundColor: COLORS.error, color: COLORS.background, fontSize: '0.75rem', fontWeight: 700, padding: '0.125rem 0.5rem', borderRadius: '9999px', minWidth: '1.5rem', textAlign: 'center' }}>{cartItemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}