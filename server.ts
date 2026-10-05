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

      // Construct detailed context about Mexican payment aggregators and bank terminals
      const prompt = `Actúa como un Especialista en Consultoría Financiera y Pasarelas de Pago (TPV) para PyMEs mexicanas.
Analiza la siguiente situación de negocio de un comercio en México:
- Giro comercial / Nivel de negocio: ${businessType}
- Volumen mensual de venta estimado: ${monthlyVolume} MXN
- Ticket promedio por cliente: ${avgTicket} MXN
- ¿Acepta o tiene pensado ofrecer Meses Sin Intereses (MSI)?: ${acceptsMsi ? 'Sí' : 'No'}
- Plazo preferido de MSI (si aplica): ${preferredPlazo || 'Ninguno'}

Considera los dos esquemas de terminales punto de venta (TPV) en México en 2026 (recuerda que el IVA del 16% se aplica sobre la comisión cobrada, no sobre el total de la venta):

1. Terminales No Bancarias (Agregadores Fintech - $0 renta mensual, sin cuenta empresarial ni venta mínima):
- Clip: 3.60% + IVA (4.18% efectiva, $41.76 por cada $1,000 MXN). Débito, crédito y AMEX a la misma tasa. MSI de 3 a 24 meses (sobretasa 4.57% a 27.17% + IVA, mín. $300 MXN). Depósito en 24 a 48 hrs hábiles.
- Mercado Pago (Point): 3.50% + IVA (4.06% efectiva, $40.60 por cada $1,000 MXN). Débito, crédito, AMEX y vales. MSI de 3 a 18 meses (desde 4.49% hasta ~17.5% + IVA). Depósito inmediato en Mercado Pago Wallet.
- Zettle by PayPal: 3.50% + IVA (4.06% efectiva). Débito, crédito y AMEX. MSI de 3 a 12 meses. Depósito en 1 a 2 días hábiles en cuenta bancaria.
- Ualá Bis: 2.99% + IVA estándar (3.47% efectiva). Plan POS Pro desde 1.39% + IVA para giros específicos con Constancia de Situación Fiscal (CSF). Hasta 18 MSI. Depósito inmediato en cuenta Ualá.
- SumUp: 3.20% a 3.50% + IVA (3.71% a 4.06% efectiva). Depósito de 1 a 3 días hábiles.

2. Terminales Bancarias Tradicionales (Para negocios establecidos con mayor volumen, requieren cuenta empresarial y tienen renta o facturación mínima):
- BBVA México: Débito 1.00% a 2.50% + IVA; Crédito 1.60% a 2.50% + IVA. Modalidad TPV Portátil Pyme con tasa fija única de 2.15% + IVA (2.49% efectiva). Renta mensual de $200 a $450 + IVA (exenta cobrando $25,000 a $30,000 MXN/mes).
- Santander (Getnet Smart / TPV): Visa/MC 0.99% a 2.50% + IVA (sector médico desde 0.99%, comercio general 2.13%-2.50%); AMEX 2.90% + IVA. Compra única ($2,500 + IVA) o renta de $250 + IVA/mes.
- Citibanamex: Débito 1.20% a 2.50% + IVA; Crédito 1.80% a 3.00% + IVA. Afiliación $290 MXN + renta $250-$400 + IVA/mes (facturación mínima $15,000 MXN/mes o aplica penalización).
- Banorte: Débito 0.85% a 2.50% + IVA; Crédito 1.80% a 2.65% + IVA. Renta de $200 a $350 + IVA/mes exentable con volumen.
- HSBC México: Menudeo Débito 2.80% + IVA; Crédito 3.60% + IVA. Contratación ~$1,304 + IVA, renta ~$521 + IVA/mes, penalización de $450 + IVA si factura $7,500 MXN o menos al mes.

Por favor, genera un informe personalizado, motivador y sumamente profesional con Markdown estructurado que incluya las siguientes secciones clave:

1. **Análisis de la Estructura de tu Negocio (¿Fintech o Banco Tradicional?)**: Evalúa según su volumen mensual y ticket promedio si le conviene más un Agregador Fintech ($0 renta) o dar el salto a una Terminal Bancaria Tradicional (menor tasa pero con meta mensual).
2. **Recomendación Principal (La Mejor Opción)**: Cuál terminal de pago (TPV) debería elegir como principal y justificar detalladamente con números reales (tasa base y tasa efectiva con IVA, liquidez o exención de renta). ¡Elige una ganadora clara!
3. **Alternativa Directa (Plan B)**: Cuál terminal (fintech o bancaria) podría usar como respaldo o segunda opción estratégica.
4. **Estrategia sobre Comisiones, Rentas e IVA**: Consejos prácticos sobre cómo manejar ese costo recordando que en México el IVA del 16% sobre la comisión es acreditable y las comisiones son deducibles ante el SAT.
5. **Próximos Pasos Proactivos**: Una lista corta paso a paso para implementar la terminal elegida.

Usa un tono premium, consultor empresarial experto, claro y empático. Responde al 100% en español de México.`;

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
