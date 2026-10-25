import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Complaint } from '../../types';
import { aiChatService, ChatSessionState } from '../../services/aiChatService';
import { complaintService } from '../../services/complaintService';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from '../../router';
import { Bot, User, Send, RefreshCw, Volume2, Plus, AlertTriangle, ArrowRight } from '../common/Icons';
import { VoiceMic } from '../common/VoiceMic';

interface ChatInterfaceProps {
  initialPrompt?: string;
  isCompact?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialPrompt,
  isCompact = false
}) => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { language, speakText, isSpeaking, t } = useLanguage();
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState(initialPrompt || '');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionState, setSessionState] = useState<ChatSessionState>({ step: 'idle' });

  const SUGGESTED_PROMPTS = [
    'How do I report a pothole?',
    'My garbage has not been collected.',
    'How can I check my complaint status?',
    'How do I report a water supply issue?'
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: `Hello! I am **CivicPulse Assistant**.\n\nI can help answer municipal service guidelines, check complaint progress, or draft a complaint for automatic department assignment.\n\n*How can I assist you today?*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        { label: '🛣️ Pothole on Road', action: 'send_query', payload: 'How do I report a pothole?' },
        { label: '🗑️ Missed Garbage', action: 'send_query', payload: 'My garbage has not been collected.' },
        { label: '🔍 Check Status', action: 'send_query', payload: 'How can I check my complaint status?' },
        { label: '💧 Water Supply', action: 'send_query', payload: 'How do I report a water supply issue?' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiChatService.processMessage(text, sessionState, language);
      setIsTyping(false);
      setSessionState(response.newSessionState);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedComplaint: response.suggestedComplaint,
        suggestedActions: response.suggestedActions
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleActionClick = (action: string, payload?: any) => {
    if (action === 'direct_register' && payload) {
      try {
        const citizenId = user ? user.id : `usr-cit-${Date.now().toString().slice(-4)}`;
        const citizenName = user ? user.name : 'Citizen User';
        const citizenPhone = user ? user.phone : '+91 98490 12345';
        const citizenEmail = user ? user.email : 'citizen@hyderabad.gov.in';

        const created = complaintService.createComplaint({
          title: payload.title || 'Civic grievance reported via AI Assistant',
          description: payload.description || payload.title,
          category: payload.category || 'roads',
          priority: payload.priority || 'medium',
          aiSuggestedCategory: payload.aiSuggestedCategory || payload.category || 'roads',
          aiSuggestedPriority: payload.aiSuggestedPriority || payload.priority || 'medium',
          aiSuggestedDepartment: payload.assignedDepartment,
          area: payload.area || 'Madhapur',
          address: payload.address || `Near main junction, ${payload.area || 'Madhapur'}`,
          citizenId,
          citizenName,
          citizenPhone,
          citizenEmail,
          preferredContact: 'phone'
        });

        addNotification(
          `Complaint #${created.id} Registered via AI Chat`,
          `Your issue "${created.title}" is officially logged with ${created.assignedDepartment}.`,
          'success',
          created.id
        );

        const successMsg: ChatMessage = {
          id: `bot-reg-${Date.now()}`,
          sender: 'bot',
          text: `🎉 **COMPLAINT REGISTERED SUCCESSFULLY!**\n\n• **Official Reference ID**: \`#${created.id}\`\n• **Assigned Agency**: ${created.assignedDepartment}\n• **Target Resolution SLA**: ${created.slaHours} Hours\n• **Initial Status**: SUBMITTED (Dispatched for Field Review)\n\nYour grievance has been permanently saved in the municipal registry and is now active for tracking.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            { label: `🔍 Track Ticket #${created.id} Now`, action: 'navigate_track_id', payload: created.id },
            { label: '📋 View All My Complaints', action: 'navigate_complaints' },
            { label: '➕ Report Another Issue', action: 'send_query', payload: 'I want to report another problem' }
          ]
        };

        setMessages(prev => [...prev, successMsg]);
      } catch (err) {
        console.error('Failed to register complaint in chat', err);
      }
    } else if (action === 'navigate_track_id' && payload) {
      navigate(`/track?id=${payload}`);
    } else if (action === 'navigate_complaints') {
      navigate('/complaints');
    } else if (action === 'send_query' && payload) {
      handleSendMessage(payload);
    } else if (action === 'check_ticket' && payload) {
      handleSendMessage(payload);
    } else if (action === 'provide_location' && payload) {
      handleSendMessage(payload);
    } else if (action === 'fill_complaint_form' && payload) {
      navigate('/complaints/new', { state: { prefill: payload } });
    } else if (action === 'navigate_new_complaint') {
      navigate('/complaints/new', { state: { prefill: payload } });
    } else if (action === 'navigate_track') {
      navigate('/track');
    } else if (action === 'view_complaint' && payload) {
      navigate(`/complaints/${payload}`);
    } else if (action === 'reset_chat') {
      setSessionState({ step: 'idle' });
      handleSendMessage('Hello');
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'bot',
        text: 'Conversation history reset. How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: '🛣️ Report a Pothole', action: 'send_query', payload: 'How do I report a pothole?' },
          { label: '📝 New Complaint Form', action: 'navigate_new_complaint' }
        ]
      }
    ]);
    setSessionState({ step: 'idle' });
  };

  return (
    <div
      className={`flex flex-col bg-white border border-[#E4E7EC] rounded-2xl shadow-card overflow-hidden ${
        isCompact ? 'h-[490px]' : 'h-[calc(100vh-13rem)] min-h-[550px]'
      }`}
    >
      {/* Chat Header */}
      <div className="bg-[#142B4A] text-white px-4 py-3 flex items-center justify-between border-b border-[#1C3B65]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
            style={{ backgroundColor: '#0F9D91' }}
          >
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm">CivicPulse AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-[#16865C] animate-pulse" />
            </div>
            <span className="text-[10px] text-[#98A2B3] block">
              Automated Citizen Service Desk • Model Prototype
            </span>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          title="Clear conversation"
          className="p-1.5 rounded-lg text-[#98A2B3] hover:text-white hover:bg-[#1C3B65] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Emergency Disclaimer Banner */}
      <div className="bg-[#FEF7EC] border-b border-[#FCE7C5] px-3.5 py-1.5 text-[11px] text-[#B7791F] flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F] shrink-0" />
        <span>
          <strong>Notice:</strong> For active structural fires, medical crises, or live electrocutions, please call <strong>112</strong> immediately.
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F7FA]">
        {messages.map(msg => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                  isBot
                    ? 'bg-[#142B4A] text-[#0F9D91]'
                    : 'bg-[#0F9D91] text-white'
                }`}
              >
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble Container */}
              <div className="max-w-[85%] sm:max-w-[75%] space-y-1.5">
                <div
                  className={`rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                    isBot
                      ? 'bg-white border border-[#E4E7EC] text-[#1D2939] rounded-tl-xs'
                      : 'bg-[#142B4A] text-white rounded-tr-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Bubble Footer & Speech Reader */}
                <div
                  className={`flex items-center gap-2 text-[10px] text-[#667085] px-1 ${
                    isBot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isBot && (
                    <button
                      onClick={() => speakText(msg.text)}
                      title="Read response aloud"
                      className="text-[#667085] hover:text-[#0F9D91] transition-colors inline-flex items-center gap-0.5"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  )}
                </div>

                {/* Suggested Action Buttons */}
                {isBot && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act.action, act.payload)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white hover:bg-[#E6F6F5] text-[#0F9D91] border border-[#B8EBE6] shadow-2xs transition-all hover:border-[#0F9D91]"
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#142B4A] text-[#0F9D91] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-[#E4E7EC] rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs text-[#667085] flex items-center gap-2 shadow-xs">
              <span className="w-1.5 h-1.5 bg-[#0F9D91] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[#0F9D91] rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-[#0F9D91] rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px]">Consulting civic knowledge base...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-3 py-2 bg-white border-t border-[#E4E7EC] flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
        <span className="text-[11px] text-[#667085] font-semibold shrink-0">Suggestions:</span>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-full bg-[#F5F7FA] hover:bg-[#E6F6F5] text-[#1D2939] hover:text-[#0F9D91] border border-[#E4E7EC] hover:border-[#0F9D91] text-[11px] font-medium transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-[#E4E7EC] flex items-center gap-2"
      >
        <VoiceMic onTranscript={transcript => setInputVal(prev => prev ? `${prev} ${transcript}` : transcript)} />

        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Ask a question or describe an issue (e.g. 'Pothole on Jubilee Hills Road 36')..."
          className="input-base text-xs sm:text-sm py-2 px-3.5"
        />

        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="btn-primary p-2.5 rounded-xl shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
