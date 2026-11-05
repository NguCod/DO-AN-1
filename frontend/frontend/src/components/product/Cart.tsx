import { Product, CartItem } from '../../types';
import { COLORS, SPACING } from '../../theme/constants';

interface CartState {
  items: CartItem[];
}

export function Cart() {
  return (
    <div style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
          Giỏ hàng của bạn
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Xem chi tiết sản phẩm và tiến trình đặt hàng của bạn.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
          {[]} {/* TODO: Render cart items using ProductList or custom layout */}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            Tổng: 0 VND
          </p>
        </div>
      </div>
    </div>
  );
}