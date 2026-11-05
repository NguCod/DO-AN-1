import type { Product } from '../../types';
import { COLORS, SPACING } from '../../theme/constants';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const hasDiscount = product.attributes.stiffness === 'Extra Stiff';
  const originalPrice = hasDiscount ? Math.round(product.price * 1.15) : product.price;

  return (
    <div style={{ backgroundColor: COLORS.background, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', height: '100%', position: 'relative' }}
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 20px rgba(0,0,0,0.12)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ aspectRatio: '1', width: '100%', backgroundColor: COLORS.surface, overflow: 'hidden', position: 'relative' }}>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

        {hasDiscount && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            backgroundColor: '#FF4D4D',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
          }}>
            GIẢM 15%
          </div>
        )}
      </div>

      <div style={{ padding: SPACING.md, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ color: COLORS.textSecondary, fontSize: '0.75rem', marginBottom: '0.25rem' }}>{product.brand}</div>
        <h3 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          margin: '0 0 0.5rem 0',
          color: COLORS.textMain,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.4,
          letterSpacing: '-0.01em'
        }}>
          {product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.primary }}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(product.price)}
          </span>
          {hasDiscount && (
            <span style={{ fontSize: '0.75rem', color: COLORS.textSecondary, textDecoration: 'line-through' }}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(originalPrice)}
            </span>
          )}
        </div>

        <button onClick={handleAddToCart} style={{
          marginTop: 'auto',
          width: '100%',
          padding: '0.5rem',
          backgroundColor: COLORS.primary,
          color: COLORS.background,
          border: 'none',
          borderRadius: '0.25rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'opacity 0.2s'
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