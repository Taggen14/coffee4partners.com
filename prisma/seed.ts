import {
  PrismaClient,
  InquiryType,
  InquiryStatus,
  MessageRole,
} from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Automater",
    description: "Någon beskrivning för Automater.",
  },
  {
    name: "Förbrukningsvaror",
    description: "Någon beskrivning för Förbrukningsvaror.",
  },
  {
    name: "Övrigt",
    description: "Någon beskrivning för Övrigt.",
  },
] as const;

const subCategories = [
  {
    name: "Kaffeautomater",
    description: "Någon beskrivning för kaffeautomater.",
    category: "Automater",
  },
  {
    name: "Vattemautomater",
    description: "Någon beskrivning för Vattemautomater.",
    category: "Automater",
  },
  {
    name: "Kaffe",
    description: "Någon beskrivning för kaffe.",
    category: "Förbrukningsvaror",
  },
  {
    name: "Te",
    description: "Någon beskrivning för Te.",
    category: "Förbrukningsvaror",
  },
  {
    name: "Snacks",
    description: "Någon beskrivning för snacks.",
    category: "Övrigt",
  },
  {
    name: "Kyld Dryck",
    description: "Någon beskrivning för kyld dryck.",
    category: "Övrigt",
  },
  {
    name: "Tillbehör",
    description: "Någon beskrivning för Tillbehör.",
    category: "Övrigt",
  },
] as const;

const products = [
  /* Förbrukningsvaror */
  /* Förbrukningsvaror Kaffe Arvid Nordquist */
  {
    name: "Arvid Nordquist Green Forest , Hela bönor",
    vendor: "Arvid Nordquist",
    description: ["MELLANMÖRK - BALANSERAD & FRUKTIG Doft av karamell och mandel. Balanserad smak med ton av fikon. En fruktigt syrlig eftersmak. . Green Forest är dubbelcertifierat med UTZ och  EU Ekologiskt."],
    productSpecifications: [
      "LEVERANTÖR Arvid Nordquist AB",
      "VARUMÄRKE Arvid Nordquist",
      "FÖRSÄLJNINGSENHET 6x1kg",
      "ART. NR.4121",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745563176/GreenForest_720x_crx2fq.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Arvid Nordquist Ethic Harvest , Hela bönor",
    vendor: "Arvid Nordquist",
    description: ["MÖRKROST - KRAFTFULL & KRYDDIG Ren doft av nöt. Smaken är fyllig med livlig syrlighet. Kryddig eftersmak med ton av lakrits. Ethic Harvest är trippelcertifierat med Fairtrade, EU Ekologiskt och KRAV"],
    productSpecifications: [
      "LEVERANTÖR Arvid Nordquist AB",
      "VARUMÄRKE Arvid Nordquist",
      "FÖRSÄLJNINGSENHET 6x1kg",
      "ART. NR.4049",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745564379/EthicHarvest_720x_tuwydy.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Arvid Nordquist Highland Nature , Hela bönor",
    vendor: "Arvid Nordquist",
    description: ["MELLANROST - FRUKTIG & NÖTIG Generös doft av hasselnöt. Rund smak med viss pepprighet. En balanserad och fruktig eftersmak. Highland Nature är trippelcertifierat med Fairtrade, EU Ekologiskt och KRAV"],
    productSpecifications: [
      "LEVERANTÖR Arvid Nordquist AB",
      "VARUMÄRKE Arvid Nordquist",
      "FÖRSÄLJNINGSENHET 6x1kg",
      "ART. NR.4079",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745564470/HighlandNature_720x_ik84dw.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Arvid Nordquist Midnight Grown , Hela bönor",
    vendor: "Arvid Nordquist",
    description: ["EXTRA MÖRKROST - INTENSIV & KRAFTFULL Intensiv doft. Kraftfull och fyllig smak med inslag av mörk choklad. Lång och generös eftersmak.Midnight Grown är UTZ certifierat."],
    productSpecifications: [
      "LEVERANTÖR Arvid Nordquist AB",
      "VARUMÄRKE Arvid Nordquist",
      "FÖRSÄLJNINGSENHET 6x1kg",
      "ART. NR.4034",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745564542/MidnightGrown_720x_rtrzac.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Arvid Nordquist Dark Mountain , Hela bönor",
    vendor: "Arvid Nordquist",
    description: ["MÖRKROST - BÄRIG & FYLLIG Fyllig smak med inslag av björnbär och orientaliska kryddor. Elegant syra och lång eftersmak. Dark Mountain är UTZ certifierat."],
    productSpecifications: [
      "LEVERANTÖR Arvid Nordquist AB",
      "VARUMÄRKE Arvid Nordquist",
      "FÖRSÄLJNINGSENHET 6x1kg",
      "ART. NR.4029",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745564626/dark-mountain_sccsaf.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  /* Förbrukningsvaror Kaffe Lavazza */
  {
    name: "Gran Riserva Filter, hela bönor",
    vendor: "Lavazza",
    description: ["Gran Riserva Filter, hela bönor, från Lavazza för café, hotell, restaurang och kaffebarer. 100 % Arabica-bönor och ljuvliga toner av karamell och kakao som balanseras med det intesiva kaffet. Rökiga toner från den torkade kakon och en sötare profil från karamelliserat socker. Gran Riserva Filter är optimalt för gott bryggkaffe."],
    productSpecifications: [
      "LEVERANTÖR Lavazza Nordic AB",
      "VARUMÄRKE Lavazza",
      "FÖRSÄLJNINGSENHET 6x1kg",
      "ART. NR.3454",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 66 st",
    ],
    productAttributes: [
      "Gran Riserva Filter från Lavazza för café, hotell, restaurang",
      "Hela bönor för bryggkaffe",
      "Aromatiska toner av kakao och karamell",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745564825/3454_gran-riserva_720x_aaongi.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Alteco Espresso, hela bönor",
    vendor: "Lavazza",
    description: ["Ekologiskt kaffe med hela bönor, Alteco, från Lavazza. En söt och elegant espresso, med aromer av honung och torkad frukt. Kaffet har en rund kakaofinish och bönorna är rostade under en lång tid under låg värme, för en ultimat balans mellan arom och smak. Bönorna härstammar ifrån de finaste sluttningarna i Centralamerika och vackra berg i Afrika. Alteco är ett 100% ekologisk kaffe gjort på både Arabica och Robusta. Kaffet har både EU:s ekologiska certifiering och UTZ, för bättre villkor i landbruket. Ett hållbart och säkert val för din kaffeservering på café, restaurang, hotell, förening eller hotell!"],
    productSpecifications: [
      "LEVERANTÖR Lavazza Nordic AB",
      "VARUMÄRKE Lavazza",
      "FÖRSÄLJNINGSENHET 6x1kg",
      "ART. NR.2221",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 66 st",
    ],
    productAttributes: [
      "Espresso, hela bönor",
      "Rostning: Mellan",
      "Arabica och Robusta (Ekologiska bönor)",
      "Elegant espresso",
      "Arom av honung och torkad frukt",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745565029/lavazza-alteco-image_720x_ffurxu.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Super Gusto Espresso, hela bönor",
    vendor: "Lavazza",
    description: ["Ett välbalanserat mellanrostat kaffe med en fyllig och omfamnande smak av kryddor och torkad frukt från Lavazza. Fylligheten kommer huvudsakligen från Arabicabönor med inslag av Robustabönor. Kaffet är en UTZ certifierad blandning från odlingar i Västra Sydamerika och Sydöstra Brasilien som framkallar aromer av torkade frukter såsom dadlar samt en kryddig avslutning med en hint av kanel."],
    productSpecifications: [
      "LEVERANTÖR Lavazza Nordic AB",
      "VARUMÄRKE Lavazza",
      "FÖRSÄLJNINGSENHET 6x1kg",
      "ART. NR.4517",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 66 st",
    ],
    productAttributes: [
      "Espresso, hela bönor",
      "Rostning: Mellan",
      "Smak av kryddor och torkad frukt",
      "60% Arabica, 40% Robusta",
      "UTZ certifierat kaffe",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745565157/4517_super-gusto_720x_yizt8b.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  /* Förbrukningsvaror Kaffe Löfbergs */
  {
    name: "DARK 0,5 1000g",
    vendor: "Löfbergs",
    description: [
      "Smakbeskrivning: Ett välbalanserat automatkaffe med smak av kakao och mogna plommon som ger en aromatisk eftersmak. Innehåller 100 % utvalda arabicakaffe där basen är kaffebönor från Brasilien, Colombia och Etiopien – som blandas med kaffebönor från Syd- och Centralamerika och Östafrika beroende på säsong. Kaffet är Rainforest-Alliance certifierat.",
      "Med malningsgrad 0,5 är Mörk 20218 anpassat för kaffeautomat.",
      "Löfbergs Dark hette tidigare Löfbergs Mörk. Namnet ändrades 2017 då det professionella sortimentet uppdaterades.",
    ],
    productSpecifications: [
      "LEVERANTÖR Löfbergs Lila AB ",
      "VARUMÄRKE Löfbergs",
      "FÖRSÄLJNINGSENHET 6x1000g",
      "ART. NR.20218",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745915065/dark_11_360x_oetmlz.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "EXCLUSIVE, hela bönor, 6 kg, FT/EKO",
    vendor: "Löfbergs",
    description: [
      "Det mest kraftfulla kaffet i portföljen är Exclusive från Löfbergs med styrka 5 på en 5-gradig skala. Ett rejält mörkrostat kaffe med fruktig syrlighet samt toner av mörka bär tillsammans med en eftersmak av kakao. De ekologiska och Fairtrade-märkta bönorna kommer från Peru, Nicaragua och övriga Syd- och Centralamerika.",
    ],
    productSpecifications: [
      "LEVERANTÖR Löfbergs Lila AB ",
      "VARUMÄRKE Löfbergs",
      "FÖRSÄLJNINGSENHET 6x1000g",
      "ART. NR.20415",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745915965/exclusive_360x_qxxtjj.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "FAZENDA, hela bönor, 6 kg",
    vendor: "Löfbergs",
    description: [
      "Ett mörkrostat, smakrikt kaffe med toner av torkad frukt och en lång angenäm eftersmak av mörk choklad. Hela kaffebönor packade i 1000 gram per påse. Observera att du behöver en kaffekvarn eller automat för hela bönor för att brygga kaffet.",
    ],
    productSpecifications: [
      "LEVERANTÖR Löfbergs Lila AB ",
      "VARUMÄRKE Löfbergs",
      "FÖRSÄLJNINGSENHET 6x1000g",
      "ART. NR.20540",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [
      "Ursprung: Brasilien, Colombia, Centralamerika och Östafrika.",
      "Certifiering: Rainforest Alliance.",
      "Kaffeböna: 100% arabica",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745916094/fazenda_4_360x_gaxyby.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "DARK, hela bönor, 6kg",
    vendor: "Löfbergs",
    description: [
      "Ett distinkt mörkrostat kaffe med stor fyllighet och finstämda markerade aromer. Stor, frisk och fruktig syrlighet, milda toner av kakao och aprikos samt en lång utsökt eftersmak. Bönor från Sydamerika och Kenya. Observera att kaffet är hela kaffebönor så du behöver en kaffekvarn eller kaffemaskin som maler bönorna före bryggning.",
      "Denna produkt hette tidigare Löfbergs Black Symphony. Namnet ändrades 2017 då det professionella sortimentet uppdaterades.",
    ],
    productSpecifications: [
      "LEVERANTÖR Löfbergs Lila AB ",
      "VARUMÄRKE Löfbergs",
      "FÖRSÄLJNINGSENHET 6x1000g",
      "ART. NR.20413",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 36 st",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745916184/dark_12_360x_xqfgpx.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "MAFIOSO ESPRESSO",
    vendor: "Löfbergs",
    description: [
      "Härliga och smakrika espresso-bönor från Brasilien och Östafrika. Kaffe av högsta kvalité och ett av Löfbergs spännande specialkaffen. Tack vare att espresson bryggs under ett högt tryck så framhävs dess smaker och aromer extra tydligt. Mafioso har toner av torkad frukt och är oerhört fylligt och krämigt. Den är dessutom toppad med trivsam eftersmak av mörk choklad. Ett kaffe ni kommer att älska som också är certifierat med Rainforest Alliance.",
    ],
    productSpecifications: [
      "LEVERANTÖR Löfbergs Lila AB ",
      "VARUMÄRKE Löfbergs",
      "FÖRSÄLJNINGSENHET 8x500g",
      "ART. NR.20505",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 48 st",
    ],
    productAttributes: [
      "Mafioso Espresso",
      "Hela bönor",
      "Specialkaffe från Löfbergs",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745917573/20505_mafioso_espresso_500g_360x_nw9car.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "PRIMO frystorkat 250g",
    vendor: "Löfbergs",
    description: [
      "Smakbeskrivning: Ett kraftfullt, fylligt och frystorkat instantkaffe som även passar som espresso. Har en lägre syrlighet och kraftig rostning.",
    ],
    productSpecifications: [
      "LEVERANTÖR Löfbergs Lila AB ",
      "VARUMÄRKE Löfbergs",
      "FÖRSÄLJNINGSENHET 10x250g",
      "ART. NR.20703",
      "ANTAL ST PER KRT 10 st",
      "ANTAL KRT PER PALL 60 st",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745917691/20703_primo-instant_360x_drpepb.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  /* Förbrukningsvaror Kaffe Zoegas */
  {
    name: "Cultivo, hela bönor 8x750g",
    vendor: "Zoegas",
    tagline: "KRYDDIG & DUBBELT SÅ GOD MÖRKROST",
    description: [
      "Tvättade högvuxna bönor från Etiopien tillsammans med bönor från Centralamerika ger ett friskt kaffe med välbalanserad fyllighet och smak av örter, mogna bär och nöt. Zoegas Cultivo kaffe är ekologisk och märkt med både KRAV & Faitrade.",
    ],
    productSpecifications: [
      "LEVERANTÖR Nestlé Professional",
      "VARUMÄRKE Zoégas Professional",
      "FÖRSÄLJNINGSENHET 8x750g",
      "ART. NR.12213978",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 32 st",
    ],
    productAttributes: [
      "Zoégas Cultivo Kaffe 100% Arabica bönor",
      "Mörkrostat, Kryddigt med smak av mogna bär nöt och örter",
      "Säljes i påsar med HELA BÖNOR 8x750g",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745916719/zoegas-cultivo-750g_360x_fifihu.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Skånerost, Hela bönor",
    vendor: "Zoegas",
    tagline: "KRAFTIG & SMAKRIK MÖRKROST",
    description: [
      "Klassisk mörkrost med kraftfull smak och nyanserad friskhet med toner av lakritsrot, kakao och nöt. Lång eftersmak av mogna bär. Kaffet får sin unika karaktär från bland annat brasilianska pärlbönor, högvuxna bönor från Centralamerika kompletterat med bönor från Kenya. Originalet från 1918 togs fram till dåvarande Hotell Horns i Malmö, senare döptes blandningen om till Skånerost.",
    ],
    productSpecifications: [
      "LEVERANTÖR Nestlé Professional",
      "VARUMÄRKE Zoegas",
      "FÖRSÄLJNINGSENHET 8x750g",
      "ART. NR.12130892",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 32 st",
    ],
    productAttributes: [
      "ZOÉGAS Skånerost med mörkrostade 100% Arabica bönor",
      "Mörkrostad med kraftfull smak och toner av nöt, kakao och lakritsrot",
      "HELA BÖNOR 8x750g",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745916889/zoegas-skanerost-750g_360x_rrfy4c.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Dark Zenith, hela bönor 750g",
    vendor: "Zoegas",
    tagline: "FRUKTIG & RUND MÖRKROST",
    description: [
      "Mörkrost som till stor del består av högvuxet tvättat kaffe från de soliga bergssluttningarna i Centralamerika. Blandningen balanseras med pärlbönor från Brasilien och kaffe från Östafrika tillför fyllighet. Det ger ett uppfriskande kaffe med rund smak som påminner om nougat och honung där sötma och syra kompletterar varandra.",
    ],
    productSpecifications: [
      "LEVERANTÖR Nestlé Professional",
      "VARUMÄRKE Zoegas",
      "FÖRSÄLJNINGSENHET 8x750g",
      "ART. NR.12217089",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 32 st",
    ],
    productAttributes: [
      "ZOÉGAS Dark Zenith- fruktig och rund mörkrost",
      "Certifierad med rainforest alliance.",
      "Säljes i påse med HELA BÖNOR á 750g",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745916991/zoegas-dark-zenith-750g_54bebdfb-487f-4779-b9ce-54aad776e6ef_360x_gtuuzz.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Zoégas Cultivo - malet kaffe",
    vendor: "Zoegas",
    tagline: "KRYDDIG & DUBBELT SÅ GOD MÖRKROST",
    description: [
      "Tvättade högvuxna bönor från Etiopien tillsammans med bönor från Centralamerika ger ett friskt kaffe med välbalanserad fyllighet och smak av örter, mogna bär och nöt. Zoegas Cultivo kaffe är ekologisk och märkt med både KRAV & Faitrade.",
    ],
    productSpecifications: [
      "LEVERANTÖR Nestlé Professional",
      "VARUMÄRKE Zoegas",
      "FÖRSÄLJNINGSENHET 6x1000g",
      "ART. NR.12217130",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 32 st",
    ],
    productAttributes: [
      "Zoégas Cultivo Kaffe 100% Arabica bönor",
      "Mörkrostat, Kryddigt med smak av mogna bär nöt och örter",
      "Säljes i påsar med HELA BÖNOR 6x1000g",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745917094/zoegas-cultivo-750g-2_360x_xcl17l.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Espresso Bellezza, Hela bönor",
    vendor: "Zoegas",
    description: [
      "Söt och fylliga hela Espressobönor med fruktig karaktär från Zoega.Espresso Bellezza är en ljuvlig och mjuk espresso med smakrika aromer och len crema. Den är gjord på 100% Arabicabönor från Brasilien och Östafrika, där blandningen ger en ljuvlig mix av fruktiga toner som påminner om körsbär. Men förutom dessa två länder, finns även en tredje part... det är nämligen så att espresson ger en lång och fyllig eftersmak av mörk choklad där smaken kommer från Indiska bönor.",
    ],
    productSpecifications: [
      "LEVERANTÖR Nestlé Professional",
      "VARUMÄRKE Zoegas",
      "FÖRSÄLJNINGSENHET 8x500g",
      "ART. NR.12355936",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 40 st",
    ],
    productAttributes: [
      "Espresso Bellezza från Zoégas med fruktig karakär.",
      "Förpackning på 8x500g",
      "Hela bönor som för bästa smak mals vid bryggning.",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745917227/zoegas-bellezza-500g_360x_oxim84.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  {
    name: "Eco Coffee, hela bönor 750g",
    vendor: "Zoegas",
    description: [
      "ZOÉGAS Eco Coffee är ett ekologiskt och Rainforest Alliance certifierat mörkrostat kaffe. Kaffet är smakfullt med medel fyllighet och balanserad syra,med en eftersmak av fruktiga toner och doftar ljuvligt! De är gjort på 100% HELA Arabica bönor och är rostat på Svensk mark i Helsingborg med miiljömedvetenhet, då all el kommer från vindkraftverk.",
    ],
    productSpecifications: [
      "LEVERANTÖR Nestlé Professional",
      "VARUMÄRKE Zoegas",
      "FÖRSÄLJNINGSENHET 8x750g",
      "ART. NR.12241930",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 32 st",
    ],
    productAttributes: [
      "ZOÉGAS Eco Coffee HELA BÖNOR á 750g",
      "Ekologiskt och Rainforest alliance certifierat",
      "Mörkrostat med balanserad syrlighet med eftersmak av fruktiga toner",
      "100% Arabica bönor",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745917322/zoegas-eco-750g_360x_ki4vak.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Kaffe",
  },
  /* Förbrukningsvaror te */
  {
    name: "Forest Fruits Tea",
    vendor: "Lipton",
    description: [
      "Forest Fruits Tea från Lipton. Ett te fullproppat med många av skogens alla härligheter. Eller vad sägs om riktiga fruktbitar från bland annat hallon, jordgubb, röda vinbär, björnbär och körsbär. Med Liptons 120 åriga erfarenhet är det inte konstigt att resultatet blir såhär bra!",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60338",
      "LEV. ART. NR.23848001",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st",
    ],
    productAttributes: [
      "Skogs-te",
      "Pyramidform",
      "RA-certifierad",
    ],
    price: 0,
    images: [
      "",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  /* Automater */
  /* Automater Kaffeautomater*/
  {
    name: "Esprecious 11L",
    vendor: "Bravilor Bonamat",
    description: ["Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad."],
    productSpecifications: [
      "Vattentrycket 2 Bar",
      "Vatten anslutning Ja",
      "Färg Stainless dark",
      "Anslutning 230V~ 50/60Hz 1650W",
      "Mått (bxdxh) 240x460x630 mm",
    ],
    productAttributes: [
      "Användarvänlig: intuitiv pekskärm",
      "Böna-till-kopp: brygger med färska kaffebönor",
      "Kaffespecialiteter som cappuccino bereds med färsk mjölk",
      "Dubbelt utlopp: serverar två drycker samtidigt",
      "Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion",
      "Separata inställningar av temperatur, vatten/kaffeförhållande, etc.",
      "Service- och underhållsvänlig",
      "Hög kvalitet i koppen tack vare automatiskt sköljprogram",
      "Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll",
      "Separat utlopp för hetvatten för bl.a. te",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745565667/23648087-origpic-600303_720x_zimbiy.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745565667/23648087-origpic-b6498b_720x_zyrc8s.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745565666/23648087-origpic-a99f7e_da2dcb29-4a2a-42f4-a2af-a3ca07efc31e_720x_kw5r2o.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Bolero 21",
    vendor: "Bravilor Bonamat",
    description: [" Om du väljer Bolero 21 med två behållare kan du till exempel fylla en behållare med instantkaffe och den andra med topping (mjölkpulver). På så sätt kan du servera kaffespecialiteter som cappuccino, caffè latte och latte macchiato. Du kan erbjuda upp till 3 varma drycker. Den manuella kranen ger hett vatten till te eller soppa."],
    productSpecifications: [
      "Snabb och användarvänlig",
      "Tillverkad av robusta högkvalitativa material som rostfritt stål och BPA-fri plast",
      "Hett vatten från separat utlopp",
      " Kaffestyrka och dryckesstorlek (S / M / L) kan väljas på skärmen",
      "Eko läge och isolering av kokaren för minskad energiförbrukning",
      "Okomplicerade program för sköljning och avkalkning",
      "Patenterade mixarsystem som kraftigt minskar beläggning av ingredienser",
      "Genomskinliga behållare gör det enkelt att fylla på",
      "Dag och totalräknare",
      "Olika programmerbara inställningar för att optimera valda drycker",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918233/10280-17711369_360x_o3pg2h.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918234/21245300-origpic-cf2bae_360x_yf1nhn.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Bolero 32",
    vendor: "Bravilor Bonamat",
    description: ["Bolero 32 erbjuder ett brett utbud av drycker, upp till 36 totalt. Pekskärmen erbjuder totalt fyra sidor där du kan ha upp till nio drycker per sida. Du kan till exempel kombinera instantkaffe, topping (mjölkpulver) och kakao."],
    productSpecifications: [
    ],
    productAttributes: [
      "Snabb och användarvänlig",
      "Tillverkad av robusta högkvalitativa material som rostfritt stål och BPA-fri plast",
      "Hett vatten från separat utlopp",
      "Kaffestyrka och dryckesstorlek (S / M / L) kan väljas på skärmen",
      "Eko läge och isolering av kokaren för minskad energiförbrukning",
      "Okomplicerade program för sköljning och avkalkning",
      "Patenterade mixarsystem som kraftigt minskar beläggning av ingredienser",
      "Genomskinliga behållare gör det enkelt att fylla på",
      "Dag och totalräknare",
      "Olika programmerbara inställningar för att optimera valda drycker",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918440/21652125-origpic-3ef921_360x_f2kt0z.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918441/21652125-origpic-bdccba_360x_zg1tqz.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "THa Pumptermosbryggare med vattenanslutning",
    vendor: "Bravilor Bonamat",
    description: ["Filterbryggare för utrymmen med vattenanslutning. Brygger kaffe direkt i en termos eller en pumptermos. Levereras med filterhållare av rostfritt stål. Levereras inklusive Furento pumptermos med stålkärna."],
    productSpecifications: [
    ],
    productAttributes: [
      "Välsmakande färskt bryggkaffe",
      "Rostfritt stål av hög kvalitet kombinerat med svarta detaljer ger maskinen ett modernt utseende.",
      "Kaffet brygger direkt i en pumptermos eller en termos",
      "Signal anger när kaffet är klart och när maskinen behöver avkalkas",
      "Digital styrning",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918601/20994247-origpic-42b203_fc904cba-b1b4-4ef1-962b-b146d383fba3_360x_yp1vhe.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918604/20994247-origpic-9c82b5_24390cf3-ad72-417b-8228-108978b101a7_360x_qxxlf2.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918602/20994247-origpic-808ca8_3580d625-e7cf-414b-9d37-1a71456d6355_360x_x8sc0r.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Freshground 310",
    vendor: "Bravilor Bonamat",
    description: ["Saknar beskrivning"],
    productSpecifications: [
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918798/21652272-origpic-56739e_360x_qttuxn.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918797/21652272-origpic-5188fd_360x_gcypbe.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Freshground 310 Touch",
    vendor: "Bravilor Bonamat",
    description: [
      "FreshGround 310 Touch är en helautomatisk kaffebryggare med tre behållare. En behållare för kaffebönor och två för instantprodukter såsom topping (pulvermjölk) och kakao. Med hjälp av dessa instantprodukter kan du servera olika drycker såsom kaffe, Mocka, Cappuccino, Café au lait, Moccachino, Latte macchiato, och varm choklad.",
      "FreshGround 310 Touch har ett separat utlopp för hett vatten, till te eller soppa. Kunderna kan dessutom välja om de vill använda en kopp, mugg eller kanna med kaffe/hett vatten.",
    ],
    productSpecifications: [
    ],
    productAttributes: [
      "Val mellan 8 varma drycker",
      "Bean-to-cup!",
      "Separat utlopp för hett vatten",
      "Välj mellan kopp, mugg eller kanna",
      "Programmerbara inställningar: storlek (ml), styrka m.m.",
      "Iögonenfallande pekskärm",
      "Energisparläge",
      "För platser med vattenanslutning",
      "Med ECBC-certifikat (European Coffee Brewing Centre)",
      "Smarta räknare - varnar när sumphinken är full eller avkalkning behövs, samt visar daglig/kumulativ användning",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918969/21116456-origpic-4cd3d3_360x_hccv1y.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918971/21116456-origpic-5f8169_360x_xwktg5.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745918968/21116456-origpic-1a08e7_360x_nuquow.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Freshmore 310",
    vendor: "Bravilor Bonamat",
    description: [
      "Saknar beskrivning",
    ],
    productSpecifications: [
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919057/23609795-origpic-9712c1_360x_so1m9b.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919055/23609795-origpic-6e8f90_360x_ht3slg.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Freshmore 310 touch",
    vendor: "Bravilor Bonamat",
    description: [
      "FreshMore 310 Touch är en helautomatisk kaffebryggare med tre behållare. En behållare för malet (Fresh Brew) kaffe och två för instantprodukter såsom topping (pulvermjölk) och kakao. Med hjälp av dessa instantprodukter kan du servera olika drycker såsom kaffe, Mocka, Cappuccino, Café au lait, Moccachino, Latte macchiato, och varm choklad. FreshMore 310 Touch har ett separat utlopp för hett vatten, till te eller soppa. Kunderna kan dessutom välja om de vill använda en kopp, mugg eller kanna med kaffe/hett vatten.",
    ],
    productSpecifications: [
    ],
    productAttributes: [
      "Val mellan 8 varma drycker",
      "Separat utlopp för hett vatten",
      "Välj mellan kopp, mugg eller kanna",
      "Programmerbara inställningar: storlek (ml), styrka m.m. Iögonenfallande pekskärm",
      "Energisparläge",
      "För platser med vattenanslutning",
      "Med ECBC-certifikat (European Coffee Brewing Centre)",
      "Smarta räknare - varnar när sumphinken är full eller avkalkning behövs, samt visar daglig/kumulativ användning",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919183/21138842-origpic-b13359_360x_a27ruh.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919185/21138842-origpic-cb4dc4_360x_qw4ch5.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919181/21138842-origpic-0378d8_360x_znsnxa.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Esprecious 12",
    vendor: "Bravilor Bonamat",
    description: [
      " Esprecious 21L har en delad bönbehållare för två olika sorters kaffebönor. Du kan till exempel välja espresso, koffeinfritt eller vanliga kaffebönor. Esprecious 21L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.",
    ],
    productSpecifications: [
    ],
    productAttributes: [
      "Användarvänlig: intuitiv pekskärm",
      "Böna-till-kopp: brygger med färska kaffebönor",
      "Kaffespecialiteter som cappuccino bereds med färsk mjölk",
      "Dubbelt utlopp: serverar två drycker samtidigt",
      "Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion",
      "Separata inställningar av temperatur, vatten/kaffeförhållande, etc.",
      "Service- och underhållsvänlig",
      "Hög kvalitet i koppen tack vare automatiskt sköljprogram",
      "Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll",
      "Separat utlopp för hetvatten för bl.a. te",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919375/134052548-origpic-eec7ae_360x_ikfhdc.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919373/134052548-origpic-376293_360x_yeo2xh.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919371/134052548-origpic-03c56c_360x_qzp8pt.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Iso",
    vendor: "Bravilor Bonamat",
    description: [
      "Standard filterbryggare utan vattenanslutning. Brygger kaffet direkt i en 2-liters termos. Levereras med termos av rostfritt stål (2 liter) och filterhållare av plast.",
    ],
    productSpecifications: [
      "Drycker: Kaffe",
      "Buffertlager: 2 liter",
      "Timme kapacitet: 18 liter",
      "Bryggtid: 6 minuter",
      "Vatten anslutning: Nej",
      "Anslutning: 230V~ 50/60Hz 2000W",
      "Mått (bxdxh): 214x391x465 mm",
      "Artikelnr: 8.010.090.31002 Iso",
    ],
    productAttributes: [
      "Välsmakande färskt bryggkaffe",
      "Maskinen fylls med vatten manuellt och kan därför placeras var som helst",
      "Lättanvänd och enkel att underhålla",
      "Termos för att behålla rätt temperatur på kaffet",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919527/23557790-origpic-29a7b1_360x_gicuhw.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919529/23557790-origpic-cab263_360x_frekto.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919525/23557790-origpic-16b387_360x_guhdzi.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Mondo Twin",
    vendor: "Bravilor Bonamat",
    description: [
      "Filterbryggare utan anslutning till vatten. Levereras med 4 kannor och 2 rostfria filterhållare. Modell med 2 bryggcentraler och 4 värmeplattor.",
    ],
    productSpecifications: [
      "Drycker: Kaffe",
      "Timme kapacitet: 36 liter",
      "Timme kapacitet: 28 liter",
      "Vatten anslutning: Nej",
      "Anslutning: 400V 3N~ 50/60Hz 4280W",
      "Anslutning: 230V~ 50/60Hz 3460W",
      "Mått (bxdxh): 404x406x446 mm",
      "Artikelnr: 8.010.030.11002 Mondo Twin",
      "Artikelnr: 8.010.030.31002 Mondo Twin",
    ],
    productAttributes: [
      "Välsmakande färskt bryggkaffe",
      "Rostfritt stål av hög kvalitet kombinerat med svarta detaljer ger maskinen ett modernt utseende.",
      "Maskinen fylls på med vatten manuellt och kan därför placeras var som helst",
      "Vattenindikatorn anger om maskinen har fyllts",
      "Självreglerande värmeplattor bevarar kaffets kvalitet så bra som det är möjligt",
      "Signal anger när kaffet är klart och när maskinen behöver avkalkas.",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919824/23556050-origpic-07c11b_360x_hwkqub.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919826/23556050-origpic-d38860_360x_wreny7.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "TH Pumptermosbryggare",
    vendor: "Bravilor Bonamat",
    description: [
      "Filterbryggare för utrymmen utan vattenanslutning. Brygger kaffe direkt i en termos eller en pumptermos. Levereras med filterhållare av rostfritt stål. Levereras inklusive Furento pumptermos med stålkärna.",
    ],
    productSpecifications: [
      "Drycker: Kaffe",
      "Buffertlager: 2,2 liter",
      "Timme kapacitet: 19 liter",
      "Bryggtid: 7 minuter",
      "Vatten anslutning: Nej",
      "Anslutning: 230V~ 50/60Hz 2310W",
      "Mått (bxdxh): 235x406x545 mm",
      "Artikelnr: 4.010.040.31012 TH",
    ],
    productAttributes: [
      "Välsmakande färskt bryggkaffe",
      "Rostfritt stål av hög kvalitet kombinerat med svarta detaljer ger maskinen ett modernt utseende.",
      "Kaffet bryggs direkt i en pumptermos eller en termos",
      "Signal anger när kaffet är klart och när maskinen behöver avkalkas",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919993/20994247-origpic-42b203_360x_sgmrjc.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919999/20994247-origpic-9c82b5_360x_o4njai.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745919996/20994247-origpic-808ca8_360x_rojzov.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  {
    name: "Sego 12",
    vendor: "Bravilor Bonamat",
    description: [
      "Sego 12 är en helautomatisk espressobryggare. Tack vare det smala formatet och den tydliga och intuitiva pekskärmen, passar Sego överallt. Bravilor Bonamat har noggrant valt ut, sammanställt och förprogrammerat de vanligaste kaffespecialiteterna åt dig. Du kan alltså snabbt och enkelt ansluta maskinen och ta den i bruk. Kaffekvaliteteten i varje kopp har högsta prioritet. Därför designar och utvecklar vi själva de huvudkomponenter som kräver underhåll. Bravilor Bonamat ser till att rengöringsarbetet begränsas till ett minimum och utförs (om möjligt) automatiskt.",
    ],
    productSpecifications: [
    ],
    productAttributes: [
      "Tre behållare: en för kaffebönor och två för instantprodukter såsom topping och choklad.",
      "Enkel hantering tack vare intuitiv pekskärm.",
      "Menyn erbjuder upp till 30 dryckesalternativ.",
      "Om så önskas kan vattentemperatur, kontakttid, malningsgrad och koppstorlek justeras.",
      "Sego passar perfekt på kontor, i väntrum och butiker.",
      "Energisparläget minskar energiförbrukningen när maskinen inte används.",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745920162/bonamat-sego-12_1_360x_sbvped.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745920165/bonamat-sego-12_2_360x_jw2nez.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745920167/bonamat-sego-12_3_360x_hbkej7.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Kaffeautomater",
  },
  /* Automater vattenautomater*/
  {
    name: "Albatross hög",
    vendor: "Escowa",
    description: [
      "Albatross är vår absolut storsäljare och är en smäcker kranpelare i modern och utmanande design. Albatross kan fås med en eller två tappkranar och kranen serverar kylt kolsyrat och/eller kylt naturellt vatten.",
      "Den passar utmärkt som inbyggnadskran till bänk eller våra fristående skåp Titan, Orion eller Halia. Albatross kan levereras i sju olika utföranden i en mix av hög/låg, en eller två kranar samt tre olika färger och kan kopplas till Escowas alla kylare.",
      "Albatross kommer i standardutförande med höga handtag med märkning för vattenval, men kan extrautrustas med andra typer av handtag. Observera att bilderna på hemsidan kan visa kranar som extrautrustats med andra handtag.",
    ],
    productSpecifications: [
    ],
    productAttributes: [
      "Kromat utförande med 1 kran",
      "Kromat utförande med 2 kranar",
      "Svart utförande med 2 kranar",
      "Koppar utförande med 2 kranar",
      "Mässing utförande med 2 kranar",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745920679/placeholder-image_o2sfbh.jpg",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Vattemautomater",
  },
  {
    name: "Escowa Pro Juice",
    vendor: "Escowa",
    description: [
      "Pro Juice är utvecklad utifrån kravet på minsta möjliga mått och har plats för 3 x Bag in Box-förpackningar a 3 liter. Koncentraten ger vanligtvis 15-18 liter färdig dryck/förpackning. Pro Juice har också ett knappval för kylt, stilla vatten.",
      "Maskinen manövreras med beröringsfria knappar och har en justerbar hylla för anpassning till glas och karaffer.",
      "Vidare har Pro Juice en patenterad blandningsteknik som blandar drycken direkt innan utloppet. Detta medför minsta möjliga underhåll och bästa möjliga smak.",
    ],
    productSpecifications: [
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745920872/Untitled_design_-_2021-12-28T142337.212-removebg-preview_360x_ataj7w.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Vattemautomater",
  },
  {
    name: "Lom Evo",
    vendor: "Escowa",
    description: [
      "Med Lom EVO har vi tagit det bästa vi har från vår samlade erfarenhet om kranpelare. Resultatet är en evolution av stil och funktion.",
      "Lom EVO har en hög tapphöjd för att kunna användas med de allra flesta vanligen förekommande flaskor och karaffer på marknaden. Den använder våra fjädrande kranar, självklart gjorda helt i rostfritt stål.",
      "Designmässigt har vi använt Loms enkla uttryck i kombination med den uppskattade svarta glanslacken från Lom LED, även här med inslag av LED-belysning i form av ett vridbart toppstycke. Lom EVO finns också i ett utförande med elegant silverlack.",
      "Välj om den vinklade bakbelysta ytan ska synas framåt eller bakåt. Allt för att förenkla kommunikationen av ditt varumärke. Vidare är Lom EVO utrustat med greppvänliga höga handtag i med tydlig text för stilla respektive kolsyrat vatten.",
      "Lom EVO är lätt att serva och installera. Tack vare ett genomgående monteringsstag kan den monteras på tjockare bänkskivor än standard. Kranen går också att dela i tre delar för att förenkla service.",
    ],
    productSpecifications: [
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745923141/4214000_2_360x_hn0pjf.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745923143/Lom-Evo_360x_sv7pps.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Vattemautomater",
  },
  {
    name: "Piccola Fizz",
    vendor: "Escowa",
    description: [
      "Piccola Fizz är en vattenkylare som passar utmärkt på det något mindre företaget där man är ute efter ett iskallt glas med kolsyrat eller kylt vatten. Trots sin ringa storlek bjuder Piccola Fizz på flera olika vattenval. Vad sägs tex om rejält kolsyrat, lätt kolsyrat, kylt stilla eller till och med ”vanligt”, okylt vatten.",
    ],
    productSpecifications: [
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745923244/piccola-front_360x_c0phbh.avif",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745923247/piccola-3_1_360x_fcjf5s.webp",
    ],
    stock: 10,
    category: "Automater",
    subCategory: "Vattemautomater",
  },
  /* Övrigt */
  /* Övrigt/Snacks */
  {
    name: "TWIX White chokladbit",
    vendor: "Mars",
    description: ["Kex med ett tjockt lager av krämig karamell och ett täckte av len vit choklad, hör du vilken magisk kombination för munnen det är, och det är just vad TWIX White är. Och självklart är bitarna tvådelade, så dela med dig av denna godbit."],
    productAttributes: [
      "Användarvänlig: intuitiv pekskärm",
      "Böna-till-kopp: brygger med färska kaffebönor",
      "Kaffespecialiteter som cappuccino bereds med färsk mjölk",
      "Dubbelt utlopp: serverar två drycker samtidigt",
      "Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion",
      "Separata inställningar av temperatur, vatten/kaffeförhållande, etc.",
      "Service- och underhållsvänlig",
      "Hög kvalitet i koppen tack vare automatiskt sköljprogram",
      "Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll",
      "Separat utlopp för hetvatten för bl.a. te",
    ],
    productSpecifications: [
      "LEVERANTÖR Mars Sverige AB",
      "VARUMÄRKE Mars",
      "FÖRSÄLJNINGSENHET 32x46g",
      "VÅRT ART. NR.53809",
      "LEV. ART. NR.319792",
      "ANTAL ST PER KRT 32 st",
      "ANTAL KRT PER PALL 300 st",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745566191/twix_720x_f0eiox.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  /* Övrigt/Kyld Dryck */
  {
    name: "Ramlösa Fläder/Lime",
    vendor: "Ramlösa",
    description: ["Ramlösa Fläder/Lime i 33 cl-burk för café, restaurang och kiosk. Vad är egentligen godare än dryck med smak av fläder? Ramlösa har skapat en fantastisk törstsläckare bestående av lätt kolsyrat mineralvatten med naturliga mineraler och salter, smaksatt med frisk lime och somrig fläder. Vattnet från Ramlösa Hälsobrunn får sin balanserade smak på naturlig väg från dess vandring genom berggrunden och de skånska ängarna. "],
    productAttributes: [
      "Ramlösa Fläder/Lime i 33 cl-burk för café, restaurang och kiosk",
      "Naturliga mineraler, salter och aromer",
      "Frisk smak av somrig fläderblom",
    ],
    productSpecifications: [
      "LEVERANTÖR Carlsberg Sverige AB",
      "VARUMÄRKE Ramlösa",
      "FÖRSÄLJNINGSENHET 24x33cl",
      "VÅRT ART. NR.53982",
      "LEV. ART. NR.15893",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 81 st",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745824665/ramlosa_flader_lime_33cl_540x_wfdq3q.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  /* Övrigt tillbehör */
  {
    name: "Filterrullar",
    vendor: "",
    description: [
      "Saknar beskrivning",
    ],
    productSpecifications: [
      "Artikelnr: 4.011.114.101 1 kartong (5 filter rullar) 89 mm bred för färskbryggt-serien",
    ],
    productAttributes: [
      "Dessa filterrullar ger en optimal fördelning av kaffet och en utsökt arom.",
      "Filterrullarna är förpackade i lådor om 5 stycken.",
      "Cirka 2 000 koppar kan bryggas med en rulle.",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745923487/PHO-ACCfilterrollLW_360x_ue8cwq.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },
  {
    name: "Platta filter",
    vendor: "",
    description: [
      "Detta filter ger en optimal fördelning av kaffet och en utsökt arom. Tack vare dess form och volym så är detta det bästa alternativet för grovmalet kaffe. De plana filtren är förpackade i lådor om 250 stycken.",
    ],
    productSpecifications: [
      "Storlek diameter filter: 172 mm, Artikelnr: 7.150.503.301 B5 (HW)",
      "Storlek diameter filter: 244 mm, Artikelnr: 7.150.507.301 B10 (HW)",
      "Storlek diameter filter: 330 mm, Artikelnr: 7.150.505.301 B20 (HW)",
      "Storlek diameter filter: 400 mm, Artikelnr: 7.150.508.301 B40",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745991482/FilterpaperB10_frontside_jpg_720x_hgip1p.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },
  {
    name: "Korgfilter",
    vendor: "",
    description: [
      "Korgfilter för urnbryggare.",
    ],
    productSpecifications: [
      "Storlek diameter filter: 110/360 mm, Artikelnr: 7.150.102.301 B5 (HW) och termosbryggare Aurora",
      "Storlek diameter filter: 152/437 mm, Artikelnr: 7.150.103.301 B10 (HW)",
      "Storlek diameter filter: 203/535 mm, Artikelnr: 7.150.104.301 B20 (HW)",
      "Storlek diameter filter: 280/635 mm, Artikelnr: 7.150.105.301 B40",
    ],
    productAttributes: [
      "Korgfilter för urnbryggare.",
      "B5 (HW) och Aurora-serien - 110/360 mm.",
      "B10 (HW) - 152/437 mm.",
      "B20 (HW) - 203/535 mm.",
      "B40 - 280/635 mm.",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745991690/7_150_102_301-KORFFILTERPAP-B5-LOS_jpg_720x_efuil5.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },
  {
    name: "Rengörings-tabletter",
    vendor: "",
    description: [
      "FreshMilk behöver daglig rengöring. Pekskärmen leder dig genom rengöringsprogrammet steg för steg. Du behöver 2 tabletter per dag. Tabletter säljs per burk (120 tabletter) och per kartong (12 burkar).",
    ],
    productSpecifications: [
      "Artikelnr: 7.193.401.101 1 burk om 120 rengörings-tabletter för FreshMilk",
      "Artikelnr: 7.193.401.102 12 burkar à 120 rengörings-tabletter för FreshMilk",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745991845/PHO-ACCFreshMilkcleaningtablets_720x_egggt0.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },
  {
    name: "Cleaner",
    vendor: "",
    description: [
      "Cleaner för att rester av kaffe och te försvinner, vilket gör att den rena smaken bevaras och att stopp undviks.",
    ],
    productSpecifications: [
      "Artikelnr: 7.191.101.212 1 kartong 4x15 påsar, 15 gram per påse",
      "Artikelnr: 7.191.102.201 1 kartong, 10 burkar 1 kilo/st",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745991945/PHO-ACCCleanersachetRV_720x_fxxdxo.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },
  {
    name: "Renegite",
    vendor: "",
    description: [
      "För avkalkning av din maskin och för att minska risken för fel och för att bevara en ren smak.",
    ],
    productSpecifications: [
      "Artikelnr: 7.190.101.212 1 kartong 4 x 15 påsar, 50 gram per påse",
      "Artikelnr: 7.190.102.201 1 kartong, 10 burkar 1 kilo/st",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745992008/PHO-ACCRenegitesachetRV_720x_ihhb4v.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },
  {
    name: "Rostfri kanna",
    vendor: "",
    description: [
      "Vackert designad flaska av rostfritt stål som rymmer 1,7 eller 2,2 liter. Kannan har ett lock med gångjärn, som är lätt att använda, och plasthandtag.",
    ],
    productSpecifications: [
      "Artikelnr: 7.170.901.401 Rostfri kanna 1,7 liter",
      "Artikelnr: 7.170.902.301 Rostfri kanna 2,2 liter",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745992134/PHO-ACCstainlesssteeldecanterRV_720x_khromr.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },
  {
    name: "Filter",
    vendor: "",
    description: [
      "Detta filter ger en optimal fördelning av kaffet och en utsökt arom. Tack vare dess form och volym så är detta det bästa alternativet för malet kaffe. Filtren är förpackade i lådor om 1000 stycken. Extra kvantitetsrabatt vid köp av 5 kartonger eller fler.",
    ],
    productSpecifications: [
      "Storlek diameter filter: 85/245 mm",
      "Artikelnr: 7.150.101.101 Filter - 1000 filter/kartong",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745992234/PHO-ACCfilterpaperquickfilterRV_720x_j1wgms.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },
  {
    name: "Glaskanna",
    vendor: "",
    description: [
      "Ergonomisk och rymmelig. Vackert designad kanna som rymmer 1,7 liter. Kannan har ett lock med gångjärn, som är lätt att använda, och plasthandtag",
    ],
    productSpecifications: [
      "Artikelnr:  7.170.602.101 1 glaskanna i en kartong",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745992346/PHO-ACCglassdecanterRV_720x_piodvp.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Tillbehör",
  },

  /* Template */

  /*   
  {
      name: "",
      vendor: "",
      description: [
        "",
      ],
      productSpecifications: [
        "",
        "",
        "",
        "",
        "",
      ],
      productAttributes: [
        "",
        "",
        "",
        "",
      ],
      price: 0,
      images: [
        "",
      ],
      stock: 10,
      category: "",
      subCategory: "",
    }, 
    */
];

async function main() {
  // Clean up existing data
  await prisma.cartItem.deleteMany();
  // console.log("🗑️ cartItem");
  await prisma.cart.deleteMany();
  // console.log("🗑️ cart");
  await prisma.orderItem.deleteMany();
  // console.log("🗑️ orderItem");
  await prisma.order.deleteMany();
  // console.log("🗑️ order");
  await prisma.product.deleteMany();
  // console.log("🗑️ product");
  await prisma.subCategory.deleteMany();
  // console.log("🗑️ subCategory");
  await prisma.category.deleteMany();
  // console.log("🗑️ category");
  await prisma.feature.deleteMany();
  // console.log("🗑️ feature");

  console.log("🗑️ Cleaned up ALL existing data");

  // Create categories
  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
        },
      }),
    ),
  );

  console.log("📦 Created categories");

  // Create subCategories
  const createdSubCategories = await Promise.all(
    subCategories.map((subCategory) => {
      const category = createdCategories.find(
        (c) => c.name === subCategory.category,
      );
      if (!category) throw new Error(`Category ${subCategory.category} not found`);

      return prisma.subCategory.create({
        data: {
          name: subCategory.name,
          description: subCategory.description,
          categoryId: category.id,
        },
      })
    }
    ),
  );

  console.log("📦 Created subCategories");

  // Create products
  const createdProducts = await Promise.all(
    products.map((product) => {
      const category = createdCategories.find(
        (c) => c.name === product.category,
      );
      if (!category) throw new Error(`Category ${product.category} not found`);

      const subCategory = product.subCategory
        ? createdSubCategories.find((sc) => sc.name === product.subCategory)
        : null;

      const subCategoryId = subCategory ? subCategory.id : null;

      return prisma.product.create({
        data: {
          name: product.name,
          vendor: product.vendor,
          tagline: product.tagline,
          description: product.description,
          productAttributes: product.productAttributes,
          productSpecifications: product.productSpecifications,
          price: product.price,
          stock: product.stock,
          images: product.images,
          categoryId: category.id,
          subCategoryId: subCategoryId,
        },
      });
    }),
  );

  console.log("📦 Created products");

  // Create some features
  const features = [
    { name: "Color", value: "Black" },
    { name: "Size", value: "Medium" },
    { name: "Material", value: "Premium" },
  ];

  await Promise.all(
    features.map((feature) =>
      prisma.feature.create({
        data: {
          name: feature.name,
          value: feature.value,
          products: {
            connect: [
              { id: createdProducts[0].id },
              { id: createdProducts[1].id },
            ],
          },
        },
      }),
    ),
  );

  console.log("📦 Created features");

  // Create a sample order
  await prisma.order.create({
    data: {
      status: "DELIVERED",
      customerEmail: "john@example.com",
      customerName: "John Doe",
      shippingAddress: "123 Main St, City, Country",
      totalAmount: 299.97,
      orderItems: {
        create: [
          {
            quantity: 1,
            unitPrice: 199.99,
            productId: createdProducts[0].id,
          },
          {
            quantity: 2,
            unitPrice: 49.99,
            productId: createdProducts[5].id,
          },
        ],
      },
    },
  });

  console.log("📦 Created sample order");

  // Create a sample cart
  await prisma.cart.create({
    data: {
      sessionId: "sample-session-id",
      items: {
        create: [
          {
            quantity: 1,
            productId: createdProducts[2].id,
          },
          {
            quantity: 2,
            productId: createdProducts[3].id,
          },
        ],
      },
    },
  });

  console.log("📦 Created sample cart");

  // Create sample inquiries
  const inquiries = [
    {
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@example.com",
      type: InquiryType.AI,
      status: InquiryStatus.ACTIVE,
      subject: "Order Delivery Question",
      lastMessage: "When can I expect my order #12345 to be delivered?",
      messages: [
        {
          content:
            "Hi, I placed order #12345 yesterday. When can I expect it to be delivered?",
          role: MessageRole.USER,
        },
        {
          content:
            "Hello Sarah! I can help you with that. Let me check your order status.",
          role: MessageRole.ASSISTANT,
        },
        {
          content:
            "I see that your order is being processed and will be shipped within 2-3 business days. You'll receive a tracking number via email once it's shipped.",
          role: MessageRole.ASSISTANT,
        },
        {
          content: "When can I expect my order #12345 to be delivered?",
          role: MessageRole.USER,
        },
      ],
    },
    {
      customerName: "Mike Brown",
      customerEmail: "mike.b@example.com",
      type: InquiryType.HUMAN,
      status: InquiryStatus.RESOLVED,
      subject: "Product Return Request",
      lastMessage:
        "Thanks for helping me process the return. I'll ship it tomorrow.",
      messages: [
        {
          content:
            "I need to return a product I received yesterday. It's not what I expected.",
          role: MessageRole.USER,
        },
        {
          content:
            "I understand, Mike. I'll help you process the return. Could you provide your order number?",
          role: MessageRole.ASSISTANT,
        },
        {
          content: "Sure, it's order #54321",
          role: MessageRole.USER,
        },
        {
          content:
            "I've processed your return request. I'm sending you a return label via email. Please use this to ship the item back to us.",
          role: MessageRole.ASSISTANT,
        },
        {
          content:
            "Thanks for helping me process the return. I'll ship it tomorrow.",
          role: MessageRole.USER,
        },
      ],
    },
    {
      customerName: "Emma Wilson",
      customerEmail: "emma.w@example.com",
      type: InquiryType.AI,
      status: InquiryStatus.ACTIVE,
      subject: "Product Availability",
      lastMessage: "Is the wireless headphone coming back in stock soon?",
      messages: [
        {
          content:
            "Hi, I'm interested in the wireless headphones but they're out of stock. Will they be available soon?",
          role: MessageRole.USER,
        },
        {
          content: "Hello Emma! Let me check our inventory system for you.",
          role: MessageRole.ASSISTANT,
        },
        {
          content: "Is the wireless headphone coming back in stock soon?",
          role: MessageRole.USER,
        },
      ],
    },
    {
      customerName: "David Lee",
      customerEmail: "david.l@example.com",
      type: InquiryType.HUMAN,
      status: InquiryStatus.ACTIVE,
      subject: "Custom Order Inquiry",
      lastMessage: "I'd like to place a bulk order for corporate gifts.",
    },
    {
      customerName: "Lisa Chen",
      customerEmail: "lisa.c@example.com",
      type: InquiryType.AI,
      status: InquiryStatus.ARCHIVED,
      subject: "Payment Issue",
      lastMessage:
        "The payment issue has been resolved. Thank you for your help!",
    },
    {
      customerName: "James Wilson",
      customerEmail: "james.w@example.com",
      type: InquiryType.HUMAN,
      status: InquiryStatus.RESOLVED,
      subject: "Product Recommendation",
      lastMessage: "Perfect, I'll go with the premium model you suggested.",
    },
    {
      customerName: "Anna Smith",
      customerEmail: "anna.s@example.com",
      type: InquiryType.AI,
      status: InquiryStatus.ACTIVE,
      subject: "Shipping to Europe",
      lastMessage: "What are the shipping costs to Germany?",
    },
    {
      customerName: "Tom Harris",
      customerEmail: "tom.h@example.com",
      type: InquiryType.HUMAN,
      status: InquiryStatus.ACTIVE,
      subject: "Warranty Claim",
      lastMessage: "I've sent the photos of the damaged product.",
    },
  ];

  // Create inquiries with messages
  for (const inquiry of inquiries) {
    const { messages, ...inquiryData } = inquiry;
    const createdInquiry = await prisma.inquiry.create({
      data: {
        ...inquiryData,
        messages: {
          create:
            messages?.map((message) => ({
              content: message.content,
              role: message.role,
            })) || [],
        },
      },
    });
    console.log(`Created inquiry: ${createdInquiry.id}`);
  }

  console.log("📦 Created sample inquiries with messages");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
