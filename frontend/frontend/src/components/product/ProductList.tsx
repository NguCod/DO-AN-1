import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { COLORS, SPACING } from '../../theme/constants';

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: `${SPACING.xl} 0`,
          color: COLORS.textSecondary,
        }}
      >
        <p>Không tìm thấy sản phẩm nào.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: SPACING.lg,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
