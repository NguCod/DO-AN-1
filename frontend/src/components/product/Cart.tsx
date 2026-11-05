import { useCart } from '../../context/CartContext';
import { SPACING, COLORS } from '../../theme/constants';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalAmount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: `${SPACING.xl} 0`, textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.md }}>Giỏ hàng của bạn</h1>
        <p style={{ color: COLORS.textSecondary }}>Giỏ hàng hiện đang trống.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: `${SPACING.md} 0` }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.lg }}>Giỏ hàng của bạn</h1>

      <div style={{ display: 'grid', gap: SPACING.md, maxWidth: '800px' }}>
        {cartItems.map((item) => (
          <div key={item.productId} style={{ display: 'flex', gap: SPACING.md, padding: SPACING.md, border: `1px solid ${COLORS.border}`, borderRadius: '0.5rem', alignItems: 'center' }}>
            <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.375rem' }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>{item.product.name}</h3>
              <p style={{ margin: '0.25rem 0', color: COLORS.primary, fontWeight: 600 }}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price)}
              </p>
              <div style={{ display: 'flex', gap: SPACING.sm, alignItems: 'center' }}>
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{ padding: '0.25rem 0.5rem', border: `1px solid ${COLORS.border}`, borderRadius: '0.25rem', cursor: 'pointer' }}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{ padding: '0.25rem 0.5rem', border: `1px solid ${COLORS.border}`, borderRadius: '0.25rem', cursor: 'pointer' }}>+</button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.productId)} style={{ padding: '0.5rem', backgroundColor: COLORS.error, color: COLORS.background, border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>Xóa</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: SPACING.xl, padding: SPACING.lg, border: `1px solid ${COLORS.border}`, borderRadius: '0.5rem', maxWidth: '800px', marginLeft: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
          <span>Tổng cộng:</span>
          <span style={{ color: COLORS.primary }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span>
        </div>
        <button style={{ marginTop: SPACING.md, width: '100%', padding: '0.75rem', backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer' }}>Tiến hành thanh toán</button>
      </div>
    </div>
  );
}