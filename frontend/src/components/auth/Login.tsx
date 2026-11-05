import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS, SPACING } from '../../theme/constants';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login — replace with real API call when backend is ready
    setTimeout(() => {
      login({
        id: 'user-1',
        name: email.split('@')[0],
        email: email,
      });
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.surface, padding: SPACING.lg }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ backgroundColor: COLORS.background, borderRadius: '1rem', padding: SPACING.xl, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING.xl }}>
            <Link to="/" style={{ display: 'inline-block', fontSize: '1.75rem', fontWeight: 800, color: COLORS.primary, textDecoration: 'none', marginBottom: SPACING.md }}>
              ⚡ BadmintonAI
            </Link>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: SPACING.xs }}>Đăng nhập</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: '0.875rem' }}>Chào mừng trở lại! Vui lòng đăng nhập.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: SPACING.md }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.xs }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                  style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 2.5rem`, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.9375rem' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: SPACING.md }}>
              <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: SPACING.xs }}>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: COLORS.textSecondary }} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  style={{ width: '100%', padding: `${SPACING.sm} ${SPACING.md} ${SPACING.sm} 2.5rem`, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '0.9375rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: COLORS.textSecondary }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs, fontSize: '0.875rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                Ghi nhớ đăng nhập
              </label>
              <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: COLORS.primary, textDecoration: 'none' }}>Quên mật khẩu?</Link>
            </div>

            <button type="submit" disabled={isLoading} style={{ width: '100%', padding: `${SPACING.md} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>

          <div style={{ marginTop: SPACING.lg, textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: COLORS.textSecondary }}>
              Chưa có tài khoản?{' '}
              <Link to="/register" style={{ color: COLORS.primary, fontWeight: 600, textDecoration: 'none' }}>Đăng ký ngay</Link>
            </p>
          </div>

          <div style={{ marginTop: SPACING.lg, paddingTop: SPACING.lg, borderTop: `1px solid ${COLORS.border}` }}>
            <p style={{ fontSize: '0.75rem', color: COLORS.textSecondary, textAlign: 'center' }}>
              Khi đăng nhập, bạn đồng ý với{' '}
              <Link to="/terms" style={{ color: COLORS.primary, textDecoration: 'none' }}>Điều khoản</Link>
              {' '}và{' '}
              <Link to="/privacy" style={{ color: COLORS.primary, textDecoration: 'none' }}>Chính sách bảo mật</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}