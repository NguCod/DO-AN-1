import { Product } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme/constants';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div
      style={{
        backgroundColor: COLORS.background,
        borderRadius: '0.75rem',
        border: `1px solid ${COLORS.border}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 10px 15px -3px ${COLORS.border}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          aspectRatio: '3/4',
          width: '100%',
          backgroundColor: COLORS.surface,
          overflow: 'hidden',
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div
        style={{
          padding: SPACING.md,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ color: COLORS.textSecondary, fontSize: '0.75rem', marginBottom: '0.25rem' }}>
          {product.brand}
        </div>
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            margin: '0 0 0.5rem 0',
            color: COLORS.textMain,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: '1rem',
          }}
        >
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
          }).format(product.price)}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          style={{
            marginTop: 'auto',
            width: '100%',
            padding: '0.625rem',
            backgroundColor: COLORS.primary,
            color: COLORS.background,
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
