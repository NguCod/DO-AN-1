import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../theme/constants';
import { fetchProductById, fetchProducts, formatPrice } from '../../services/api';

interface ApiProduct {
  id: number;
  name: string;
  brand: any;
  series: string;
  price: string;
  weight: string;
  stiffness: string;
  balance: string;
  playstyle: string;
  imageUrl: string;
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [related, setRelated] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const numId = parseInt(id, 10);
    Promise.all([fetchProductById(numId), fetchProducts({ brand: undefined, search: undefined })]).then(([p, all]) => {
      setProduct(p);
      setRelated(all.filter((x) => x.series === p?.series && x.id !== p.id).slice(0, 4));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div style={{ padding: `${SPACING.xl} 0`, textAlign: 'center' }}>Đang tải...</div>;
  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: `${SPACING.xl} 0` }}>
        <h2 style={{ color: COLORS.textMain, marginBottom: SPACING.md }}>Không tìm thấy sản phẩm</h2>
        <button onClick={() => navigate('/products')} style={{ padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const priceNum = formatPrice(product.price);
  const attrMap: Record<string, string> = {
    weight: 'Trọng lượng',
    balance: 'Cân bằng',
    stiffness: 'Độ cứng',
  };
  const attrEntries: [string, string][] = [];
Object.entries(attrMap).forEach(([key, vietnamese]) => {
  attrEntries.push([vietnamese, product[key as keyof typeof product] || '']);
});

  const handleBuy = () => {
    const cartProduct = {
      ...product,
      id: String(product.id),
      name: product.name,
      brand: product.brand?.name || '',
      price: formatPrice(product.price),
      description: product.playstyle || '',
      category: product.series || '',
      imageUrl: product.imageUrl || '/placeholder.jpg',
      stock: 99,
      attributes: {
        weight: product.weight,
        balance: product.balance,
        stiffness: product.stiffness,
      },
    };
    addToCart(cartProduct);
    navigate('/cart');
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: COLORS.primary, cursor: 'pointer', fontSize: '0.875rem', marginBottom: SPACING.md, padding: 0 }}>
        {'←'} Quay lại
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: SPACING.xl }}>
        <div style={{ aspectRatio: '3/4', backgroundColor: COLORS.surface, borderRadius: '0.75rem', overflow: 'hidden' }}>
          <img src={product.imageUrl || '/placeholder.jpg'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
          <div style={{ color: COLORS.textSecondary, fontSize: '0.875rem' }}>{product.brand?.name || ''}</div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 700, margin: 0, color: COLORS.textMain, lineHeight: 1.3, letterSpacing: '-0.02em' }}>{product.name}</h1>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.primary, marginTop: SPACING.sm, marginBottom: SPACING.sm }}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(priceNum)}
          </div>
          <p style={{ color: COLORS.textSecondary, lineHeight: 1.6, fontSize: '0.9375rem' }}>{product.playstyle}</p>

          {attrEntries.length > 0 && (
            <div style={{ backgroundColor: COLORS.surface, borderRadius: '0.5rem', padding: SPACING.md, marginTop: SPACING.sm }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.textSecondary, marginBottom: SPACING.sm, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Thuộc tính</h3>
              <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
                <tbody>
                  {attrEntries.map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ color: COLORS.textSecondary, padding: `${SPACING.xs} 0`, borderBottom: `1px solid ${COLORS.border}`, width: '40%' }}>{key}</td>
                      <td style={{ color: COLORS.textMain, fontWeight: 500, padding: `${SPACING.xs} 0`, borderBottom: `1px solid ${COLORS.border}` }}>{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ fontSize: '0.875rem', color: '#16A34A', marginTop: SPACING.xs }}>Còn hàng</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.sm }}>
            <span style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>Số lượng:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${COLORS.border}`, borderRadius: '0.375rem' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '36px', border: 'none', background: COLORS.surface, cursor: 'pointer', fontSize: '1.125rem', color: COLORS.textMain, borderRadius: '0.375rem 0 0 0.375rem' }}>−</button>
              <span style={{ width: '40px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, borderLeft: `1px solid ${COLORS.border}`, borderRight: `1px solid ${COLORS.border}`, height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: '36px', height: '36px', border: 'none', background: COLORS.surface, cursor: 'pointer', fontSize: '1.125rem', color: COLORS.textMain, borderRadius: '0 0.375rem 0.375rem 0' }}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: SPACING.sm, marginTop: SPACING.md }}>
            <button onClick={handleBuy} style={{ flex: 1, padding: `${SPACING.md} ${SPACING.lg}`, backgroundColor: 'transparent', color: COLORS.primary, border: `2px solid ${COLORS.primary}`, borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>
              Thêm vào giỏ
            </button>
            <button onClick={handleBuy} style={{ flex: 1, padding: `${SPACING.md} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div style={{ marginTop: SPACING.xl }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: SPACING.md, color: COLORS.textMain }}>Sản phẩm cùng dòng</h2>
        {related.length === 0 ? (
          <p style={{ color: COLORS.textSecondary, fontSize: '0.875rem' }}>Không có sản phẩm nào cùng dòng.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: SPACING.md }}>
            {related.map((p) => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
                <div style={{ aspectRatio: '3/4', backgroundColor: COLORS.surface, borderRadius: '0.5rem', overflow: 'hidden', marginBottom: SPACING.sm }}>
                  <img src={p.imageUrl || '/placeholder.jpg'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>{p.brand?.name || ''}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.textMain, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: COLORS.primary }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(formatPrice(p.price))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
