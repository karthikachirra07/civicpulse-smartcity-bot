import { ChatMessage, Complaint, ComplaintCategory, ComplaintPriority } from '../types';
import { complaintService } from './complaintService';

export interface ChatSessionState {
  draftComplaint?: Partial<Complaint>;
  step?: 'idle' | 'awaiting_location' | 'awaiting_description' | 'ready_to_register';
}

export const KNOWLEDGE_BASE = [
  {
    topic: 'water_timings',
    keywords: ['water', 'drinking water', 'timings', 'hmwssb', 'tanker', 'pipeline', 'pressure', 'manjeera'],
    category: 'water' as ComplaintCategory,
    response: {
      en: 'Municipal drinking water supply is scheduled every alternate day from 6:00 AM – 9:30 AM and 5:00 PM – 8:30 PM. Dial 155304 for dial-a-tanker booking or report supply disruptions here.',
      te: 'హైదరాబాద్ జలమండలి మంచినీటి సరఫరా ప్రతి రెండవ రోజు ఉదయం 6:00 - 9:30 మరియు సాయంత్రం 5:00 - 8:30 వరకు ఉంటుంది. ట్యాంకర్ కొరకు 155304 కు కాల్ చేయండి.',
      hi: 'नगर निगम पेयजल आपूर्ति हर दूसरे दिन सुबह 6:00 से 9:30 और शाम 5:00 से 8:30 बजे तक होती है। टैंकर बुकिंग के लिए 155304 डायल करें।'
    }
  },
  {
    topic: 'garbage_collection',
    keywords: ['garbage', 'trash', 'waste', 'swachh auto', 'tipper', 'dump', 'cleaning', 'segregation'],
    category: 'garbage' as ComplaintCategory,
    response: {
      en: 'Door-to-door Swachh Auto Tippers collect segregated wet (green) and dry (blue) waste daily between 7:00 AM and 11:30 AM. Missed collection routes are addressed within 24 hours under municipal SLA.',
      te: 'స్వచ్ఛ ఆటోల ద్వారా ప్రతిరోజూ ఉదయం 7:00 నుండి 11:30 వరకు తడి మరియు పొడి చెత్త సేకరణ జరుగుతుంది. చెత్త సేకరించకపోతే 24 గంటల్లో పరిష్కరించబడుతుంది.',
      hi: 'डोर-टू-डोर स्वच्छ ऑटो टिपर प्रतिदिन सुबह 7:00 से 11:30 बजे तक गीला और सूखा कचरा एकत्र करते हैं। शिकायत पर 24 घंटे में सफाई होती है।'
    }
  },
  {
    topic: 'property_tax',
    keywords: ['property tax', 'ptin', 'tax rebate', 'assessment', 'rebate', 'due date', 'ghmc tax'],
    category: 'other' as ComplaintCategory,
    response: {
      en: 'Property tax can be paid using your 10-digit PTIN (Property Tax Identification Number) on the municipal portal. Early bird payments before April 30 qualify for a 5% instant rebate.',
      te: 'మీ 10-అంకెల PTIN ద్వారా ఆస్తి పన్ను ఆన్‌లైన్‌లో చెల్లించవచ్చు. ఏప్రిల్ 30 లోగా చెల్లిస్తే 5% రిబేట్ లభిస్తుంది.',
      hi: 'अपने 10-अंकों के PTIN का उपयोग करके संपत्ति कर का ऑनलाइन भुगतान करें। 30 अप्रैल से पहले 5% छूट का लाभ उठाएं।'
    }
  },
  {
    topic: 'streetlights',
    keywords: ['streetlight', 'light', 'pole', 'dark road', 'lamp', 'led', 'flickering'],
    category: 'streetlights' as ComplaintCategory,
    response: {
      en: 'Smart LED streetlights are connected to central telemetry. Report dark streetlights with pole number and landmark for automated 12–24 hour technician dispatch.',
      te: 'వీధిదీపాలు పని చేయకపోతే పోల్ నంబర్ లేదా లొకేషన్‌తో ఫిర్యాదు చేయండి. 12-24 గంటల్లో సాంకేతిక సిబ్బంది బాగు చేస్తారు.',
      hi: 'स्मार्ट एलईडी स्ट्रीट लाइट की खराबी पर पोल नंबर व स्थान बताएं। 12-24 घंटे के भीतर मरम्मत की जाती है।'
    }
  },
  {
    topic: 'potholes',
    keywords: ['pothole', 'road damaged', 'cavity', 'asphalt', 'crater', 'bridge', 'manhole'],
    category: 'roads' as ComplaintCategory,
    response: {
      en: 'Emergency mobile road repair teams inspect and patch potholes. Dangerous road cave-ins or open manholes trigger high-priority 12-hour resolution SLA.',
      te: 'రోడ్డు గోతులు మరియు ప్రమాదకర గుంతలు 12 గంటల్లో అత్యవసర మరమ్మతులు చేయబడతాయి.',
      hi: 'गड्डों और खतरनाक सड़कों की मरम्मत हेतु 12 घंटे की आपातकालीन सेवा उपलब्ध है।'
    }
  },
  {
    topic: 'emergency_numbers',
    keywords: ['emergency', 'helpline', 'fire', 'ambulance', 'police', 'control room', 'disaster', 'sos'],
    category: 'other' as ComplaintCategory,
    response: {
      en: '24/7 Smart City Emergency Helplines:\n• Central Municipal Control Room: 040-21111111\n• Water Supply Emergency: 155304\n• Police Control: 100 / 112\n• Ambulance & Disaster Management: 108\n• Fire & Rescue: 101',
      te: '24/7 అత్యవసర నంబర్లు:\n• కంట్రోల్ రూమ్: 040-21111111\n• జలమండలి: 155304\n• పోలీస్: 100 / 112\n• ఆంబులెన్స్: 108 | ఫైర్: 101',
      hi: '24/7 आपातकालीन नंबर:\n• नगर निगम कंट्रोल रूम: 040-21111111\n• जल बोर्ड: 155304\n• पुलिस: 100 / 112\n• एम्बुलेंस: 108'
    }
  }
];

export const aiChatService = {
  detectIntent: (input: string): {
    intent: 'service_enquiry' | 'new_complaint' | 'complaint_status' | 'department_info' | 'emergency_guidance' | 'general';
    category?: ComplaintCategory;
    priority?: ComplaintPriority;
    extractedTicketId?: string;
  } => {
    const text = input.toLowerCase();

    // Check for ticket ID match like SC-2026-0001
    const ticketMatch = text.match(/SC-\d{4}-\d{4}/i);
    if (ticketMatch) {
      return { intent: 'complaint_status', extractedTicketId: ticketMatch[0].toUpperCase() };
    }

    if (text.includes('status') || text.includes('track') || text.includes('progress') || text.includes('ticket')) {
      return { intent: 'complaint_status' };
    }

    if (text.includes('emergency') || text.includes('fire') || text.includes('accident') || text.includes('helpline') || text.includes('sos') || text.includes('police')) {
      return { intent: 'emergency_guidance' };
    }

    if (text.includes('department') || text.includes('office') || text.includes('contact') || text.includes('phone number') || text.includes('officer')) {
      return { intent: 'department_info' };
    }

    // Check for complaint problem keywords
    const complaintIndicators = [
      'broken', 'leak', 'burst', 'overflow', 'pothole', 'dark', 'complaint',
      'register', 'report', 'smell', 'dumped', 'garbage heap', 'stuck', 'not working',
      'damaged', 'danger', 'hazard', 'skid', 'accident', 'dirty'
    ];

    const hasComplaintKeyword = complaintIndicators.some(k => text.includes(k));

    if (hasComplaintKeyword) {
      // Determine category
      let category: ComplaintCategory = 'other';
      if (text.includes('water') || text.includes('pipe') || text.includes('tanker')) category = 'water';
      else if (text.includes('garbage') || text.includes('waste') || text.includes('trash')) category = 'garbage';
      else if (text.includes('road') || text.includes('pothole') || text.includes('asphalt')) category = 'roads';
      else if (text.includes('drain') || text.includes('manhole') || text.includes('sewage')) category = 'drainage';
      else if (text.includes('light') || text.includes('lamp') || text.includes('pole')) category = 'streetlights';
      else if (text.includes('traffic') || text.includes('signal')) category = 'traffic';
      else if (text.includes('sanitation') || text.includes('hygiene')) category = 'sanitation';

      // Determine priority suggestion
      let priority: ComplaintPriority = 'medium';
      if (text.includes('burst') || text.includes('open manhole') || text.includes('flood') || text.includes('hazard') || text.includes('accident') || text.includes('shock')) {
        priority = 'critical';
      } else if (text.includes('major') || text.includes('deep pothole') || text.includes('school') || text.includes('severe') || text.includes('heavy leak')) {
        priority = 'high';
      } else if (text.includes('dirty') || text.includes('flicker') || text.includes('minor')) {
        priority = 'low';
      }

      return { intent: 'new_complaint', category, priority };
    }

    // Otherwise service enquiry or general
    return { intent: 'service_enquiry' };
  },

  processMessage: (
    userText: string,
    sessionState: ChatSessionState,
    lang: 'en' | 'te' | 'hi' = 'en'
  ): {
    botResponse: string;
    newSessionState: ChatSessionState;
    suggestedComplaint?: Partial<Complaint>;
    suggestedActions?: { label: string; action: string; payload?: any }[];
  } => {
    const analysis = aiChatService.detectIntent(userText);
    const textLower = userText.toLowerCase();

    // 1. Complaint Status Query
    if (analysis.intent === 'complaint_status') {
      const ticketId = analysis.extractedTicketId || (userText.match(/SC-\d{4}-\d{4}/i)?.[0]?.toUpperCase());
      if (ticketId) {
        const found = complaintService.getComplaintById(ticketId);
        if (found) {
          return {
            botResponse: `🔍 Found Complaint **#${found.id}**:\n\n• **Title**: ${found.title}\n• **Status**: ${found.status.replace('_', ' ').toUpperCase()}\n• **Priority**: ${found.priority.toUpperCase()} (${found.slaHours}h SLA)\n• **Assigned To**: ${found.assignedDepartment}\n• **Officer**: ${found.assignedOfficerName || 'Under Review'}\n• **Location**: ${found.address}, ${found.area}`,
            newSessionState: { step: 'idle' },
            suggestedActions: [
              { label: `View Complete Tracking Timeline #${found.id}`, action: 'view_complaint', payload: found.id },
              { label: 'Register Another Complaint', action: 'navigate_new_complaint' }
            ]
          };
        } else {
          return {
            botResponse: `⚠️ Complaint ID **#${ticketId}** was not found in our smart city demo records. Please verify the ID or search using your registered phone number on the Track page.`,
            newSessionState: { step: 'idle' },
            suggestedActions: [
              { label: 'Go to Tracking Page', action: 'navigate_track' },
              { label: 'Register New Complaint', action: 'navigate_new_complaint' }
            ]
          };
        }
      }
      return {
        botResponse: 'To track your complaint, please provide your Complaint ID in the format **SC-2026-XXXX** (e.g. SC-2026-0001).',
        newSessionState: { step: 'idle' },
        suggestedActions: [
          { label: 'Track #SC-2026-0001', action: 'check_ticket', payload: 'SC-2026-0001' },
          { label: 'Go to Complaint Tracker', action: 'navigate_track' }
        ]
      };
    }

    // 2. Emergency Guidance Query
    if (analysis.intent === 'emergency_guidance') {
      const emergencyKB = KNOWLEDGE_BASE.find(k => k.topic === 'emergency_numbers');
      const response = emergencyKB?.response[lang] || emergencyKB?.response.en || '';
      return {
        botResponse: `🚨 **SMART CITY EMERGENCY ASSISTANCE**\n\n${response}\n\n⚠️ *Disclaimer: For immediate life threat or disaster, call 112 / 108 directly. Chatbot reports are for municipal logging.*`,
        newSessionState: { step: 'idle' },
        suggestedActions: [
          { label: 'Log Urgent Critical Complaint', action: 'navigate_new_complaint', payload: { priority: 'critical' } },
          { label: 'Central Control: 040-21111111', action: 'call_helpline', payload: '040-21111111' }
        ]
      };
    }

    // 3. Follow-up state machine if in middle of collecting details
    if (sessionState.step === 'awaiting_location') {
      const updatedDraft = {
        ...sessionState.draftComplaint,
        area: userText.trim(),
        address: userText.trim()
      };
      return {
        botResponse: `Thank you. I have drafted your municipal complaint:\n\n• **Title**: ${updatedDraft.title}\n• **Category**: ${updatedDraft.category?.toUpperCase()}\n• **Suggested Priority**: ${updatedDraft.priority?.toUpperCase()} (Requires officer validation)\n• **Area**: ${updatedDraft.area}\n• **Department**: ${updatedDraft.assignedDepartment}\n\nWould you like to register this complaint now?`,
        newSessionState: { draftComplaint: updatedDraft, step: 'ready_to_register' },
        suggestedComplaint: updatedDraft,
        suggestedActions: [
          { label: '⚡ Register Complaint Right Now (1-Click)', action: 'direct_register', payload: updatedDraft },
          { label: '📝 Open Full Form with Photos', action: 'fill_complaint_form', payload: updatedDraft },
          { label: 'Cancel', action: 'reset_chat' }
        ]
      };
    }

    // 4. New Complaint Detected
    if (analysis.intent === 'new_complaint') {
      // Check if location is already mentioned in prompt (e.g. "in Hitec City", "at Jubilee Hills")
      const knownAreas = ['Hitec City', 'Jubilee Hills', 'Banjara Hills', 'Charminar', 'Gachibowli', 'Ameerpet', 'Begumpet', 'Secunderabad', 'Madhapur', 'Kukatpally'];
      const matchedArea = knownAreas.find(a => textLower.includes(a.toLowerCase()));

      const draft: Partial<Complaint> = {
        title: userText.slice(0, 80),
        description: userText,
        category: analysis.category || 'other',
        priority: analysis.priority || 'medium',
        aiSuggestedCategory: analysis.category || 'other',
        aiSuggestedPriority: analysis.priority || 'medium',
        assignedDepartment: complaintService.getDepartmentForCategory(analysis.category || 'other'),
        area: matchedArea || 'Madhapur',
        address: matchedArea ? `Near main road, ${matchedArea}` : 'Near central junction'
      };

      if (!matchedArea) {
        return {
          botResponse: `I detected a municipal issue regarding **${(analysis.category || 'general').toUpperCase()}** (${(analysis.priority || 'medium').toUpperCase()} priority).\n\nYou can register this complaint immediately, or select your Hyderabad area below:`,
          newSessionState: { draftComplaint: draft, step: 'ready_to_register' },
          suggestedActions: [
            { label: '⚡ Register in Madhapur', action: 'direct_register', payload: { ...draft, area: 'Madhapur', address: 'Madhapur 100ft road' } },
            { label: '⚡ Register in Banjara Hills', action: 'direct_register', payload: { ...draft, area: 'Banjara Hills', address: 'Road No. 12, Banjara Hills' } },
            { label: '⚡ Register in Gachibowli', action: 'direct_register', payload: { ...draft, area: 'Gachibowli', address: 'Financial District main road' } },
            { label: '📝 Open Detailed Form with Photo Upload', action: 'fill_complaint_form', payload: draft }
          ]
        };
      } else {
        return {
          botResponse: `I have compiled your grievance details:\n\n• **Issue**: ${draft.title}\n• **Category**: ${draft.category?.toUpperCase()}\n• **Area**: ${draft.area}\n• **AI Suggested Priority**: ${draft.priority?.toUpperCase()}\n• **Assigned Department**: ${draft.assignedDepartment}\n\nClick below to submit directly or open the form:`,
          newSessionState: { draftComplaint: draft, step: 'ready_to_register' },
          suggestedComplaint: draft,
          suggestedActions: [
            { label: '⚡ Register Complaint Right Now (1-Click)', action: 'direct_register', payload: draft },
            { label: '📝 Open Form with Photo Upload', action: 'fill_complaint_form', payload: draft },
            { label: 'Ask Another Question', action: 'reset_chat' }
          ]
        };
      }
    }

    // 5. Knowledge Base Match for Service Enquiry
    const matchedKB = KNOWLEDGE_BASE.find(kb =>
      kb.keywords.some(kw => textLower.includes(kw))
    );

    if (matchedKB) {
      const ans = matchedKB.response[lang] || matchedKB.response.en;
      return {
        botResponse: `${ans}\n\n*Source: SmartCity AI Municipal Knowledge Base (Verified Service Catalog)*`,
        newSessionState: { step: 'idle' },
        suggestedActions: [
          { label: `Register a Complaint for ${matchedKB.category.toUpperCase()}`, action: 'navigate_new_complaint', payload: { category: matchedKB.category } },
          { label: 'Track Existing Complaint', action: 'navigate_track' }
        ]
      };
    }

    // 6. Default Fallback
    const fallbackText = {
      en: `I am your SmartCity AI Assistant. I can help answer municipal service guidelines, check complaint tracking, or draft a new civic issue report.\n\nYou can ask about: water supply schedules, garbage pickup, pothole repairs, broken streetlights, or property tax (PTIN).`,
      te: `నేను మీ స్మార్ట్ సిటీ AI సహాయకుడను. మున్సిపల్ సేవలు, ఫిర్యాదుల స్థితి లేదా కొత్త సమస్య నమోదులో మీకు సహాయం చేయగలను.`,
      hi: `मैं आपका स्मार्ट सिटी AI सहायक हूँ। मैं नागरिक सेवाओं की जानकारी, शिकायत स्थिति या नई शिकायत दर्ज करने में आपकी सहायता कर सकता हूँ।`
    };

    return {
      botResponse: fallbackText[lang] || fallbackText.en,
      newSessionState: { step: 'idle' },
      suggestedActions: [
        { label: '💧 Water Supply Timings', action: 'send_query', payload: 'What are water supply timings?' },
        { label: '🗑️ Garbage Collection Schedule', action: 'send_query', payload: 'How does garbage collection work?' },
        { label: '🛣️ Report a Pothole', action: 'send_query', payload: 'There is a deep pothole on the road' },
        { label: '🔍 Track Complaint #SC-2026-0001', action: 'check_ticket', payload: 'SC-2026-0001' }
      ]
    };
  }
};
