import { ProductList } from './ProductList';
import { MOCK_PRODUCTS } from '../../mocks/data';
import { SPACING } from '../../theme/constants';

export function Products() {
  return (
    <div style={{ padding: `${SPACING.md} 0` }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.lg }}>Danh sách sản phẩm</h1>
      <ProductList products={MOCK_PRODUCTS} onAddToCart={(p) => console.log('Add to cart:', p.name)} />
    </div>
  );
}