import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { fetchAdminStats } from '../../services/api';
import { COLORS, SPACING } from '../../theme/constants';
import { Package, Tag, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const { token } = useAdmin();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetchAdminStats(token).then(setStats).finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div style={{ padding: SPACING.xl }}>Đang tải...</div>;

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: SPACING.lg }}>Tổng quan</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: SPACING.lg }}>
        {[
          { icon: Package, label: 'Sản phẩm', value: stats?.totalProducts || 0, color: '#3B82F6' },
          { icon: Tag, label: 'Thương hiệu', value: stats?.totalBrands || 0, color: '#10B981' },
          { icon: TrendingUp, label: 'Dòng sản phẩm', value: stats?.totalSeries || 0, color: '#F59E0B' },
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: COLORS.background, borderRadius: '0.75rem', padding: SPACING.lg, border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.textMain }}>{item.value}</div>
                <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>{item.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
