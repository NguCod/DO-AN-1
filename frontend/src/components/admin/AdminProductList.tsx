import { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { fetchAdminProducts, deleteAdminProduct, createAdminProduct, updateAdminProduct, fetchAdminBrands } from '../../services/api';
import { COLORS, SPACING } from '../../theme/constants';
import { Trash2, Plus, Edit, X } from 'lucide-react';

interface AdminProductFormProps {
  onClose: () => void;
  initialData?: any;
  onSuccess: () => void;
}

function AdminProductForm({ onClose, initialData, onSuccess }: AdminProductFormProps) {
  const { token } = useAdmin();
  const [brands, setBrands] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    series: initialData?.series || '',
    price: initialData?.price || '',
    weight: initialData?.weight || '',
    stiffness: initialData?.stiffness || '',
    balance: initialData?.balance || '',
    playstyle: initialData?.playstyle || '',
    brandId: initialData?.brandId || '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (token) {
      fetchAdminBrands(token).then(setBrands);
    }
  }, [token]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setUploadStatus(`✅ Đã chọn ảnh: ${selectedFile.name} (${Math.round(selectedFile.size / 1024)} KB)`);
    } else {
      setUploadStatus('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!formData.brandId || Number(formData.brandId) <= 0) {
      alert('Vui lòng chọn thương hiệu hợp lệ');
      return;
    }
    if (!file && !initialData) {
      alert('Vui lòng chọn ảnh sản phẩm');
      return;
    }
    setSaving(true);
    setUploadStatus('🔄 Đang tải ảnh và lưu sản phẩm...');
    try {
      const data = { ...formData, brandId: Number(formData.brandId) };
      if (initialData) {
        await updateAdminProduct(token, initialData.id, data, file);
      } else {
        await createAdminProduct(token, data, file);
      }
      setUploadStatus('✅ Tải ảnh thành công!');
      alert(initialData ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm mới thành công!');
      onSuccess();
      onClose();
    } catch (e: any) {
      setUploadStatus('');
      alert(e.message || 'Lưu thất bại');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.surface, padding: SPACING.lg, borderRadius: '0.75rem', border: `1px solid ${COLORS.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{initialData ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: SPACING.md }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Tên sản phẩm <span style={{ color: COLORS.error }}> *</span></label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Thương hiệu <span style={{ color: COLORS.error }}> *</span></label>
          <select value={formData.brandId} onChange={(e) => setFormData({ ...formData, brandId: e.target.value })} required style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }}>
            <option value="">Chọn thương hiệu</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Dòng (Series)</label>
          <input type="text" value={formData.series} onChange={(e) => setFormData({ ...formData, series: e.target.value })} style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Giá <span style={{ color: COLORS.error }}> *</span></label>
          <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Trọng lượng</label>
          <input type="text" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Độ cứng</label>
          <input type="text" value={formData.stiffness} onChange={(e) => setFormData({ ...formData, stiffness: e.target.value })} style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Cân bằng</label>
          <input type="text" value={formData.balance} onChange={(e) => setFormData({ ...formData, balance: e.target.value })} style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Phong cách</label>
          <input type="text" value={formData.playstyle} onChange={(e) => setFormData({ ...formData, playstyle: e.target.value })} style={{ padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
          <label style={{ fontSize: '0.875rem' }}>Tải ảnh sản phẩm <span style={{ color: COLORS.error }}> *</span></label>
          <div style={{
            border: `2px dashed ${COLORS.border}`,
            borderRadius: '0.5rem',
            padding: SPACING.md,
            textAlign: 'center',
            backgroundColor: COLORS.background,
            cursor: 'pointer'
          }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-upload"
              required={!initialData}
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.xs }}>
              <span style={{ fontSize: '2rem' }}>📁</span>
              <span style={{ fontWeight: 500 }}>Kéo thả hoặc bấm để chọn ảnh</span>
              <span style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>Hỗ trợ: JPG, PNG, WebP (tối đa 5MB)</span>
            </label>
          </div>
          {uploadStatus && (
            <div style={{ fontSize: '0.875rem', marginTop: SPACING.xs, color: uploadStatus.includes('✅') ? COLORS.success : COLORS.textMain }}>
              {uploadStatus}
            </div>
          )}
        </div>
        <div style={{ gridColumn: 'span 2', display: 'flex', gap: SPACING.md, marginTop: SPACING.sm }}>
          <button type="submit" disabled={saving} style={{ padding: SPACING.md, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, flex: 1 }}>
            {saving ? 'Đang lưu...' : (initialData ? 'Cập nhật' : 'Tạo mới')}
          </button>
          <button type="button" onClick={onClose} style={{ padding: SPACING.md, backgroundColor: COLORS.surface, color: COLORS.textMain, border: `1px solid ${COLORS.border}`, borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, flex: 1 }}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export function AdminProductList() {
  const { token } = useAdmin();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async (searchTerm?: string) => {
    console.log('loadProducts called, token:', token ? 'exists' : 'missing');
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminProducts(token, { search: searchTerm || undefined, limit: 50 });
      console.log('Products API response:', data);
      setProducts(data.products || []);
    } catch (e: any) {
      console.error('Load products error:', e);
      setError(e.message || 'Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      console.log('Token available, loading products');
      loadProducts();
    }
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xoá sản phẩm này?')) return;
    if (!token) return;
    try {
      await deleteAdminProduct(token, id);
      loadProducts(search);
    } catch (e: any) { alert(e.message || 'Xoá thất bại'); }
  };

  const handleEdit = (product: any) => { setEditingProduct(product); setShowForm(true); };
  const handleAddNew = () => { setEditingProduct(null); setShowForm(true); };
  const handleFormSuccess = () => { setShowForm(false); setEditingProduct(null); loadProducts(search); };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Quản lý sản phẩm</h2>
        <button style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, padding: `${SPACING.sm} ${SPACING.md}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }} onClick={handleAddNew}>
          <Plus size={18} /> Thêm mới
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: SPACING.xl }}>
          <AdminProductForm initialData={editingProduct} onClose={() => { setShowForm(false); setEditingProduct(null); }} onSuccess={handleFormSuccess} />
        </div>
      )}

      {error && <div style={{ marginBottom: SPACING.md, padding: SPACING.md, backgroundColor: COLORS.error + '20', border: `1px solid ${COLORS.error}`, borderRadius: '0.5rem', color: COLORS.error }}>{error}</div>}

      <div style={{ marginBottom: SPACING.md }}>
        <input type="text" placeholder="Tìm kiếm sản phẩm..." value={search} onChange={(e) => { setSearch(e.target.value); loadProducts(e.target.value); }} style={{ width: '100%', padding: SPACING.sm, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.875rem' }} />
      </div>

      {loading ? <div style={{ textAlign: 'center', padding: SPACING.xl }}>Đang tải...</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: COLORS.surface }}>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>ID</th>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>Tên</th>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>Thương hiệu</th>
                <th style={{ padding: SPACING.sm, textAlign: 'left', borderBottom: `1px solid ${COLORS.border}` }}>Giá</th>
                <th style={{ padding: SPACING.sm, textAlign: 'center', borderBottom: `1px solid ${COLORS.border}` }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{p.id}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{p.name}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{p.brand?.name || '-'}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}` }}>{p.price}</td>
                  <td style={{ padding: SPACING.sm, borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>
                    <button onClick={() => handleEdit(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: SPACING.xs }}><Edit size={16} style={{ color: COLORS.primary }} /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} style={{ color: COLORS.error }} /></button>
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