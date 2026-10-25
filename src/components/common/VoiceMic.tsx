import React, { useState } from 'react';
import { Mic, MicOff } from './Icons';
import { useLanguage } from '../../context/LanguageContext';

export const VoiceMic: React.FC<{
  onTranscript: (text: string) => void;
  className?: string;
}> = ({ onTranscript, className = '' }) => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your current browser. You can type directly.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const langMap: Record<string, string> = {
        en: 'en-IN',
        te: 'te-IN',
        hi: 'hi-IN'
      };

      recognition.lang = langMap[language] || 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        if (text) {
          onTranscript(text);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      title={isListening ? 'Stop microphone dictation' : 'Voice input (Speech to Text)'}
      className={`relative inline-flex items-center justify-center rounded-lg p-2 transition-all ${
        isListening
          ? 'bg-rose-500 text-white shadow-md ring-2 ring-rose-300'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
      } ${className}`}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-400 rounded-full animate-ping" />
        </>
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
};
