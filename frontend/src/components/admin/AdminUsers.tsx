import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { fetchAdminUsers, deleteAdminUser } from '../../services/api';
import { COLORS, SPACING } from '../../theme/constants';
import { Trash2 } from 'lucide-react';

export function AdminUsers() {
  const { token } = useAdmin();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchAdminUsers(token);
      setUsers(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xoá người dùng này?')) return;
    if (!token) return;
    try {
      await deleteAdminUser(token, id);
      loadUsers();
    } catch (e: any) {
      alert(e.message || 'Xoá thất bại');
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: SPACING.lg }}>Quản lý người dùng</h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: SPACING.xl }}>Đang tải...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: COLORS.surface }}>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>ID</th>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>Tên</th>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>Email</th>
                <th style={{ padding: SPACING.sm, textAlign: 'center', borderBottom: `1px solid ${COLORS.border}` }}>Vai trò</th>
                <th style={{ padding: SPACING.sm, textAlign: 'center', borderBottom: `1px solid ${COLORS.border}` }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{u.id}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{u.name}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{u.email}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>{u.role}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>
                    <button onClick={() => handleDelete(u.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={16} style={{ color: COLORS.error }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
