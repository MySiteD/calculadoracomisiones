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
    const { businessType, monthlyVolume, avgTicket, acceptsMsi, preferredPlazo } = req.body;

    if (!businessType || !monthlyVolume) {
      return res.status(400).json({ error: "Faltan campos obligatorios para el análisis" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "API Key de Gemini no configurada en el servidor de Vercel. Por favor añádela en la sección de Variables de Entorno de Vercel." 
      });
    }

    // Initialize the official Google Gen AI Client with standard user-agent config
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });

    // Construct detailed context about Mexican payment aggregators
    const prompt = `Actúa como un Especialista en Consultoría Financiera y Pasarelas de Pago (TPV) para PyMEs mexicanas.
Analiza la siguiente situación de negocio de un comercio en México:
- Giro comercial / Nivel de negocio: ${businessType}
- Volumen mensual de venta estimado: ${monthlyVolume} MXN
- Ticket promedio por cliente: ${avgTicket} MXN
- ¿Acepta o tiene pensado ofrecer Meses Sin Intereses (MSI)?: ${acceptsMsi ? 'Sí' : 'No'}
- Plazo preferido de MSI (si aplica): ${preferredPlazo || 'Ninguno'}

Considera el estado del mercado mexicano de terminales no bancarias (Agregadores) en 2026:
- Ualá Bis: Tasa base del 2.9% + IVA. Es muy económica pero tiene menos variedad de cajeros físicos y menos ecosistema de retiros rápidos inmediatos.
- Mercado Pago: Tasa base del 3.5% + IVA. Excelente ecosistema integral, crédito PYME, rendimiento de saldo diario y liquidez inmediata las 24/7. Dispositivos Point Air y Point Smart 2.
- Zettle by PayPal: Tasa base del 3.5% + IVA. Muy profesional para facturación interna, conciliaciones con cuentas comerciales PayPal mundiales y excelente estética.
- Clip: Tasa base del 3.6% + IVA. Líder en soporte físico, aprobación instantánea, pero tasa ligeramente mayor. Muy reconocido.

Por favor, genera un informe personalizado, motivador y sumamente profesional con Markdown estructurado que incluya las siguientes secciones clave:

1. **Análisis de la Estructura de tu Negocio**: Evaluación rápida de cómo influye el ticket promedio y volumen en la rentabilidad de las terminales.
2. **Recomendación Principal (La Mejor Opción)**: Cuál terminal de pago (TPV) debería elegir como principal (Mercado Pago, Clip, Zettle o Ualá Bis) y justificar detalladamente por qué es la ideal basándose en la tasa base, liquidez o facilidad tecnológica. Elige solo una como ganadora!
3. **Alternativa Directa (Plan B)**: Cuál terminal de pago podría usar como sistema secundario de respaldo o para un beneficio adicional concreto.
4. **Estrategia sobre Comisiones e IVA**: Consejos prácticos sobre cómo manejar ese costo (ej. si debe absorberlo, incluirlo sutilmente en el margen, o si vender bajo MSI requiere una recarga del costo) recordando que en México el IVA de la comisión ($16%) es acreditable.
5. **Próximos Pasos Proactivos**: Una lista corta paso a paso para abrir la cuenta y empezar a facturar de forma simplificada.

Usa un tono premium, consultor empresarial experto, claro y empático. No uses jerga excesivamente abstracta o compleja. Responde al 100% en español de México.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    const recommendationText = response.text || "No se pudo generar recomendación en este momento.";
    return res.status(200).json({ analysis: recommendationText });

  } catch (error: any) {
    console.error("Error calling Gemini API on Vercel:", error);
    return res.status(500).json({ 
      error: "Ocurrió un error al procesar el análisis de IA en Vercel.", 
      details: error?.message || error 
    });
  }
}
