import { useState, FormEvent } from 'react';
import { COLORS, SPACING } from '../../theme/constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClose?: () => void;
}

const SUGGESTED_QUESTIONS = [
  'Tìm vợt cau long dưới 2 triệu',
  'Tôi thích chơi phòng thu, đề xuất vợt nào?',
  'So sánh Victor Thruster F va Lining Tectonic',
  'Có vợt nào phù hợp cho nguời mới không?',
];

export function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: 'user', content: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        role: 'assistant',
        content: `Toi se tim hieu ve: "${userMessage.content}" cho ban ngay. (Tinh nang tu van AI dang phat trien)`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{ height: '600px', width: '400px', maxWidth: '90vw', display: 'flex', flexDirection: 'column', backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}`, borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
      <div style={{ padding: SPACING.md, backgroundColor: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.primary }}>Tu van mua hang AI</h3>
        {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: COLORS.textSecondary }}>✕</button>}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: SPACING.md, display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
        {messages.map((message) => (
          <div key={message.timestamp.getTime()} style={{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', padding: SPACING.sm, borderRadius: '0.5rem', backgroundColor: message.role === 'user' ? COLORS.primary : COLORS.surface, color: message.role === 'user' ? COLORS.background : COLORS.textMain, fontSize: '0.875rem' }}>
            <div>{message.content}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>{message.timestamp.toLocaleTimeString()}</div>
          </div>
        ))}
        {isLoading && <div style={{ color: COLORS.textSecondary, fontStyle: 'italic' }}>AI dang suy nghi...</div>}
      </div>

      <div style={{ padding: SPACING.md, borderTop: `1px solid ${COLORS.border}` }}>
        {messages.length === 0 && (
          <div style={{ marginBottom: SPACING.sm, display: 'flex', flexWrap: 'wrap', gap: SPACING.xs }}>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button key={q} onClick={() => setInputValue(q)} style={{ padding: `${SPACING.xs} ${SPACING.sm}`, border: `1px solid ${COLORS.primary}`, backgroundColor: 'transparent', color: COLORS.primary, borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.75rem' }}>{q}</button>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: SPACING.sm }}>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ban can tu van gi?" style={{ flex: 1, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '0.375rem', border: `1px solid ${COLORS.border}` }} />
          <button type="submit" disabled={isLoading} style={{ padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>{isLoading ? 'Dang xu ly...' : 'Gửi'}</button>
        </form>
      </div>
    </div>
  );
}