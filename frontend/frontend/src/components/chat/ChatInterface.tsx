import { useState, FormEvent } from 'react';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme/constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClose?: () => void;
}

const SUGGESTED_QUESTIONS = [
  'Tìm vợt cầu lông dưới 2 triệu',
  'Tôi thích chơi phòng thủ, đề xuất vợt nào?',
  'So sánh Victor Thruster F và Lining Tectonic',
  'Có vợt nào phù hợp cho người mới không?',
];

export function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      const botMessage: Message = {
        role: 'assistant',
        content: `Tôi sẽ tìm hiểu về: "${userMessage.content}" cho bạn ngay. (Tính năng tư vấn AI đang phát triển)`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{ height: '600px', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}`, borderRadius: '0.75rem', overflow: 'hidden' }}>
      <div style={{ padding: SPACING.md, backgroundColor: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.primary }}>Tư vấn mua hàng AI</h3>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: COLORS.textSecondary }}>✕</button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: SPACING.md, display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
        {messages.map((message) => (
          <div
            key={message.timestamp.getTime()}
            style={{
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: SPACING.md,
              borderRadius: '0.5rem',
              backgroundColor: message.role === 'user' ? COLORS.surface : COLORS.primary,
              color: message.role === 'user' ? COLORS.textMain : COLORS.background,
              fontSize: '0.875rem',
            }}
          >
            <div>{message.content}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>{message.timestamp.toLocaleTimeString()}</div>
          </div>
        ))}

        {isLoading && (
          <div style={{ color: COLORS.textSecondary, fontStyle: 'italic' }}>AI đang suy nghĩ...</div>
        )}
      </div>

      <div style={{ padding: SPACING.md, borderTop: `1px solid ${COLORS.border}` }}>
        {messages.length === 0 && (
          <div style={{ marginBottom: SPACING.md, display: 'flex', flexWrap: 'wrap', gap: SPACING.sm }}>
            {SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => setInputValue(question)}
                style={{
                  padding: `${SPACING.xs} ${SPACING.sm}`, border: `1px solid ${COLORS.primary}`, backgroundColor: 'transparent',
                  color: COLORS.primary, borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem',
                }}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: SPACING.sm }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Bạn cần tư vấn gì? (ví dụ: Tìm vợt giá dưới 3 triệu)"
            style={{ flex: 1, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '0.375rem', border: `1px solid ${COLORS.border}` }}
          />
          <button type="submit" disabled={isLoading} style={{ padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>{isLoading ? 'Đang xử lý...' : 'Gửi'}</button>
        </form>
      </div>
    </div>
  );
}