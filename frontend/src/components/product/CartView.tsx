import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SPACING, COLORS } from '../../theme/constants'
import { ArrowRight, Plus, Minus, Trash2 } from 'lucide-react'
import { fetchCart, deleteCartItem } from '../../services/api'
import { useUser } from '../../context/UserContext'

export function CartView() {
  const { isAuthenticated } = useUser()
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const loadCart = async () => {
    if (!token) return
    setLoading(true)
    try {
      const cart = await fetchCart(token)
      setCartItems(cart.items || [])
    } catch (e) {
      console.error('Failed to load cart', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [isAuthenticated])

  const updateQuantity = async (itemId: number, newQty: number) => {
    if (!token) return
    if (newQty <= 0) {
      await deleteCartItem(token, itemId)
      setCartItems(prev => prev.filter(i => i.id !== itemId))
      return
    }
    // Simpler approach: just re-fetch for quantity changes since backend doesn't expose PATCH
    await loadCart()
  }

  const removeFromCart = async (itemId: number) => {
    if (!token) return
    await deleteCartItem(token, itemId)
    setCartItems(prev => prev.filter(i => i.id !== itemId))
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + parseFloat(item.priceAtTime.replace(/[^\d.]/g, '')) * item.quantity, 0)

  if (loading) {
    return (
      <div style={{ padding: `${SPACING['2xl']} 0`, textAlign: 'center' }}>
        <div>Đang tải giỏ hàng...</div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: `${SPACING['2xl']} 0`, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: SPACING.lg }}>🛒</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.md }}>Giỏ hàng trống</h1>
        <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.xl }}>Chưa có sản phẩm nào trong giỏ hàng của bạn.</p>
        <button onClick={() => navigate('/products')} style={{ padding: `${SPACING.md} ${SPACING.xl}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: SPACING.sm }}>
          Tiếp tục mua sắm <ArrowRight size={20} />
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: `${SPACING.md} 0`, maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.lg }}>Giỏ hàng ({cartItems.length} sản phẩm)</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
        {cartItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: SPACING.md, padding: SPACING.md, backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}`, borderRadius: '0.75rem', alignItems: 'center' }}>
            <div style={{ width: '96px', height: '96px', flexShrink: 0, borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: COLORS.surface }}>
              <img src={item.product?.imageUrl} alt={item.product?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 600, color: COLORS.textMain, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product?.name}</h3>
              <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: '0.875rem' }}>{item.product?.brand?.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.sm }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '32px', height: '32px', border: `1px solid ${COLORS.border}`, borderRadius: '0.375rem', cursor: 'pointer', backgroundColor: COLORS.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Minus size={16} />
                </button>
                <span style={{ minWidth: '36px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600 }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '32px', height: '32px', border: `1px solid ${COLORS.border}`, borderRadius: '0.375rem', cursor: 'pointer', backgroundColor: COLORS.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={16} />
                </button>
                <span style={{ marginLeft: 'auto', fontSize: '1rem', fontWeight: 700, color: COLORS.primary }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(parseFloat(item.priceAtTime.replace(/[^\d.]/g, '')) * item.quantity)}
                </span>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} style={{ padding: '0.5rem', backgroundColor: 'transparent', color: COLORS.error, border: `1px solid ${COLORS.error}`, borderRadius: '0.375rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: SPACING.xl, backgroundColor: COLORS.surface, borderRadius: '0.75rem', padding: SPACING.lg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 700, marginBottom: SPACING.md }}>
          <span>Tổng cộng:</span>
          <span style={{ color: COLORS.primary }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(totalAmount)}</span>
        </div>
        <button onClick={handleCheckout} disabled={cartItems.length === 0} style={{ width: '100%', padding: '1rem', backgroundColor: cartItems.length > 0 ? COLORS.primary : COLORS.border, color: cartItems.length > 0 ? COLORS.background : COLORS.textSecondary, border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem', cursor: cartItems.length > 0 ? 'pointer' : 'not-allowed', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm }}>
          Tiến hành thanh toán <ArrowRight size={20} />
        </button>
        <p style={{ textAlign: 'center', marginTop: SPACING.md, fontSize: '0.75rem', color: COLORS.textSecondary }}>Hoặc <button onClick={() => navigate('/products')} style={{ color: COLORS.primary, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>tiếp tục mua sắm</button></p>
      </div>
    </div>
  )
}