import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { COLORS, SPACING } from '../../theme/constants';
import { useUser } from '../../context/UserContext';

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  const { user, isAuthenticated, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, backgroundColor: COLORS.background, borderBottom: `1px solid ${COLORS.border}`, zIndex: 50, padding: SPACING.md }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: SPACING.md, alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo.svg" alt="Ace Badminton" style={{ height: '50px' }} />
        </Link>

        <form onSubmit={handleSearchSubmit} style={{ maxWidth: '500px', width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.25rem', borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem', outline: 'none' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = COLORS.primary; e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = 'none'; }}
            />
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
          </div>
        </form>

        <nav style={{ display: 'flex', gap: SPACING.sm, alignItems: 'center' }}>
          <Link to="/products" style={{ textDecoration: 'none', color: COLORS.textMain, fontWeight: 500, padding: '0.5rem 1rem', borderRadius: '0.375rem' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.surface)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >Sản phẩm</Link>

          <Link to="/cart" style={{ textDecoration: 'none', color: COLORS.textMain, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem', borderRadius: '0.375rem', position: 'relative' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.surface)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span style={{ position: 'absolute', top: '0', right: '-0.25rem', backgroundColor: COLORS.error, color: COLORS.background, fontSize: '0.6875rem', fontWeight: 700, padding: '0.0625rem 0.375rem', borderRadius: '9999px', minWidth: '1.25rem', textAlign: 'center' }}>{cartItemCount}</span>
            )}
          </Link>

          
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, padding: '0.5rem 0.75rem', backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
              >
                <User size={18} />
                <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</span>
              </button>
              {showUserMenu && (
                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: SPACING.xs, backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}`, borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: '180px', zIndex: 100 }}>
                  <div style={{ padding: `${SPACING.sm} ${SPACING.md}`, borderBottom: `1px solid ${COLORS.border}` }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>{user?.email}</div>
                  </div>
                  <button onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }} style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md}`, display: 'flex', alignItems: 'center', gap: SPACING.sm, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: COLORS.error }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.surface)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', padding: '0.5rem 1rem', backgroundColor: COLORS.primary, color: COLORS.background, borderRadius: '0.375rem', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
              <User size={16} /> Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
