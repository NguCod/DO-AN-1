import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SPACING, COLORS } from '../../theme/constants'
import { fetchOrders } from '../../services/api'
import { useUser } from '../../context/UserContext'
import { ArrowLeft } from 'lucide-react'

const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0
  const map: Record<string, number> = { 'triệu': 1_000_000, 'tỷ': 1_000_000_000 }
  const clean = priceStr.toLowerCase().replace(/[\d,.–]/g, '').trim()
  const nums = priceStr.match(/[\d,.]+/g)
  if (!nums || nums.length === 0) return 0
  const num = parseFloat(nums[nums.length - 1].replace(',', '.'))
  return num * (map[clean] || 1)
}

export function OrderHistory() {
  const { isAuthenticated } = useUser()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    loadOrders()
  }, [isAuthenticated])

  const loadOrders = async () => {
    if (!token) return
    setLoading(true)
    try {
      const data = await fetchOrders(token)
      setOrders(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Failed to load orders', e)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const statusLabel: Record<string, string> = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    shipped: 'Đã giao',
    delivered: 'Đã nhận hàng',
    cancelled: 'Đã hủy',
  }

  const statusColor: Record<string, string> = {
    pending: '#f59e0b',
    processing: COLORS.primary,
    shipped: '#3b82f6',
    delivered: '#22c55e',
    cancelled: COLORS.error,
  }

  if (loading) {
    return <div style={{ padding: `${SPACING['2xl']} 0`, textAlign: 'center' }}>Đang tải lịch sử đơn hàng...</div>
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: `${SPACING['2xl']} 0`, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: SPACING.lg }}>📦</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.md }}>Chưa có đơn hàng</h1>
        <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.xl }}>Bạn chưa đặt đơn hàng nào.</p>
        <button onClick={() => navigate('/products')} style={{ padding: `${SPACING.md} ${SPACING.xl}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
          Mua sắm ngay
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: `${SPACING.md} 0`, maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.lg }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, color: COLORS.textSecondary, cursor: 'pointer', background: 'none', border: 'none', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: SPACING.lg }}>Lịch sử đơn hàng</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
        {orders.map((order) => (
          <div key={order.id} style={{ backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}`, borderRadius: '0.75rem', padding: SPACING.lg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: SPACING.sm }}>
              <div>
                <span style={{ fontWeight: 700 }}>Đơn #</span>
                <span style={{ fontWeight: 700, color: COLORS.primary }}>{order.id}</span>
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                <span style={{
                  display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px',
                  backgroundColor: statusColor[order.status] || COLORS.textSecondary,
                  color: COLORS.background, fontWeight: 600,
                }}>
                  {statusLabel[order.status] || order.status}
                </span>
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: COLORS.textSecondary, marginBottom: SPACING.md }}>
              {new Date(order.createdAt).toLocaleString('vi-VN')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs, marginBottom: SPACING.md }}>
              {(order.items || []).map((item: any) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>{item.product?.name || 'Sản phẩm'} x{item.quantity}</span>
                  <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(parsePrice(item.priceAtTime))}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${COLORS.border}`, paddingTop: SPACING.md, fontSize: '1rem', fontWeight: 700 }}>
              <span>Tổng cộng</span>
              <span style={{ color: COLORS.primary }}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(parsePrice(order.totalAmount))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
