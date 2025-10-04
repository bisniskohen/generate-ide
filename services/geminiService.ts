
import { GoogleGenAI, Type } from "@google/genai";
import type { UserInputs, ContentIdea } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      hook: {
        type: Type.STRING,
        description: 'Kalimat hook yang sangat menarik dan singkat, maksimal 15 kata.',
      },
      ideKonten: {
        type: Type.STRING,
        description: 'Ide utama dari konten yang dijelaskan secara singkat dan jelas.',
      },
      skrip: {
        type: Type.STRING,
        description: 'Skrip singkat untuk konten video (TikTok/Reels), termasuk narasi/teks dan saran adegan visual. Format dalam poin-poin atau paragraf singkat.',
      },
    },
    required: ['hook', 'ideKonten', 'skrip'],
  },
};

export const generateContentIdeas = async (inputs: UserInputs): Promise<ContentIdea[]> => {
  const { hookType, languageStyle, targetMarket, productLink } = inputs;

  const prompt = `
    Anda adalah seorang ahli strategi konten media sosial dan copywriter jenius yang berspesialisasi dalam menciptakan konten viral untuk platform seperti TikTok dan Instagram Reels.

    Berdasarkan informasi berikut:
    - Jenis Hook yang diinginkan: ${hookType}
    - Gaya Bahasa yang digunakan: ${languageStyle}
    - Target Market / Audiens: ${targetMarket}
    - Link Produk untuk dianalisis (opsional): ${productLink || 'Tidak disediakan, fokus pada konsep umum sesuai target market.'}

    Tugas Anda:
    Buatkan 20 ide konten yang unik, kreatif, dan lengkap.
    Setiap ide HARUS mencakup tiga bagian:
    1.  **Hook**: Kalimat pembuka yang sangat menarik perhatian, sesuai dengan jenis hook yang dipilih.
    2.  **Ide Konten**: Ringkasan singkat tentang isi atau konsep utama konten.
    3.  **Skrip**: Skrip singkat untuk konten video, termasuk narasi/teks yang diucapkan dan deskripsi singkat adegan visual yang relevan.

    Pastikan semua output dalam Bahasa Indonesia dan diformat sebagai array JSON yang valid sesuai skema yang diberikan.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });
    
    const jsonText = response.text.trim();
    const contentIdeas: ContentIdea[] = JSON.parse(jsonText);
    return contentIdeas;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gagal berkomunikasi dengan AI. Coba lagi nanti.");
  }
};
