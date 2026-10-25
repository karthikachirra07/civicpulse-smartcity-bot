import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DemoBanner } from '../components/common/DemoBanner';
import { ChatInterface } from '../components/chatbot/ChatInterface';
import { useLocation } from '../router';

export const ChatbotPage: React.FC = () => {
  const { state } = useLocation();
  const initialPrompt = state?.initialPrompt;

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans text-[#1D2939]">
      <DemoBanner />
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F9D91] animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-[#142B4A]">
              CivicPulse AI Assistant
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            An intelligent assistant that answers civic-service inquiries, guides municipal department procedures, and drafts verified complaint tickets.
          </p>
        </div>

        <div className="flex-1">
          <ChatInterface initialPrompt={initialPrompt} />
        </div>
      </main>

      <Footer />
    </div>
  );
};
