import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Support CORS if needed, and method safety
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido. Utiliza POST." });
  }

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "La pregunta u objeción es requerida." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "API Key de Gemini no configurada en el servidor de Vercel. Por favor añádela en la sección de Variables de Entorno de Vercel." 
      });
    }

    // Initialize the official Google Gen AI Client
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });

    const prompt = `Actúas como un Coach de Ventas y Experto Financiero/Fiscal para comercios independientes y PyMEs en México.
Tu objetivo es responder de forma clara, profesional, empática y sumamente persuasiva a dudas, miedos y objeciones sobre el cobro con tarjeta, terminales de pago (TPVs) y comisiones bancarias o de agregadores (como Mercado Pago, Clip, Ualá Bis, etc.). Tu respuesta debe ayudar al comerciante a resolver la objeción de venta de inmediato, ya sea para sí mismo o para responderle a sus propios clientes.

Duda u Objeción a resolver: "${question}"

Por favor, genera una respuesta estructurada con Markdown de la siguiente manera:
1. **Respuesta Clara y Directa**: Explicación sencilla pero fundamentada de máximo 3 o 4 líneas (mencionando regulaciones del Banco de México, la CONDUSEF, o la Ley del IVA/ISR en México si es aplicable, ej. la deducibilidad de comisiones de las TPVs).
2. **Estrategia para Resolver la Objeción**: Consejos prácticos de venta o beneficios de negocio (por ejemplo, cómo el cobro con tarjeta aumenta el ticket promedio un 30% o evita robos hormiga y manejo inseguro de efectivo).
3. **Speech Recomendado para el Cliente**: Un diálogo corto, amable y profesional (en español de México) que el comerciante puede decirle a su cliente para destrabar la venta de inmediato.

Usa un tono consultor experto, empático, profesional y enfocado en la conversión de ventas. Mantén el formato de Markdown limpio.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.6,
      }
    });

    const answer = response.text || "No se pudo generar respuesta para esta duda en este momento.";
    return res.status(200).json({ answer });

  } catch (error: any) {
    console.error("Error calling Gemini API for FAQ on Vercel:", error);
    return res.status(500).json({ 
      error: "Ocurrió un error al procesar la respuesta de la IA en Vercel.", 
      details: error?.message || error 
    });
  }
}
