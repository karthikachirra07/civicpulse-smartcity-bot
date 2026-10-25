import React, { createContext, useContext, useState } from 'react';
import { LanguageCode } from '../types';

interface UIStrings {
  appTitle: string;
  appSubtitle: string;
  navHome?: string;
  navChat: string;
  navComplaint: string;
  navTelemetry: string;
  navAdmin: string;
  registerComplaint: string;
  trackTicket: string;
  searchPlaceholder: string;
  categorySanitation: string;
  categoryWater: string;
  categoryElectricity: string;
  categoryRoads: string;
  categoryLights: string;
  categoryTax: string;
  categoryEmergency: string;
  voiceInputTooltip: string;
  voiceOutputToggle: string;
  highContrastToggle: string;
  statusSubmitted: string;
  statusVerified: string;
  statusInProgress: string;
  statusResolved: string;
  statusRejected: string;
  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;
  priorityEmergency: string;
}

const TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    appTitle: 'CivicPulse AI (Hyderabad)',
    appSubtitle: 'Greater Hyderabad (GHMC & HMWSSB) Smart Governance Portal',
    navChat: '24/7 AI Assistant',
    navComplaint: 'Register & Track Ticket',
    navTelemetry: 'Hyderabad Smart City Hub',
    navAdmin: 'GHMC Authority Dashboard',
    registerComplaint: 'Register New Complaint',
    trackTicket: 'Track Ticket Status',
    searchPlaceholder: 'Search tickets by ID (e.g. CP-HYD-9841) or location...',
    categorySanitation: 'GHMC Sanitation & Waste',
    categoryWater: 'HMWSSB Water Supply',
    categoryElectricity: 'TSSPDCL Smart Grid',
    categoryRoads: 'GHMC Roads & Potholes',
    categoryLights: 'Smart LED Streetlights',
    categoryTax: 'GHMC Property Tax (PTIN)',
    categoryEmergency: 'Emergency & Helplines',
    voiceInputTooltip: 'Click to Speak (Voice-to-Text)',
    voiceOutputToggle: 'Text-to-Speech Voice',
    highContrastToggle: 'High Contrast Mode',
    statusSubmitted: 'Submitted',
    statusVerified: 'Verified',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',
    statusRejected: 'Rejected',
    priorityLow: 'Low',
    priorityMedium: 'Medium',
    priorityHigh: 'High',
    priorityEmergency: 'Emergency'
  },
  te: {
    appTitle: 'సివిక్ పల్స్ AI (హైదరాబాద్)',
    appSubtitle: 'గ్రేటర్ హైదరాబాద్ (GHMC & HMWSSB) స్మార్ట్ పౌర సేవల పోర్టల్',
    navChat: '24/7 AI అసిస్టెంట్',
    navComplaint: 'ఫిర్యాదు నమోదు & ట్రాకింగ్',
    navTelemetry: 'హైదరాబాద్ లైవ్ సేవలు',
    navAdmin: 'GHMC అధికారుల డాష్‌బోర్డ్',
    registerComplaint: 'కొత్త ఫిర్యాదు నమోదు',
    trackTicket: 'ఫిర్యాదు స్టేటస్',
    searchPlaceholder: 'ID (ఉదా. CP-HYD-9841) ద్వారా వెతకండి...',
    categorySanitation: 'GHMC చెత్త & పరిశుభ్రత',
    categoryWater: 'జలమండలి (HMWSSB) మంచినీరు',
    categoryElectricity: 'TSSPDCL విద్యుత్',
    categoryRoads: 'GHMC రోడ్లు & గోతులు',
    categoryLights: 'వీధిదీపాలు',
    categoryTax: 'ఆస్తి పన్ను (PTIN)',
    categoryEmergency: 'అత్యవసర సహాయం',
    voiceInputTooltip: 'మాట్లాడటానికి క్లిక్ చేయండి',
    voiceOutputToggle: 'వాయిస్ సమాధానాలు',
    highContrastToggle: 'హై కాంట్రాస్ట్ మోడ్',
    statusSubmitted: 'నమోదైంది',
    statusVerified: 'పరిశీలించబడింది',
    statusInProgress: 'పురోగతిలో ఉంది',
    statusResolved: 'పరిష్కరించబడింది',
    statusRejected: 'తిరస్కరించబడింది',
    priorityLow: 'తక్కువ',
    priorityMedium: 'మధ్యస్థం',
    priorityHigh: 'ఎక్కువ',
    priorityEmergency: 'అత్యవసరం'
  },
  hi: {
    appTitle: 'सिविकपल्स AI (हैदराबाद)',
    appSubtitle: 'ग्रेटर हैदराबाद (GHMC & HMWSSB) नागरिक सेवा पोर्टल',
    navChat: '24/7 AI सहायक',
    navComplaint: 'शिकायत दर्ज व ट्रैक करें',
    navTelemetry: 'हैदराबाद स्मार्ट सिटी हब',
    navAdmin: 'GHMC प्राधिकरण डैशबोर्ड',
    registerComplaint: 'नई शिकायत दर्ज करें',
    trackTicket: 'शिकायत की स्थिति जांचें',
    searchPlaceholder: 'आईडी (जैसे CP-HYD-9841) या स्थान से खोजें...',
    categorySanitation: 'कचरा और सफाई',
    categoryWater: 'जल बोर्ड (HMWSSB) आपूर्ति',
    categoryElectricity: 'TSSPDCL बिजली',
    categoryRoads: 'जीएचएमसी सड़कें व गड्ढे',
    categoryLights: 'स्ट्रीट लाइट',
    categoryTax: 'संपत्ति कर (PTIN)',
    categoryEmergency: 'आपातकालीन सहायता',
    voiceInputTooltip: 'बोलने के लिए क्लिक करें',
    voiceOutputToggle: 'वॉइस आउटपुट',
    highContrastToggle: 'हाई कॉन्ट्रास्ट मोड',
    statusSubmitted: 'दर्ज किया गया',
    statusVerified: 'सत्यापित',
    statusInProgress: 'प्रगति पर है',
    statusResolved: 'हल हो गया',
    statusRejected: 'अस्वीकृत',
    priorityLow: 'कम',
    priorityMedium: 'मध्यम',
    priorityHigh: 'उच्च',
    priorityEmergency: 'आपातकालीन'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: UIStrings;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`~]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const langMap: Record<LanguageCode, string> = {
      en: 'en-IN',
      te: 'te-IN',
      hi: 'hi-IN'
    };

    utterance.lang = langMap[language] || 'en-IN';
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, speakText, isSpeaking, stopSpeaking }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
