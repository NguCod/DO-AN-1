import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { placeOrder } from '../../services/api';
import { SPACING, COLORS } from '../../theme/constants';
import { ArrowRight } from 'lucide-react';

export function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
    } else if (cartItems.length === 0) {
      navigate('/cart'); // Redirect to cart if empty
    }
  }, [user, cartItems, navigate]);

  const handlePlaceOrder = async () => {
    if (!user || cartItems.length === 0) return;

    setLoading(true);
    setError('');
    try {
      // Assuming `placeOrder` automatically uses the user's cart from the backend
      // and `user.token` is available for authentication.
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Chưa đăng nhập. Vui lòng đăng nhập lại.');
        setLoading(false);
        return;
      }
      await placeOrder(token);
      clearCart(); // Clear local cart after successful order
      navigate('/order-success'); // Navigate to a success page
    } catch (err: any) {
      setError(err.message || 'Đặt hàng thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (!user || cartItems.length === 0) {
    return null; // Or a loading/redirecting message
  }

  return (
    <div style={{ padding: `${SPACING.md} 0`, maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.lg }}>Thanh toán</h1>

      <div style={{ backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.lg, marginBottom: SPACING.md }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: SPACING.md }}>Thông tin đơn hàng</h2>
        {cartItems.map((item) => (
          <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SPACING.sm, fontSize: '1rem', color: COLORS.textMain }}>
            <span>{item.product.name} ({item.quantity})</span>
            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(parseFloat(item.product.price) * item.quantity)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: SPACING.md, fontSize: '1.125rem', fontWeight: 700, borderTop: `1px solid ${COLORS.border}`, paddingTop: SPACING.md }}>
          <span>Tổng cộng:</span>
          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(totalAmount)}</span>
        </div>
      </div>

      <div style={{ backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.lg, marginBottom: SPACING.md }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: SPACING.md }}>Địa chỉ giao hàng</h2>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Nhập địa chỉ giao hàng của bạn"
          style={{ width: '100%', padding: SPACING.md, border: `1px solid ${COLORS.border}`, borderRadius: '0.5rem', fontSize: '1rem' }}
        />
      </div>

      <div style={{ backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.lg, marginBottom: SPACING.md }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: SPACING.md }}>Phương thức thanh toán</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{ width: '100%', padding: SPACING.md, border: `1px solid ${COLORS.border}`, borderRadius: '0.5rem', fontSize: '1rem' }}
        >
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          {/* <option value="CreditCard">Thẻ tín dụng</option> */}
        </select>
        <p style={{ fontSize: '0.875rem', color: COLORS.textSecondary, marginTop: SPACING.sm }}>
          Chỉ hỗ trợ COD cho MVP. Các phương thức khác sẽ được bổ sung sau.
        </p>
      </div>

      {error && (
        <div style={{ color: COLORS.error, marginBottom: SPACING.md, textAlign: 'center' }}>
          {error}
        </div>
      )}

      <button
        onClick={handlePlaceOrder}
        disabled={loading || cartItems.length === 0 || !shippingAddress}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: (loading || cartItems.length === 0 || !shippingAddress) ? COLORS.border : COLORS.primary,
          color: (loading || cartItems.length === 0 || !shippingAddress) ? COLORS.textSecondary : COLORS.background,
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: (loading || cartItems.length === 0 || !shippingAddress) ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SPACING.sm,
        }}
      >
        {loading ? 'Đang đặt hàng...' : 'Xác nhận đặt hàng'}
        {!loading && <ArrowRight size={20} />}
      </button>
    </div>
  );
}
