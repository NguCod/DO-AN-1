import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { COLORS, SPACING } from '../../theme/constants';

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <div style={{ textAlign: 'center', padding: `${SPACING.xl} 0`, color: COLORS.textSecondary }}><p>Khong tìm thấy san pham nao.</p></div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: SPACING.lg }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}