import { ProductList } from './ProductList';
import { MOCK_PRODUCTS } from '../../mocks/data';
import { SPACING } from '../../theme/constants';

export function Home() {
  return (
    <div style={{ padding: `${SPACING.xl} 0` }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: SPACING.md }}>Chào mừng đến với BadmintonAI Shop</h1>
        <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 3rem', color: '#666' }}>Trải nghiệm mua sắm dụng cụ cầu lông chuyên nghiệp với trợ lý AI tư vấn thông minh.</p>
        <ProductList products={MOCK_PRODUCTS} onAddToCart={(p) => console.log('Add to cart:', p.name)} />
      </div>
    </div>
  );
}