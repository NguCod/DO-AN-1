import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { COLORS, SPACING } from '../../theme/constants';
import { User } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, { username: data.username, role: data.role });
        navigate('/admin');
      } else {
        setError(data.error || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background }}>
      <div style={{ backgroundColor: COLORS.surface, padding: SPACING.xl, borderRadius: '0.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING.md }}>
          <User size={48} style={{ color: COLORS.primary }} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: SPACING.lg, color: COLORS.textMain }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: SPACING.md, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '1rem' }}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: SPACING.md, borderRadius: '0.5rem', border: `1px solid ${COLORS.border}`, fontSize: '1rem' }}
            required
          />
          {error && <p style={{ color: COLORS.error, fontSize: '0.875rem', marginBottom: SPACING.sm }}>{error}</p>}
          <button
            type="submit"
            style={{ padding: SPACING.md, backgroundColor: COLORS.primary, color: COLORS.background, borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
