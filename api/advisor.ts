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
    return res.status(200).json({ analysis: recommendationText });

  } catch (error: any) {
    console.error("Error calling Gemini API on Vercel:", error);
    return res.status(500).json({ 
      error: "Ocurrió un error al procesar el análisis de IA en Vercel.", 
      details: error?.message || error 
    });
  }
}
