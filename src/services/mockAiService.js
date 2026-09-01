import { mockMisinformationDb, mockAdminStats } from '../data/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const analyzeClaim = async (claim) => {
  await delay(1500);
  const normalizedClaim = claim.toLowerCase().trim();
  
  for (const [key, value] of Object.entries(mockMisinformationDb)) {
    const keywords = key.split(' ').filter(w => w.length > 3);
    const matches = keywords.filter(kw => normalizedClaim.includes(kw));
    
    if (matches.length > 0) {
      return {
        status: value.status,
        reasoning: value.reasoning,
        source: value.source
      };
    }
  }

  return {
    status: "Needs Verification",
    reasoning: "We could not find this exact claim in our verified database. Please wait for an official update or contact the helpline. Do NOT share sensitive information.",
    source: "AI Assistant (Unverified)"
  };
};

export const askCitizenAI = async (question) => {
  await delay(1000);
  const q = question.toLowerCase();
  
  if (q.includes("why") && q.includes("census")) {
    return "The census counts everyone to help the administration plan schools, hospitals, roads, and benefits for your community. It is completely confidential.";
  }
  
  if (q.includes("when") && q.includes("visit")) {
    return "Enumerators are currently visiting your sector between September 1st and September 30th. You will receive an SMS one day before the visit if your mobile number is registered.";
  }
  
  if (q.includes("miss") || q.includes("not home")) {
    return "If you miss the visit, the enumerator will leave a slip with a contact number to reschedule, or you can complete the process online through Self-Enumeration.";
  }
  
  return "I'm the Census AI Assistant. I can help you with questions about how to participate, what documents you need, or how to use the self-enumeration portal. Could you provide more details?";
};

export const askAdminAI = async (question) => {
  await delay(1200);
  const q = question.toLowerCase();
  
  if (q.includes("attention") || q.includes("regional")) {
    return `Currently, **South Zone - District 9** requires attention due to high reports of misinformation. **North Zone - Sector 4** is showing a lower than expected self-enumeration rate.`;
  }
  
  if (q.includes("progress") || q.includes("summarize")) {
    const percent = ((mockAdminStats.completedHouseholds / mockAdminStats.totalHouseholds) * 100).toFixed(1);
    return `Today's Progress: We have successfully enumerated **${mockAdminStats.completedHouseholds.toLocaleString()}** households out of ${mockAdminStats.totalHouseholds.toLocaleString()} (${percent}%). Self-enumeration accounts for ${mockAdminStats.selfEnumerated.toLocaleString()} of these.`;
  }
  
  if (q.includes("common") || q.includes("problems")) {
    return `The most common citizen queries in the last 24 hours are:\n1. Do I need an ID card to participate?\n2. How to securely self-enumerate online?\n3. Is my data encrypted and safe?`;
  }

  return "I am the GenAI Analyst. I can summarize regional progress, highlight areas needing attention, and identify trending citizen queries based on real-time dashboard data.";
};

export const matchVoiceToOption = async (transcript, options) => {
  await delay(500);
  const normalized = transcript.toLowerCase();
  
  for (const option of options) {
    const keywords = option.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2);
    for (const word of keywords) {
      if (normalized.includes(word)) {
        return option;
      }
    }
  }
  return null;
};
