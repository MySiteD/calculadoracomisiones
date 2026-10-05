import { Provider, ReferidoLink, Promotion } from "./types";

export const providers: Provider[] = [
  // ==========================================
  // 1. TERMINALES NO BANCARIAS (AGREGADORES FINTECH)
  // ==========================================
  {
    name: "Ualá Bis",
    category: "fintech",
    baseRate: 0.0299,
    rateRangeText: "2.99% + IVA (Plan POS Pro: desde 1.39% + IVA con CSF)",
    effectiveRateText: "3.47% efectiva",
    monthlyRentText: "$0 MXN",
    depositTimeText: "Inmediato en cuenta Ualá",
    msiDetailsText: "Disponible hasta 18 MSI (+ sobretasa bancaria + IVA)",
    extraNotesText: "Plan POS Pro con tasas preferenciales desde 1.39% + IVA para giros específicos con Constancia de Situación Fiscal (CSF).",
    msiRates: { "3": 0.045, "6": 0.075, "9": 0.10, "12": 0.125 },
    color: "#E20613",
    textColor: "text-red-400",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/20",
    description: "Comisión base estándar de 2.99% + IVA (3.47% efectiva). Cuenta con Plan POS Pro desde 1.39% + IVA para giros específicos con CSF y depósito inmediato.",
    officialUrl: "https://www.ualabis.com.mx/lector",
    benefits: [
      "Tasa estándar: 2.99% + IVA (3.47% efectiva)",
      "Plan POS Pro desde 1.39% + IVA con CSF",
      "Depósito inmediato en cuenta Ualá y hasta 18 MSI"
    ]
  },
  {
    name: "SumUp",
    category: "fintech",
    baseRate: 0.032,
    rateRangeText: "3.20% a 3.50% + IVA (según modalidad o promoción)",
    effectiveRateText: "3.71% a 4.06% efectiva",
    monthlyRentText: "$0 MXN",
    depositTimeText: "1 a 3 días hábiles",
    msiDetailsText: "Pagos a meses disponibles según modalidad de lector",
    msiRates: { "3": 0.045, "6": 0.075, "9": 0.105, "12": 0.135 },
    color: "#0066FF",
    textColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    description: "Comisión competitiva de 3.20% a 3.50% + IVA (3.71% a 4.06% efectiva) según la modalidad o promoción del equipo, sin renta mensual ni mínimos.",
    officialUrl: "https://www.sumup.com/es-mx/",
    benefits: [
      "Tasa de 3.20% a 3.50% + IVA (3.71% - 4.06% efec.)",
      "Renta mensual: $0 MXN sin venta mínima",
      "Tiempo de depósito: 1 a 3 días hábiles"
    ]
  },
  {
    name: "Mercado Pago",
    category: "fintech",
    baseRate: 0.035,
    rateRangeText: "3.50% + IVA por transacción",
    effectiveRateText: "4.06% efectiva ($40.60 MXN por cada $1,000)",
    monthlyRentText: "$0 MXN",
    depositTimeText: "Inmediato (al instante en Mercado Pago Wallet)",
    msiDetailsText: "Sobretasa acumulable desde 4.49% (3 MSI) hasta ~17.5% (12/18 MSI) + IVA",
    extraNotesText: "Acepta tarjetas de débito, crédito, AMEX y vales de despensa compatibles.",
    msiRates: { "3": 0.0449, "6": 0.079, "9": 0.109, "12": 0.139 },
    color: "#009EE3",
    textColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    description: "Comisión estándar de 3.50% + IVA (4.06% efectiva: $40.60 por cada $1,000 MXN). Liquidez al instante en tu cuenta de Mercado Pago Wallet.",
    officialUrl: "https://www.mercadopago.com.mx/herramientas-para-vender/lectores-point",
    benefits: [
      "Comisión efectiva: 4.06% ($40.60 por $1,000 MXN)",
      "Depósito inmediato al instante en Wallet",
      "Acepta Débito, Crédito, AMEX y vales compatibles"
    ]
  },
  {
    name: "Zettle by PayPal",
    category: "fintech",
    baseRate: 0.035,
    rateRangeText: "3.50% + IVA por transacción",
    effectiveRateText: "4.06% efectiva",
    monthlyRentText: "$0 MXN",
    depositTimeText: "1 a 2 días hábiles en cuenta bancaria",
    msiDetailsText: "Plazos de 3 a 12 meses agregando sobretasa bancaria + IVA",
    msiRates: { "3": 0.048, "6": 0.078, "9": 0.105, "12": 0.135 },
    color: "#002C9B",
    textColor: "text-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Antes iZettle. Comisión base de 3.50% + IVA (4.06% efectiva). Acepta débito, crédito y AMEX sin renta mensual y con respaldo global de PayPal.",
    officialUrl: "https://www.zettle.com/mx/lector-de-tarjetas",
    benefits: [
      "Comisión efectiva: 4.06% (3.50% + IVA)",
      "Acepta Débito, Crédito y AMEX a la misma tasa",
      "Depósito de 1 a 2 días hábiles en tu banco"
    ]
  },
  {
    name: "Clip",
    category: "fintech",
    baseRate: 0.036,
    rateRangeText: "3.60% + IVA por transacción",
    effectiveRateText: "4.18% efectiva ($41.76 MXN por cada $1,000)",
    monthlyRentText: "$0 MXN",
    depositTimeText: "24 a 48 horas hábiles",
    msiDetailsText: "Sobretasa bancaria del 4.57% (3 MSI) al 27.17% (24 MSI) + IVA. Mínimo $300 MXN.",
    msiRates: { "3": 0.0457, "6": 0.075, "9": 0.105, "12": 0.135 },
    color: "#FF5E00",
    textColor: "text-orange-400",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    description: "Comisión base de 3.60% + IVA (4.18% efectiva: $41.76 por cada $1,000 MXN). Acepta débito, crédito y AMEX a la misma tasa y ofrece hasta 24 MSI.",
    officialUrl: "https://shop.clip.mx/collections/productos-clip",
    benefits: [
      "Comisión efectiva: 4.18% ($41.76 por $1,000 MXN)",
      "Débito, Crédito y AMEX a la misma tasa ($0 renta)",
      "MSI de 3 a 24 meses (monto mínimo $300 MXN)"
    ]
  },
  {
    name: "NetPay",
    category: "fintech",
    baseRate: 0.035,
    rateRangeText: "3.50% + IVA por transacción",
    effectiveRateText: "4.06% efectiva",
    monthlyRentText: "$0 MXN",
    depositTimeText: "Mismo día o 24 horas hábiles",
    msiDetailsText: "3 a 12 MSI con sobretasa bancaria + IVA",
    msiRates: { "3": 0.045, "6": 0.075, "9": 0.10, "12": 0.13 },
    color: "#19A74E",
    textColor: "text-emerald-450 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Líder regional con terminales interconectadas inteligentes (NetPay Smart) con amplio soporte multi-giro y aceptación de vales.",
    officialUrl: "https://netpay.mx/netpay-smart/",
    benefits: [
      "Terminal Inteligente Android ($0 renta en esquema agregador)",
      "Depósito el mismo día o 24 horas hábiles",
      "Acepta tarjetas de vales Sodexo y más"
    ]
  },
  {
    name: "Sr. Pago",
    category: "fintech",
    baseRate: 0.036,
    rateRangeText: "3.60% + IVA por transacción",
    effectiveRateText: "4.18% efectiva",
    monthlyRentText: "$0 MXN",
    depositTimeText: "24 a 48 horas hábiles",
    msiDetailsText: "3 a 12 MSI con sobretasa bancaria + IVA",
    msiRates: { "3": 0.045, "6": 0.075, "9": 0.105, "12": 0.135 },
    color: "#808080",
    textColor: "text-slate-450 dark:text-slate-300",
    badgeBg: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    description: "Un servicio integrado bajo el respaldo de Konfío para aceptar transacciones y complementar con financiamiento PYME.",
    officialUrl: "https://konfio.mx/sr-pago/",
    benefits: [
      "Respaldado por el ecosistema financiero Konfío",
      "Terminal física y links de pago a distancia",
      "Sin renta mensual fija"
    ]
  },
  {
    name: "Billpocket",
    category: "fintech",
    baseRate: 0.035,
    rateRangeText: "3.50% + IVA por transacción",
    effectiveRateText: "4.06% efectiva",
    monthlyRentText: "$0 MXN",
    depositTimeText: "Día hábil siguiente",
    msiDetailsText: "3 a 12 MSI con sobretasa bancaria + IVA",
    msiRates: { "3": 0.045, "6": 0.07, "9": 0.10, "12": 0.13 },
    color: "#00BCD4",
    textColor: "text-cyan-450 dark:text-cyan-400",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    description: "Una de las plataformas pioneras en procesamiento móvil del país, ahora bajo la infraestructura global de Kushki.",
    officialUrl: "https://www.billpocket.com/",
    benefits: [
      "Soporte empresarial bajo red Kushki",
      "Sin renta mensual ni mínimos de facturación",
      "Depósitos al siguiente día hábil"
    ]
  },

  // ==========================================
  // 2. TERMINALES BANCARIAS TRADICIONALES
  // ==========================================
  {
    name: "BBVA México (TPV)",
    category: "banco",
    baseRate: 0.0215,
    debitRate: 0.0175,
    creditRate: 0.0215,
    rateRangeText: "Débito: 1.00% a 2.50% + IVA | Crédito: 1.60% a 2.50% + IVA | Portátil Pyme: 2.15% + IVA",
    effectiveRateText: "2.49% efectiva (Modalidad TPV Portátil Pyme)",
    monthlyRentText: "$200 a $450 MXN + IVA al mes (exentable)",
    depositTimeText: "Mismo día o día hábil siguiente en cuenta BBVA",
    minVolumeText: "Exenta renta facturando entre $25,000 y $30,000 MXN/mes con tarjeta",
    extraNotesText: "Requiere cuenta de cheques institucional y contrato formal. Tasas variables según giro comercial o tasa fija única de 2.15% + IVA en TPV Portátil Pyme.",
    msiRates: { "3": 0.038, "6": 0.068, "9": 0.095, "12": 0.12 },
    color: "#072146",
    textColor: "text-blue-700 dark:text-blue-400",
    badgeBg: "bg-blue-900/10 text-blue-700 dark:text-blue-300 border-blue-800/20",
    description: "TPV Tradicional y Portátil Pyme (tasa fija única de 2.15% + IVA / 2.49% efectiva). Por giro: Débito 1.00%-2.50% y Crédito 1.60%-2.50% + IVA.",
    officialUrl: "https://www.bbva.mx/empresas/productos/cobros/terminal-punto-de-venta.html",
    benefits: [
      "TPV Portátil Pyme: 2.15% + IVA (2.49% efectiva)",
      "Por giro: Débito 1.00%-2.50% | Crédito 1.60%-2.50% + IVA",
      "Renta ($200-$450 + IVA) exentable con $25k-$30k/mes"
    ]
  },
  {
    name: "Santander Getnet",
    category: "banco",
    baseRate: 0.0213,
    debitRate: 0.0175,
    creditRate: 0.0213,
    rateRangeText: "Visa/MC: 0.99% a 2.50% + IVA | AMEX: 2.90% + IVA | Internacionales: 3.50% a 4.25% + IVA",
    effectiveRateText: "Desde 1.15% (sector médico) hasta 2.90% efectiva (comercio general)",
    monthlyRentText: "Renta $250 MXN + IVA/mes o compra única $2,500 MXN + IVA",
    depositTimeText: "Inmediato o día hábil siguiente en cuenta Santander",
    minVolumeText: "Sin renta mensual al elegir modalidad de compra directa ($2,500 + IVA)",
    extraNotesText: "Tasas por giro: sector médico desde 0.99% + IVA; comercio general y salones 2.13% a 2.50% + IVA. Incluye tarjeta SIM y rollos de papel.",
    msiRates: { "3": 0.039, "6": 0.069, "9": 0.098, "12": 0.125 },
    color: "#EC0000",
    textColor: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-600/10 text-red-600 dark:text-red-400 border-red-600/20",
    description: "Getnet Smart / TPV Bancaria. Tasas por giro de 0.99% (médico) a 2.50% + IVA (comercio general 2.13%-2.50%). Opción de compra única o renta mensual.",
    officialUrl: "https://www.getnet.mx/",
    benefits: [
      "Visa/MC: 0.99% a 2.50% + IVA | AMEX: 2.90% + IVA",
      "Compra única ($2,500 + IVA) o renta ($250 + IVA/mes)",
      "Incluye tarjeta SIM de datos y rollos de papel"
    ]
  },
  {
    name: "Banorte (TPV)",
    category: "banco",
    baseRate: 0.018,
    debitRate: 0.014,
    creditRate: 0.022,
    rateRangeText: "Débito: 0.85% a 2.50% + IVA | Crédito: 1.80% a 2.65% + IVA",
    effectiveRateText: "Desde 0.99% en débito y paquetes preferenciales desde 2.65% acumulado",
    monthlyRentText: "$200 a $350 MXN + IVA por equipo al mes (exentable)",
    depositTimeText: "Día hábil siguiente en cuenta empresarial Banorte",
    minVolumeText: "Renta mensual exentable cumpliendo volumen de facturación",
    extraNotesText: "Cuenta con paquetes con comisiones preferenciales desde 2.65% acumulado según el giro y volumen del comercio.",
    msiRates: { "3": 0.038, "6": 0.068, "9": 0.095, "12": 0.12 },
    color: "#EB1C24",
    textColor: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-600/10 text-rose-600 dark:text-rose-400 border-rose-600/20",
    description: "TPV Banorte con tasas altamente competitivas en tarjeta de débito (desde 0.85% + IVA) y crédito (1.80% a 2.65% + IVA). Renta exentable por volumen.",
    officialUrl: "https://www.banorte.com/wps/portal/empresas/Home/servicios-en-linea/terminales-punto-de-venta",
    benefits: [
      "Débito: 0.85% a 2.50% + IVA | Crédito: 1.80% a 2.65% + IVA",
      "Renta de $200 a $350 MXN + IVA/mes (exentable)",
      "Paquetes con tasas preferenciales por volumen"
    ]
  },
  {
    name: "Citibanamex (TPV)",
    category: "banco",
    baseRate: 0.021,
    debitRate: 0.0185,
    creditRate: 0.024,
    rateRangeText: "Débito: 1.20% a 2.50% + IVA | Crédito: 1.80% a 3.00% + IVA",
    effectiveRateText: "Débito desde 1.39% efec. | Crédito desde 2.09% efec.",
    monthlyRentText: "$250 a $400 MXN + IVA/mes + Afiliación inicial $290 MXN",
    depositTimeText: "24 horas hábiles en cuenta de cheques Citibanamex",
    minVolumeText: "Facturación mínima pactada de $15,000 MXN/mes (aplica penalización por bajo uso)",
    extraNotesText: "Requiere cuota inicial de afiliación ($290 MXN) y mantener facturación mínima mensual de $15,000 MXN para evitar penalización.",
    msiRates: { "3": 0.04, "6": 0.07, "9": 0.098, "12": 0.125 },
    color: "#004B87",
    textColor: "text-sky-700 dark:text-sky-400",
    badgeBg: "bg-sky-700/10 text-sky-700 dark:text-sky-300 border-sky-700/20",
    description: "TPV Citibanamex para comercios establecidos. Tasas de 1.20% a 2.50% + IVA en débito y 1.80% a 3.00% + IVA en crédito. Meta mínima de $15,000 MXN/mes.",
    officialUrl: "https://www.banamex.com/es/empresas/cobros-y-pagos/terminal-punto-de-venta.html",
    benefits: [
      "Débito: 1.20% a 2.50% + IVA | Crédito: 1.80% a 3.00% + IVA",
      "Cuota de afiliación ($290) + Renta ($250-$400 + IVA)",
      "Facturación mínima requerida: $15,000 MXN/mes"
    ]
  },
  {
    name: "HSBC México (TPV)",
    category: "banco",
    baseRate: 0.032,
    debitRate: 0.028,
    creditRate: 0.036,
    rateRangeText: "Ventas al detalle/Menudeo — Débito: 2.80% + IVA | Crédito: 3.60% + IVA",
    effectiveRateText: "Débito: 3.25% efectiva | Crédito: 4.18% efectiva",
    monthlyRentText: "~$521 MXN + IVA al mes + Contratación inicial ~$1,304 MXN + IVA",
    depositTimeText: "24 horas hábiles en cuenta empresarial HSBC",
    minVolumeText: "Facturación mínima > $7,500 MXN/mes (penalización de $450 MXN + IVA si es menor o igual)",
    extraNotesText: "En esquema de ventas al detalle/menudeo aplica contratación inicial (~$1,304 + IVA), renta mensual (~$521 + IVA) y cuota de $450 + IVA si no supera $7,500 MXN/mes.",
    msiRates: { "3": 0.042, "6": 0.072, "9": 0.102, "12": 0.13 },
    color: "#DB0011",
    textColor: "text-red-700 dark:text-red-400",
    badgeBg: "bg-red-700/10 text-red-700 dark:text-red-300 border-red-700/20",
    description: "TPV HSBC (Menudeo): Débito 2.80% + IVA y Crédito 3.60% + IVA. Contratación inicial ~$1,304 + IVA, renta ~$521 + IVA y mínimo mensual de $7,500 MXN.",
    officialUrl: "https://www.hsbc.com.mx/empresas/productos-y-servicios/adquirente-tpv/",
    benefits: [
      "Menudeo: Débito 2.80% + IVA | Crédito 3.60% + IVA",
      "Contratación ~$1,304 + IVA | Renta ~$521 + IVA/mes",
      "Penalización ($450 + IVA) si facturas ≤ $7,500 MXN/mes"
    ]
  }
];

export const referidos: ReferidoLink[] = [
  {
    id: "mp-terminal",
    name: "Mercado Pago Point",
    provider: "Mercado Pago",
    description: "Obtén tu terminal Point con un descuento de bienvenida directo, sin rentas mensuales.",
    logo: "./logos/mercado-pago.png",
    color: "#009EE3",
    link: "https://mpago.li/2pUxu9R",
    iconName: "Smartphone",
    benefits: ["Sin rentas mensuales", "Descuento incluido", "Dinero en segundos"],
    category: "terminal"
  },
  {
    id: "nu-cuenta",
    name: "Cuenta Nu",
    provider: "Nu México",
    description: "Tarjeta de crédito sin anualidad y rendimiento de ahorro altamente competitivo en tus Cajitas Nu.",
    logo: "./logos/nu.png",
    color: "#820AD1",
    link: "https://nu.com.mx/mgm/?id=TNSZFAn13WHkYjQw7ve_cw&msg=06478&utm_channel=referral&utm_medium=other&utm_source=mgm",
    iconName: "CreditCard",
    benefits: ["Cero comisión anual", "Ahorros con gran rendimiento", "Aprobación al instante"],
    category: "cuenta"
  },
  {
    id: "banorte-card",
    name: "Tarjeta de Crédito Banorte",
    provider: "Banorte",
    description: "Crédito inmediato con excelentes opciones de Meses Sin Intereses nacionales.",
    logo: "./logos/banorte.png",
    color: "#EB1C24",
    link: "https://www.tarjetas.creditobanorte.com/referido?idref=2438781331",
    iconName: "ShieldCheck",
    benefits: ["Acumula puntos", "Meses sin Intereses", "Trámite 100% digital"],
    category: "cuenta"
  },
  {
    id: "didi-card",
    name: "DiDi Card",
    provider: "DiDi",
    description: "Tarjeta de crédito de trámite sencillo con aprobación inmediata desde tu smartphone.",
    logo: "./logos/didi.png",
    color: "#FF8E00",
    link: "https://d.didiglobal.com/jEulhMZ?r=MGM_homepage_pop&c=M2",
    iconName: "Award",
    benefits: ["Cashback en viajes y comida", "Sin costo de anualidad", "Aprobación en minutos"],
    category: "cuenta"
  },
  {
    id: "plata-card",
    name: "Plata Card",
    provider: "Banco Plata",
    description: "Tarjeta de crédito con aprobación inteligente, altos montos asignados y reembolso directo en efectivo por tus consumos cotidianos.",
    logo: "./logos/plata.png",
    color: "#10B981",
    link: "https://platacard.mx/amigos/credito/cajaherra",
    iconName: "CreditCard",
    benefits: ["Hasta 15% de cashback en dinero real", "Límite de crédito hasta $200,000", "Sin anualidad de por vida al registrarte hoy"],
    category: "cuenta"
  },
  {
    id: "mp-cuenta",
    name: "Cuenta Digital Mercado Pago",
    provider: "Mercado Pago",
    description: "La cuenta digital integral para centralizar y administrar todos los cobros de tu negocio.",
    logo: "./logos/mercado-pago.png",
    color: "#009EE3",
    link: "https://mpago.li/2aiGZ5h",
    iconName: "Wallet",
    benefits: ["Rendimiento de saldo diario", "Tarjeta Mastercard gratis", "Transferencias SPEI al instante"],
    category: "cuenta"
  },
  {
    id: "didi-prestamos",
    name: "DiDi Préstamos",
    provider: "DiDi",
    description: "Préstamos personales en efectivo de trámite rápido con aprobación inmediata, directo a tu cuenta bancaria y sin aval.",
    logo: "./logos/didi.png",
    color: "#FF8E00",
    link: "https://d.didiglobal.com/qsYsqMQ",
    iconName: "Coins",
    benefits: ["Aprobación en minutos", "Sin aval ni garantías", "Depósito inmediato por SPEI"],
    category: "prestamo"
  },
  {
    id: "baubap-prestamos",
    name: "Préstamos Baubap",
    provider: "Baubap",
    description: "Micropréstamos móviles con aprobación inmediata las 24 horas, sin revisar Buró de Crédito y con reembolso de intereses al pagar a tiempo.",
    logo: "./logos/baubap.png",
    color: "#00b894",
    link: "https://bap.mx/PExk7",
    iconName: "Coins",
    benefits: ["Sin Buró ni aval requerido", "Aprobación veloz en 15 minutos", "Bonificación por pago puntual"],
    category: "prestamo"
  }
];

export const promotions: Promotion[] = [
  {
    id: "promo-mp",
    name: "Mercado Pago Point",
    description: "Descuento de bienvenida al solicitar tu primer Point y opciones de financiamiento sin intereses.",
    officialUrl: "https://mpago.li/2pUxu9R",
    imageUrl: "./logos/mercado-pago.png",
    duration: "Vigente temporalmente"
  },
  {
    id: "promo-clip",
    name: "Clip",
    description: "Precios reducidos de temporada de terminales físicas y opciones de MSI para tus clientes.",
    officialUrl: "https://www.clip.mx",
    imageUrl: "./logos/clip.png",
    duration: "Vigente de temporada"
  },
  {
    id: "promo-zettle",
    name: "Zettle by PayPal",
    description: "Precios promocionales en lectores de tarjetas tras vincular tu facturación de manera nativa.",
    officialUrl: "https://www.zettle.com/mx",
    imageUrl: "./logos/zettle.png",
    duration: "Vigente de temporada"
  }
];
