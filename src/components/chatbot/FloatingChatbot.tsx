import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { Bot, X } from '../common/Icons';

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-[360px] sm:w-[420px] shadow-modal rounded-2xl overflow-hidden border border-[#E4E7EC]">
          <div className="relative">
            <ChatInterface isCompact={true} />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-10 text-[#98A2B3] hover:text-white p-1 rounded transition-colors"
              title="Minimize chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#0F9D91]/30"
          style={{ backgroundColor: '#142B4A' }}
          title="Ask CivicPulse AI"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#0F9D91]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#0F9D91] rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#0F9D91] rounded-full" />
          </div>
          <span className="font-semibold text-xs pr-1">Ask CivicPulse AI</span>
        </button>
      )}
    </div>
  );
};
