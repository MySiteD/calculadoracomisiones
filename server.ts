import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API: Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API: AI Advisor using the official @google/genai SDK
  app.post("/api/advisor", async (req, res) => {
    try {
      const { businessType, monthlyVolume, avgTicket, acceptsMsi, preferredPlazo } = req.body;

      if (!businessType || !monthlyVolume) {
        return res.status(400).json({ error: "Faltan campos obligatorios para el análisis" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "API Key de Gemini no configurada en el servidor. Por favor añádela usando el panel de Secrets." 
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
      return res.json({ analysis: recommendationText });

    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      return res.status(500).json({ 
        error: "Ocurrió un error al procesar el análisis de IA. Verifica los logs del servidor.", 
        details: error?.message || error 
      });
    }
  });

  // API: AI FAQ & Objections Solver using the official @google/genai SDK
  app.post("/api/faq-answer", async (req, res) => {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({ error: "La pregunta u objeción es requerida." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "API Key de Gemini no configurada en el servidor. Por favor añádela usando el panel de Secrets." 
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
      return res.json({ answer });

    } catch (error: any) {
      console.error("Error calling Gemini API for FAQ:", error);
      return res.status(500).json({ 
        error: "Ocurrió un error al procesar la respuesta de la IA. Verifica los logs del servidor.", 
        details: error?.message || error 
      });
    }
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback for all other routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] running on http://localhost:${PORT} under NODE_ENV=${process.env.NODE_ENV}`);
  });
}

startServer();
