import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MOCK_PRODUCTS } from '../../mocks/data';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../theme/constants';
import { Product } from '../../types';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = MOCK_PRODUCTS.find((p) => p.id === id);

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(price);

  const attrEntries = Object.entries(product.attributes ?? {});

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: COLORS.primary, cursor: 'pointer', fontSize: '0.875rem', marginBottom: SPACING.md, padding: 0 }}>
        ← Quay lại
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: SPACING.xl }}>
        {/* Image */}
        <div style={{ aspectRatio: '3/4', backgroundColor: COLORS.surface, borderRadius: '0.75rem', overflow: 'hidden' }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
          <div style={{ color: COLORS.textSecondary, fontSize: '0.875rem' }}>{product.brand}</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, color: COLORS.textMain, lineHeight: 1.3 }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
            <span style={{ color: '#F59E0B', fontSize: '1.125rem' }}>{'★'.repeat(Math.round(product.rating ?? 0))}{'☆'.repeat(5 - Math.round(product.rating ?? 0))}</span>
            <span style={{ color: COLORS.textSecondary, fontSize: '0.875rem' }}>{product.rating?.toFixed(1)}</span>
          </div>

          <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.primary, margin: SPACING.sm 0 }}>{formatPrice(product.price)}</div>

          <p style={{ color: COLORS.textSecondary, lineHeight: 1.6, fontSize: '0.9375rem' }}>{product.description}</p>

          {/* Attributes table */}
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

          {/* Stock */}
          <div style={{ fontSize: '0.875rem', color: product.stock > 0 ? '#16A34A' : COLORS.error, marginTop: SPACING.xs }}>
            {product.stock > 0 ? `Còn hàng (${product.stock} sản phẩm)` : 'Hết hàng'}
          </div>

          {/* Quantity selector */}
          {product.stock > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.sm }}>
              <span style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>Số lượng:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${COLORS.border}`, borderRadius: '0.375rem' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '36px', border: 'none', background: COLORS.surface, cursor: 'pointer', fontSize: '1.125rem', color: COLORS.textMain, borderRadius: '0.375rem 0 0 0.375rem' }}>−</button>
                <span style={{ width: '40px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, borderLeft: `1px solid ${COLORS.border}`, borderRight: `1px solid ${COLORS.border}`, height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} style={{ width: '36px', height: '36px', border: 'none', background: COLORS.surface, cursor: 'pointer', fontSize: '1.125rem', color: COLORS.textMain, borderRadius: '0 0.375rem 0.375rem 0' }}>+</button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: SPACING.sm, marginTop: SPACING.md }}>
            <button onClick={handleAddToCart} disabled={product.stock === 0} style={{ flex: 1, padding: `${SPACING.md} ${SPACING.lg}`, backgroundColor: product.stock > 0 ? 'transparent' : COLORS.border, color: product.stock > 0 ? COLORS.primary : COLORS.textSecondary, border: `2px solid ${COLORS.primary}`, borderRadius: '0.375rem', fontWeight: 600, cursor: product.stock > 0 ? 'pointer' : 'not-allowed', fontSize: '1rem' }}>
              Thêm vào giỏ
            </button>
            <button onClick={handleBuyNow} disabled={product.stock === 0} style={{ flex: 1, padding: `${SPACING.md} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: product.stock > 0 ? 'pointer' : 'not-allowed', fontSize: '1rem' }}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div style={{ marginTop: SPACING.xl }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: SPACING.md, color: COLORS.textMain }}>Sản phẩm liên quan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: SPACING.md }}>
          {MOCK_PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4).map((related) => (
            <div key={related.id} onClick={() => navigate(`/product/${related.id}`)} style={{ cursor: 'pointer' }}>
              <div style={{ aspectRatio: '3/4', backgroundColor: COLORS.surface, borderRadius: '0.5rem', overflow: 'hidden', marginBottom: SPACING.sm }}>
                <img src={related.imageUrl} alt={related.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>{related.brand}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.textMain, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{related.name}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: COLORS.primary }}>{formatPrice(related.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
