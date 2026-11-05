import { ProductList } from './ProductList';
import { MOCK_PRODUCTS } from '../../mocks/data';

export function Products() {
  return (
    <div style={{ padding: '1rem 0' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Danh sách sản phẩm</h1>
      <ProductList
        products={MOCK_PRODUCTS}
        onAddToCart={(product) => {
          console.log('Add to cart:', product);
        }}
      />
    </div>
  );
}