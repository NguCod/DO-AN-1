import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { COLORS, SPACING } from '../../theme/constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: SPACING.xl, textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: SPACING.md }}>⚠️</div>
          <h2 style={{ color: COLORS.textMain, marginBottom: SPACING.sm }}>Đã có lỗi xảy ra</h2>
          <p style={{ color: COLORS.textSecondary, fontSize: '0.875rem', marginBottom: SPACING.lg }}>Vui lòng thử tải lại trang hoặc quay lại sau.</p>
          <button onClick={() => window.location.reload()} style={{ padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 600 }}>
            Tải lại trang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
