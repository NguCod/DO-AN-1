import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { COLORS, SPACING } from '../../theme/constants';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart?: (product: Product) => void;
}

function SkeletonCard() {
  return (
    <div style={{ backgroundColor: COLORS.background, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ aspectRatio: '1', width: '100%', backgroundColor: COLORS.surface, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'skeleton-shimmer 1.5s infinite' }} />
      </div>
      <div style={{ padding: SPACING.md, display: 'flex', flexDirection: 'column', gap: SPACING.sm, flex: 1 }}>
        <div style={{ height: '0.75rem', width: '40%', backgroundColor: COLORS.surface, borderRadius: '2px' }} />
        <div style={{ height: '1rem', width: '90%', backgroundColor: COLORS.surface, borderRadius: '2px' }} />
        <div style={{ height: '1.25rem', width: '60%', backgroundColor: COLORS.surface, borderRadius: '2px', marginTop: SPACING.xs }} />
        <div style={{ height: '2.5rem', width: '100%', backgroundColor: COLORS.surface, borderRadius: '0.25rem', marginTop: 'auto' }} />
      </div>
    </div>
  );
}

export function ProductList({ products, isLoading }: ProductListProps) {
  if (isLoading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: SPACING.lg }}>
        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return <div style={{ textAlign: 'center', padding: `${SPACING.xl} 0`, color: COLORS.textSecondary }}><p>Không tìm thấy sản phẩm nào.</p></div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: SPACING.lg }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}