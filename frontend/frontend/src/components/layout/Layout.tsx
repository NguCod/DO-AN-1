import { ReactNode, useState } from 'react';
import { Header } from '../components/layout/Header';
import { ChatInterface } from '../components/chat/ChatInterface';
import { COLORS, SPACING } from '../theme/constants';

interface LayoutProps {
  children: ReactNode;
  cartItemCount?: number;
}

export function Layout({ children, cartItemCount = 0 }: LayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.background,
        color: COLORS.textMain,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Header cartItemCount={cartItemCount} />

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: `${SPACING.lg} ${SPACING.md}`,
          boxSizing: 'border-box',
        }}
      >
        {children}
      </main>

      <footer
        style={{
          backgroundColor: COLORS.secondary,
          color: COLORS.background,
          padding: `${SPACING.xl} ${SPACING.md}`,
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: SPACING.xl,
          }}
        >
          <div>
            <h3 style={{ color: COLORS.accent, marginBottom: SPACING.md }}>BadmintonAI Shop</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              Chuyên cung cấp dụng cụ cầu lông chất lượng cao và tư vấn AI chuyên nghiệp.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: SPACING.sm }}>Danh mục</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem', opacity: 0.8 }}>
              <li style={{ marginBottom: '0.5rem' }}>Vợt cầu lông</li>
              <li style={{ marginBottom: '0.5rem' }}>Giày cầu lông</li>
              <li style={{ marginBottom: '0.5rem' }}>Phụ kiện</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>Liên hệ</h4>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Email: support@badmintonai.shop</p>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: SPACING.xl,
            paddingTop: SPACING.md,
            borderTop: `1px solid rgba(255,255,255,0.1)`,
            fontSize: '0.75rem',
            opacity: 0.5,
          }}
        >
          © {new Date().getFullYear()} BadmintonAI Shop. All rights reserved.
        </div>
      </footer>

      {/* Chat Floating Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          position: 'fixed',
          bottom: SPACING.lg,
          right: SPACING.lg,
          zIndex: 100,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: COLORS.primary,
          color: COLORS.background,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        {isChatOpen ? '✕' : '💬'}
      </button>

      {/* Chat Modal */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: SPACING.lg,
            zIndex: 99,
          }}
        >
          <ChatInterface onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
}