import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { COLORS, SPACING } from '../../theme/constants';
import { Layout } from '../layout/Layout'; // Reuse main layout for basic structure
import { LogOut, LayoutDashboard, Boxes, Tags, User } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { admin, logout, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    navigate('/admin/login');
    return null;
  }

  return (
    <Layout>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: SPACING.md }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.lg }}>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: SPACING.lg }}>
          {/* Sidebar */}
          <aside style={{ flex: '0 0 200px', backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.md, border: `1px solid ${COLORS.border}` }}>
            <div style={{ padding: `${SPACING.sm} ${SPACING.md}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: SPACING.md }}>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>{admin?.username || 'Admin'}</div>
              <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>{admin?.role || 'Guest'}</div>
            </div>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: SPACING.xs }}>
                  <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '0.5rem', textDecoration: 'none', color: COLORS.textMain, transition: 'background-color 0.2s', backgroundColor: window.location.pathname === '/admin' ? COLORS.primary : 'transparent', border: 'none', width: '100%', textAlign: 'left' as const, cursor: 'pointer' }}>
                    <LayoutDashboard size={18} /> Tổng quan
                  </Link>
                </li>
                <li style={{ marginBottom: SPACING.xs }}>
                  <Link to="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '0.5rem', textDecoration: 'none', color: window.location.pathname === '/admin/products' ? COLORS.background : COLORS.textMain, transition: 'background-color 0.2s', backgroundColor: window.location.pathname === '/admin/products' ? COLORS.primary : 'transparent', border: 'none', width: '100%', textAlign: 'left' as const, cursor: 'pointer' }}>
                    <Boxes size={18} /> Sản phẩm
                  </Link>
                </li>
                <li style={{ marginBottom: SPACING.xs }}>
                  <Link to="/admin/brands" style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '0.5rem', textDecoration: 'none', color: window.location.pathname === '/admin/brands' ? COLORS.background : COLORS.textMain, transition: 'background-color 0.2s', backgroundColor: window.location.pathname === '/admin/brands' ? COLORS.primary : 'transparent', border: 'none', width: '100%', textAlign: 'left' as const, cursor: 'pointer' }}>
                    <Tags size={18} /> Thương hiệu
                  </Link>
                </li>
                <li style={{ marginBottom: SPACING.xs }}>
                  <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '0.5rem', textDecoration: 'none', color: window.location.pathname === '/admin/users' ? COLORS.background : COLORS.textMain, transition: 'background-color 0.2s', backgroundColor: window.location.pathname === '/admin/users' ? COLORS.primary : 'transparent', border: 'none', width: '100%', textAlign: 'left' as const, cursor: 'pointer' }}>
                    <User size={18} /> Người dùng
                  </Link>
                </li>
                <li>
                  <button onClick={() => { logout(); navigate('/admin/login'); }} style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '0.5rem', textDecoration: 'none', color: COLORS.error, marginTop: SPACING.md, borderTop: `1px solid ${COLORS.border}`, paddingTop: SPACING.md, transition: 'background-color 0.2s', border: 'none', width: '100%', textAlign: 'left' as const, cursor: 'pointer' }}>
                    <LogOut size={18} /> Đăng xuất
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.md, border: `1px solid ${COLORS.border}` }}>
            {children}
          </main>
        </div>
      </div>
    </Layout>
  );
}

