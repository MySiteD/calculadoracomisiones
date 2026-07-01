import { Provider, ReferidoLink, Promotion } from "./types";

export const providers: Provider[] = [
  {
    name: "Ualá Bis",
    baseRate: 0.029,
    msiRates: { "3": 0.045, "6": 0.075, "9": 0.10, "12": 0.125 },
    color: "#E20613",
    textColor: "text-red-400",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/20",
    description: "Una de las tasas de procesamiento más competitivas del mercado fintech mexicano. Excelente opción costo-beneficio.",
    officialUrl: "https://www.ualabis.com.mx/lector",
    benefits: ["Depósito al día siguiente", "Menor comisión del mercado", "Sin rentas fijas mensuales"]
  },
  {
    name: "Mercado Pago",
    baseRate: 0.035,
    msiRates: { "3": 0.0469, "6": 0.079, "9": 0.109, "12": 0.139 },
    color: "#009EE3",
    textColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    description: "La plataforma líder que brinda liquidez inmediata de tus cobros, crédito PYME y rendimiento diario de dinero.",
    officialUrl: "https://www.mercadopago.com.mx/herramientas-para-vender/lectores-point",
    benefits: ["Dinero al instante 24/7", "Gran ecosistema de servicios", "Acepta todas las tarjetas y QR"]
  },
  {
    name: "Zettle",
    baseRate: 0.035,
    msiRates: { "3": 0.048, "6": 0.078, "9": 0.105, "12": 0.135 },
    color: "#002C9B",
    textColor: "text-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Excelente compatibilidad para quienes operan habitualmente con PayPal y buscan simplicidad administrativa de alto nivel.",
    officialUrl: "https://www.zettle.com/mx/lector-de-tarjetas",
    benefits: ["Vinculación nativa con PayPal", "Catálogo integrado de productos", "Respaldo global de PayPal"]
  },
  {
    name: "Clip",
    baseRate: 0.036,
    msiRates: { "3": 0.045, "6": 0.075, "9": 0.105, "12": 0.135 },
    color: "#FF5E00",
    textColor: "text-orange-400",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    description: "Pioneros en el sector mexicano con un amplio catálogo de terminales robustas y soporte técnico inmediato 24/7.",
    officialUrl: "https://shop.clip.mx/collections/productos-clip",
    benefits: ["Atención al cliente telefónica premium", "Acepta vales de despensa", "Instalación en minutos"]
  },
  {
    name: "NetPay",
    baseRate: 0.035,
    msiRates: { "3": 0.045, "6": 0.075, "9": 0.10, "12": 0.13 },
    color: "#19A74E",
    textColor: "text-emerald-450 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Líder regional con terminales interconectadas inteligentes (NetPay Smart) con amplio soporte multi-giro.",
    officialUrl: "https://netpay.mx/netpay-smart/",
    benefits: ["Terminal Inteligente Android", "Depósito el mismo día o 24h", "Acepta tarjetas de vales Sodexo y más"]
  },
  {
    name: "Sr. Pago",
    baseRate: 0.036,
    msiRates: { "3": 0.045, "6": 0.075, "9": 0.105, "12": 0.135 },
    color: "#808080",
    textColor: "text-slate-450 dark:text-slate-300",
    badgeBg: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    description: "Un servicio integrado bajo el respaldo de Konfío para aceptar transacciones y complementar con financiamiento PYME.",
    officialUrl: "https://konfio.mx/sr-pago/",
    benefits: ["Financiado por Konfío", "Terminal física y links de pago", "Ideal para pequeños comercios"]
  },
  {
    name: "Billpocket",
    baseRate: 0.035,
    msiRates: { "3": 0.045, "6": 0.07, "9": 0.10, "12": 0.13 },
    color: "#00BCD4",
    textColor: "text-cyan-450 dark:text-cyan-400",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    description: "Una de las plataformas pioneras en procesamiento móvil del país, ahora bajo la infraestructura global de Kushki.",
    officialUrl: "https://www.billpocket.com/",
    benefits: ["Soporte de primer nivel", "Sin renta mensual ni mínimos", "Depósitos rápidos a tu cuenta"]
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
