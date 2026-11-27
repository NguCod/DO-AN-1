import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { COLORS, SPACING } from '../../theme/constants';
import { sendChatMessage } from '../../services/api';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMsgCount = useRef(0);

  // Auto-scroll when messages change
  useEffect(() => {
    if (messages.length !== prevMsgCount.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevMsgCount.current = messages.length;
    }
  }, [messages.length]);

  const buildHistory = () =>
    messages.map((m) => ({ role: m.role, content: m.content }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputValue, timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(userMessage.content, buildHistory());
      const botMessage: Message = { role: 'assistant', content: reply, timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errMsg: Message = {
        role: 'assistant',
        content: 'Xin lỗi, không thể kết nối tới máy chủ AI. Vui lòng thử lại sau.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: '600px', width: '400px', maxWidth: '90vw', display: 'flex', flexDirection: 'column', backgroundColor: COLORS.background, border: `1px solid ${COLORS.border}`, borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
      <div style={{ padding: SPACING.md, backgroundColor: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: COLORS.primary }}>Tư vấn mua hàng AI</h3>
        {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: COLORS.textSecondary }}>✕</button>}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: SPACING.md, display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
        {messages.length === 0 && !isLoading && (
          <div style={{ textAlign: 'center', color: COLORS.textSecondary, fontSize: '0.875rem', padding: SPACING.md }}>
            Xin chào! 👋 Tôi là trợ lý tư vấn cầu lông của Ace Badminton.<br />
            Hãy cho tôi biết trình độ, lối chơi và ngân sách của bạn nhé!
          </div>
        )}
        {messages.map((message) => (
          <div key={message.timestamp.getTime()} style={{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%', padding: SPACING.sm, borderRadius: '0.5rem', backgroundColor: message.role === 'user' ? COLORS.primary : COLORS.surface, color: message.role === 'user' ? COLORS.background : COLORS.textMain, fontSize: '0.875rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            <div>{message.content}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>{message.timestamp.toLocaleTimeString()}</div>
          </div>
        ))}
        {isLoading && (
          <div style={{ color: COLORS.textSecondary, fontStyle: 'italic', fontSize: '0.875rem', alignSelf: 'flex-start', padding: SPACING.xs }}>
            <span style={{ display: 'inline-block', width: '12px', height: '12px', border: `2px solid ${COLORS.border}`, borderTopColor: COLORS.primary, borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            AI đang tư vấn...
          </div>
        )}
        <div ref={messagesEndRef} />
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
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Bạn cần tư vấn gì?" style={{ flex: 1, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '0.375rem', border: `1px solid ${COLORS.border}` }} />
          <button type="submit" disabled={isLoading} style={{ padding: `${SPACING.sm} ${SPACING.lg}`, backgroundColor: COLORS.primary, color: COLORS.background, border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>{isLoading ? 'Đang xử lý...' : 'Gửi'}</button>
        </form>
      </div>
    </div>
  );
}