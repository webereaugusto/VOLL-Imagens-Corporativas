
import { GoogleGenAI, Modality } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const parseDataUrl = (dataUrl: string) => {
    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid data URL format. Expected 'data:mime/type;base64,data'.");
    }
    return { mimeType: match[1], data: match[2] };
};

export const generateCorporateImage = async (
    base64ImageDataUrl: string,
    prompt: string
): Promise<string> => {
    try {
        const { mimeType, data } = parseDataUrl(base64ImageDataUrl);

        const imagePart = {
            inlineData: {
                mimeType,
                data,
            },
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [imagePart, { text: prompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts ?? []) {
            if (part.inlineData) {
                const newMimeType = part.inlineData.mimeType;
                const newBase64Data = part.inlineData.data;
                return `data:${newMimeType};base64,${newBase64Data}`;
            }
        }
        
        const textResponse = response.text;
        if (textResponse && textResponse.trim().length > 0) {
            throw new Error(`A IA não conseguiu gerar a imagem e retornou a seguinte mensagem: "${textResponse.trim()}"`);
        }
        
        throw new Error("A resposta da IA não continha uma imagem. Tente novamente ou use uma foto diferente.");

    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Não foi possível gerar a imagem. Verifique sua conexão e tente novamente.");
    }
};
