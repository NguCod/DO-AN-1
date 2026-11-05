import { ProductList } from './ProductList';
import { MOCK_PRODUCTS } from '../data';

export function Home() {
  return (
    <div style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          Chào mừng đến với BadmintonAI Shop
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          Trải nghiệm mua sắm dụng cụ cầu lông chuyên nghiệp với tư vấn AI thông minh.
          Tìm kiếm sản phẩm theo danh mục, thương hiệu hoặc giá cả.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
          <ProductList products={MOCK_PRODUCTS} onAddToCart={(product) => {
            console.log('Add to cart:', product);
          }} />
        </div>
      </div>
    </div>
  );
}