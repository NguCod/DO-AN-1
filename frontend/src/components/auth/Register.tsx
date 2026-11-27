import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS, SPACING } from '../../theme/constants';
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin } from 'lucide-react';

export function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surface, padding: SPACING.lg }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ backgroundColor: COLORS.background, borderRadius: '1rem', padding: SPACING.xl, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING.lg }}>
            <Link to="/" style={{ display: 'inline-block', fontSize: '1.75rem', fontWeight: 800, color: COLORS.primary, textDecoration: 'none', marginBottom: SPACING.md }}>
              ⚡ Ace Badminton
            </Link>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: SPACING.xs }}>Đăng ký tài khoản</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: '0.875rem' }}>Tạo tài khoản để mua sắm và nhận tư vấn AI.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: SPACING.md }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.xs }}>Họ và tên *</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    required
                    style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 2.5rem`, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.9375rem' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.xs }}>Email *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    required
                    style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 2.5rem`, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.9375rem' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.xs }}>Số điện thoại</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 2.5rem`, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.9375rem' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.xs }}>Địa chỉ</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ"
                    style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 2.5rem`, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.9375rem' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.xs }}>Mật khẩu *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Tối thiểu 6 ký tự"
                    required
                    minLength={6}
                    style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 2.5rem`, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.9375rem' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: COLORS.textSecondary }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.xs }}>Xác nhận mật khẩu *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    required
                    style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 2.5rem`, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.9375rem' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: SPACING.md }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: SPACING.xs, fontSize: '0.875rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required style={{ marginTop: '0.25rem' }} />
                <span>Tôi đồng ý với{' '}<Link to="/terms" style={{ color: COLORS.primary, textDecoration: 'none' }}>Điều khoản</Link>{' '}và{' '}<Link to="/privacy" style={{ color: COLORS.primary, textDecoration: 'none' }}>Chính sách bảo mật</Link></span>
              </label>
            </div>

            <button type="submit" disabled={isLoading || !agreeTerms} style={{ width: '100%', marginTop: SPACING.lg, padding: `${SPACING.md} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', opacity: (isLoading || !agreeTerms) ? 0.7 : 1 }}>
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </form>

          <div style={{ marginTop: SPACING.lg, textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>
              Đã có tài khoản?{' '}
              <Link to="/login" style={{ color: COLORS.primary, fontWeight: 600, textDecoration: 'none' }}>Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}