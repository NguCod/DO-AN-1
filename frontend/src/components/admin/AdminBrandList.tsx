import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { fetchAdminBrands, deleteAdminBrand, createAdminBrand, updateAdminBrand } from '../../services/api';
import { COLORS, SPACING } from '../../theme/constants';
import { Trash2, Plus, Edit } from 'lucide-react';

function AdminBrandForm({ onClose, initialData, onSuccess }: { onClose: () => void; initialData?: any; onSuccess: () => void }) {
  const { token } = useAdmin();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      if (initialData) {
        await updateAdminBrand(token, initialData.id, formData);
      } else {
        await createAdminBrand(token, formData);
      }
      onSuccess();
      onClose();
    } catch (e: any) {
      alert(e.message || 'Lưu thất bại');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.surface, padding: SPACING.lg, borderRadius: '0.75rem', border: `1px solid ${COLORS.border}` }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: SPACING.md }}>
        {initialData ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu mới'}
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: SPACING.md }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Tên thương hiệu</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Slug</label>
          <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ gridColumn: 'span 2', display: 'flex', gap: SPACING.md, marginTop: SPACING.sm }}>
          <button type="submit" disabled={saving} style={{ padding: SPACING.md, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
            {saving ? 'Đang lưu...' : (initialData ? 'Cập nhật' : 'Tạo mới')}
          </button>
          <button type="button" onClick={onClose} style={{ padding: SPACING.md, backgroundColor: COLORS.surface, color: COLORS.textMain, border: `1px solid ${COLORS.border}`, borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export function AdminBrandList() {
  const { token } = useAdmin();
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any | null>(null);

  const loadBrands = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchAdminBrands(token);
      setBrands(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xoá thương hiệu này?')) return;
    if (!token) return;
    try {
      await deleteAdminBrand(token, id);
      loadBrands();
    } catch (e: any) {
      alert(e.message || 'Xoá thất bại');
    }
  };

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingBrand(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBrand(null);
    loadBrands();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Quản lý thương hiệu</h2>
        <button
          style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, padding: `${SPACING.sm} ${SPACING.md}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}
          onClick={handleAddNew}
        >
          <Plus size={18} /> Thêm mới
        </button>
      </div>

      {showForm && (
        <div style={{ marginTop: SPACING.lg }}>
          <AdminBrandForm initialData={editingBrand} onClose={() => { setShowForm(false); setEditingBrand(null); }} onSuccess={handleFormSuccess} />
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: SPACING.xl }}>Đang tải...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: COLORS.surface }}>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>ID</th>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>Tên</th>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>Slug</th>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>Sản phẩm</th>
                <th style={{ padding: SPACING.sm, textAlign: 'center', borderBottom: `1px solid ${COLORS.border}` }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.id}>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{b.id}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{b.name}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{b.slug}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>{b._count?.products || 0}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>
                    <button onClick={() => handleEdit(b)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: SPACING.xs }}>
                      <Edit size={16} style={{ color: COLORS.primary }} />
                    </button>
                    <button onClick={() => handleDelete(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
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