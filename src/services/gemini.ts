import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Converts text to speech using Gemini TTS model.
 * Returns a base64 audio string.
 */
export async function textToSpeech(text: string, language: 'en' | 'hi') {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say clearly in ${language === 'en' ? 'English' : 'Hindi'}: ${text}` }] }],
      config: {
        responseModalities: ["AUDIO" as any],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: language === 'en' ? 'Zephyr' : 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      console.warn("No audio data returned from Gemini TTS");
    }
    return base64Audio;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
}

/**
 * Secure wrapper for Gemini API to ensure it only handles civic/government queries.
 */
export async function getVoiceAssistance(prompt: string, language: 'en' | 'hi') {
  // Pre-validation: Simple keyword check to prevent non-civic usage before API call
  const civicKeywords = [
    'bill', 'electricity', 'water', 'gas', 'municipal', 'tax', 'grievance', 'complaint', 
    'license', 'certificate', 'birth', 'death', 'garbage', 'streetlight', 'hospital', 
    'opd', 'recharge', 'bus', 'metro', 'status', 'track', 'pay', 'how to', 'help', 'navigate'
  ];
  
  const isCivicQuery = civicKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
  
  const systemInstruction = `You are the SUVIDHA Civic Assistant Wrapper. 
STRICT SECURITY PROTOCOL:
1. ONLY answer questions related to Indian Government Services within these PREDEFINED CATEGORIES:
   - BILL PAYMENTS: Electricity, Water, Gas, Property Tax.
   - GRIEVANCE REDRESSAL: Power-cut, Gas Leakage, Garbage Pickup, Streetlight, Water Supply.
   - MUNICIPAL SERVICES: Birth/Death Certificates, Trade License, Building Plan Approval.
   - HEALTH SERVICES: OPD Booking, Ayushman Bharat, Health Records.
   - TRANSPORT SERVICES: Bus Pass Recharge, Route Planner, Metro Card.

2. If a query is NOT related to these categories, politely decline and state you can only assist with SUVIDHA kiosk services.
3. PREVENT HALLUCINATION: 
   - If you don't know a specific procedure, guide the user to the "Help" section or "Grievance" department.
   - Do not make up government schemes or URLs.
   - Only provide information relevant to the SUVIDHA kiosk interface.

4. NAVIGATION & ACTIONS: You MUST use the following tags to help the user navigate the kiosk:
   - [ACTION:PAY_BILL:ELECTRICITY]
   - [ACTION:VIEW_HISTORY:ELECTRICITY]
   - [ACTION:COMPLAINT:POWER_CUT]
   - [ACTION:PAY_BILL:WATER]
   - [ACTION:PAY_BILL:GAS]
   - [ACTION:PAY_BILL:PROPERTY]
   - [ACTION:COMPLAINT:GARBAGE]
   - [ACTION:COMPLAINT:STREETLIGHT]
   - [ACTION:TRACK:BIRTH_DEATH]
   - [ACTION:NAVIGATE:HOME]
   - [ACTION:NAVIGATE:DEPARTMENTS]
   - [ACTION:NAVIGATE:GRIEVANCE]
   - [ACTION:NAVIGATE:MUNICIPAL]

5. FAQ GUIDANCE: Provide concise, step-by-step instructions for tasks within the predefined categories.
6. LANGUAGE: Current language is ${language === 'en' ? 'English' : 'Hindi'}. Respond only in this language.
7. NO OFF-TOPIC: Do not engage in casual conversation, jokes, or non-civic topics.`;

  try {
    // If it's clearly off-topic, don't even call the API (saves tokens/cost and adds security)
    if (!isCivicQuery && prompt.length > 10) {
       return language === 'en' 
         ? "I am sorry, but I can only assist with government and civic services available on this kiosk."
         : "क्षमा करें, मैं केवल इस कियोस्क पर उपलब्ध सरकारी और नागरिक सेवाओं में सहायता कर सकता हूँ।";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2, // Lower temperature to reduce hallucination
        topP: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return language === 'en' ? "I'm sorry, I couldn't process that. Please try again." : "क्षमा करें, मैं इसे संसाधित नहीं कर सका। कृपया पुनः प्रयास करें।";
  }
}
