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
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1745992762/lipton_forest_fruits_p_sar_720x_qfaezx.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Earl Grey Tea",
    vendor: "Lipton",
    description: [
      "Earl Grey Tea från Lipton. Earl Grey är en riktig klassiker inom te-familjen. Lipton har över 120 års erfarenhet och deras Earl Grey är ett resultat av det. Tebladen är av enbart högsta kvalitet som tillsammans med bergamott har skapat den karakteristiska och uppskattade citrussmaken.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60336",
      "LEV. ART. NR.25879301",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st",
    ],
    productAttributes: [
      "Härligt Earl Grey-te",
      "6x25 (150 påsar)",
      "RA-certifierat",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747919456/lipton_earl_grey_p_sar_540x_rbsa27.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Sortimentskartong, Classic Te",
    vendor: "Lipton",
    description: [
      "Gott och blandat från Lipton. 150 påsar som är noga utvalda för att täcka ett brett segment och innehåller därför många varierade sorter och smaker. Vi kan lova att det finns någon smak för alla och det är ett perfekt alternativ för den som vill variera innehållet i koppen. Gemensamt för dem alla är att de är sköraded på RA-certifierade odlingar.",
    ],
    productSpecifications: [
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 12x25st",
      "VÅRT ART. NR.60333",
      "LEV. ART. NR.F48417",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 115 st"
    ],
    productAttributes: [
      "12x25 (300 påsar) (tidigare 6x25 (150 påsar))",
      "RA-certifierade",
      "Härlig blandning från Liptons favoriter",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747919581/lipton_sortimentskartong_540x_llnnc7.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "",
    vendor: "Lipton",
    description: [
      "Vanilj-te från Lipton. Ett i mängden av härliga svarta teer med uppskattade smaker. Den ljuvliga vaniljen tillsammans med den rika tearomen gör detta till ett smakfullt och populärt te för alla åldrar. RA-certifierat som alltid från Lipton.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60350",
      "LEV. ART. NR.F86912",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ]
    ,
    productAttributes: [
      "Svart te, Vanilj",
      "Säljes 6x25 st (150 påsar)",
      "RA-certifierat",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747919668/lipton_black_tea_vanilla_540x_t0nm8h.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Lemon Tea",
    vendor: "Lipton",
    description: [
      "Lemon Tea från Lipton. Ett smakfullt svart te med citronskal. Ett i mängden av populära teer från uppskattade Lipton med över 120 års erfarenhet. Alla deras teer är RA-certifierade och maximal smakupplevelse fås om påsen får dra i 2-3 minuter.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60344",
      "LEV. ART. NR.25872001",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ]
    ,
    productAttributes: [
      "Svart te med citron-bitar",
      "RA-certifierat",
      "Säljes 6x25 (150 påsar)",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747919747/lipton_lemon_p_sar_540x_dvab19.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Green Tea",
    vendor: "Lipton",
    description: [
      "Green Tea från Lipton. Ett klassiskt grönt te som är lätt och fräscht att dricka. RA-certifierat och ett resultat av Liptons 120 år inom te-industrin. Ett kuvert-te att tycka om!",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60339",
      "LEV. ART. NR.15898701",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ],
    productAttributes: [
      "Grönt te",
      "Lätt och friskt",
      "Kuvert-te",
      "Säljes 6x25 (150st påsar)",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747919843/lipton_green_tea_p_sar_540x_wkhho1.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Blackcurrant Tea",
    vendor: "Lipton",
    description: [
      "Blackcurrant Tea från Lipton. Detta svarta te med smak av svarta vinbär har en härligt naturlig sötma och är ett populärt inslag i svenskarnas vardag. Alla svarta teer från Lipton kommer från tebusken Camellia sinensis. Låt påsen dra i 2-3 minuter för maximal upplevelse.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60334",
      "LEV. ART. NR.15883701",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ],
    productAttributes: [
      "Svartvinbärs-te",
      "Säljes 6x25 (150 påsar)",
      "En riktig klassiker",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747919958/lipton_blackcurrant_p_sar_540x_yh36qt.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Displaykartong te, 12 sorter",
    vendor: "Lipton",
    description: [
      "Snygg displaykartong med te från Lipton för hotell, kontor och café. Om man inte redan var sugen på te så blir man det när den här kartongen kommer fram. En samling av favoriterna från Lipton. Som alltid är deras teer skördade på RA-certifierade odlingar och med Liptons drygt 125 år inom te-branschen så förstår man att resultatet blir suveränt. Unna era gäster många valmöjligheter med denna displaykartong.",
    ],
    productSpecifications: [
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 1x180st",
      "VÅRT ART. NR.60331",
      "LEV. ART. NR.67648810",
      "ANTAL ST PER KRT 1 st",
      "ANTAL KRT PER PALL 143 st"
    ],
    productAttributes: [
      "Blandade Lipton-teer i snygg kartong",
      "180 påsar totalt av 12 olika sorters te",
      "Allt te är Rainforest Alliance-certifierat",
      "Blue Fruit",
      "Russian Earl Grey",
      "Darjeeling",
      "Rooibos",
      "Forest Fruits",
      "Vanilla",
      "Lemon",
      "Yellow Label",
      "Earl Grey",
      "Fruit Infusion",
      "Green Tea Orient",
      "Green Tea Citrus"
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920073/lipton_variety_pack_540x_wxg1rn.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Russian Earl Grey Tea",
    vendor: "Lipton",
    description: [
      "Russian Earl Grey Tea från Lipton. Ett fylligt svart Earl-Grey te med härliga aromer pch en syrlig citrussmak. Denna klassiska teblandning på engelsk manér med sin touch av bergamott säljes likt de flesta andra teer från Lipton 6x25 (150 påsar). Givetvis odlat på RA-certifierade marker.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60347",
      "LEV. ART. NR.15890801",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ],
    productAttributes: [
      "Svart Earl-Grey te",
      "Engelsk teblandning",
      "RA-certifierad",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920131/lipton_russian_earl_grey_p_sar_540x_esmrjp.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Green Tea Orient",
    vendor: "Lipton",
    description: [
      "Grönt te från Lipton. Ett i mängden av Liptons friska gröna teer som dessutom är toppat med lite sting från kanel, lakrits och anis. Friskheten tillsammans med kryddigheten blir inget annat än succé. GIvetvis RA-certifierat som alla andra pås-teer från Lipton.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60343",
      "LEV. ART. NR.15871501",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ],
    productAttributes: [
      "Friskt och kryddigt",
      "Låt påsen dra i ca 2 min",
      "Använd syrerikt vatten (80-90ºC)",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920196/lipton_green_tea_orient_p_sar_540x_qhjorl.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Strawberry Tea",
    vendor: "Lipton",
    description: [
      "Ett svart te smaksatt med jordgubb från Lipton. En somrig smak som är svår att inte tycka om. Lipton med över 120 år inom branschen är trygga i sin smaksättning och alla deras pås-teer är RA-certifierade. Låt påsen dra i 2-3 minuter för maximal smakupplevelse. Unna er gäster riktigt gott te!",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60348",
      "LEV. ART. NR.25883301",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ],
    productAttributes: [
      "Svart te, jordgubb",
      "RA-certifierad",
      "Säljes 6x25 (150 påsar)",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920272/lipton_strawberry_p_sar_540x_dfyq9w.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Green Tea Mint",
    vendor: "Lipton",
    description: [
      "Grönt te med inslag av mynta. Ytterligare ett friskt grönt te från Lipton. Med över 120 års erfarenhet en av de ledande inom te-industrin. 100% av deras pås-teer är RA-certifierade och allt de gör genomsyras av kvalitet.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60342",
      "LEV. ART. NR.13847601",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ],
    productAttributes: [
      "Grönt te, mynta",
      "120 års erfarenhet",
      "6x25 (150påsar)",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920331/lipton_green_tea_mint_p_sar_540x_kmyxoo.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "English Breakfast Tea",
    vendor: "Lipton",
    description: [
      "English Breakfast Tea från Lipton. Ett svart te med stort S. En klassisk blandning som enbart består av de soldränkta svarta tebladen. Det behöver inte vara svårare än så. Starta dagen på engelskt vis! Teet är dessutom skördat på Rainforest Alliance (RA) - certifierade odlingar.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60337",
      "LEV. ART. NR.15898501",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ],
    productAttributes: [
      "100% svart te",
      "Engeskal favoriten",
      "RA-certifierat",
      "Säljes 6x25 (150 st påsar)",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920387/lipton_english_breakfast_p_sar_540x_xpgqf9.webp",
    ],
    stock: 10,
    category: "Förbrukningsvaror",
    subCategory: "Te",
  },
  {
    name: "Green Tea Citrus",
    vendor: "Lipton",
    description: [
      "Grönt te med citrussmak från Lipton. Frsächt och friskt som sig bör när det är ett grönt te, dessutom toppat med diverse citrusfrukter såsom lime, apelsin, citron och grapefrukt. Består av unga fina teblad från RA-certifierade odlingar.",
    ],
    productSpecifications: [
      "LEVERANTÖR Unilever Sverige AB",
      "VARUMÄRKE Lipton",
      "FÖRSÄLJNINGSENHET 6x25st",
      "VÅRT ART. NR.60340",
      "LEV. ART. NR.15883201",
      "ANTAL ST PER KRT 6 st",
      "ANTAL KRT PER PALL 162 st"
    ],
    productAttributes: [
      "Grönt te med citrusfrukter",
      "6x25 påsar (150st)",
      "Använd syrerikt vatten (80-90ºC)",
      "Låt påsen dra i 2 minuter",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920445/lipton_green_tea_citrus_p_sar_540x_vqjqyn.webp",
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
  {
    name: "TWIX XTRA chokladbit",
    vendor: "Mars",
    description: [
      "Kan du inte nog av TWIX chokladbit,  med TWIX XTRA  får du större chokladbitar. Chokladbitarna har en magiskt kombination av kex,mjuk kola och överdrag av mjölkchoklad, den kombon är svårslagen. Och är en väldigt poulär chokladbit i kiosk och cafe enheter.",
    ],
    productSpecifications: [
      "LEVERANTÖR Mars Sverige AB",
      "VARUMÄRKE Mars",
      "FÖRSÄLJNINGSENHET 30x75g",
      "VÅRT ART. NR.53808",
      "LEV. ART. NR.239443",
      "ANTAL ST PER KRT 30 st",
      "ANTAL KRT PER PALL 200 st"
    ],
    productAttributes: [
      "TWIX XTRA chokladbit",
      "Kombo av kex, mjuk kola och mjölkchoklad överdrag",
      "Säljs i storpack 30stx75g",
      "Populär i restauranger, kiosker och cafeer",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920666/239443_540x_vvwt9x.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "TWIX chokladbit",
    vendor: "Mars",
    description: [
      "Farligt goda kombinationen av krispigt kex omringat av krämig kola och mjölkchoklad, det är Twix det. Twix är alltid tvådelad, så varför inte dela med dig av den goda chokladbiten.",
      "Psst.. visste du att Twix under många år i Europa samt Austrailen hette från början Raider, för att sedan på 90-talet byta namn.",
    ],
    productSpecifications: [
      "LEVERANTÖR Mars Sverige AB",
      "VARUMÄRKE Mars",
      "FÖRSÄLJNINGSENHET 32x50g",
      "VÅRT ART. NR.53807",
      "LEV. ART. NR.278778",
      "ANTAL ST PER KRT 32 st",
      "ANTAL KRT PER PALL 252 st"
    ],
    productAttributes: [
      "TWIX chokladbit",
      "Krispigt kex omringat av krämig kola och mjölkchoklad",
      "Säljs i storpack 32st x50g för resturanger, cafe och kiosker",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920756/278778_540x_mmxbnz.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Ballerina Original",
    vendor: "Göteborgs Kex",
    description: [
      "Sveriges mest älskade kaka \"Ballerina Orginal\" från Göteborgs Kex. Klassikern har förgyllt miljontals svenskars vardag sedan 1963 och hon fortsätter att göra lika så. På en ohotad förstaplats i VM för kakor, hittar vi \"Ballerina Orginal\". Detta för sin oerhört krämiga och lena nougat, i kombination med sitt klassiska utseende. Det här är kakan för alla tidpunkter och tillfällen. Passar perfekt för café- och föreningsverksamhet. Ingen fika utan Ballerina!",
      "Visste du att vart tionde paket kakor som säljs i Sverige är ett Ballerinapaket? Dessutom äter i snitt sex personer en ballerina varje sekund! ",
      "Psst! Doppa även gärna \"Ballerina Orginal\" i mjök eller kaffe för en magisk upplevelse."
    ],
    productSpecifications: [
      "LEVERANTÖR Orkla Confectionary & Snacks AB",
      "VARUMÄRKE Göteborgs Kex",
      "FÖRSÄLJNINGSENHET 40x190g",
      "VÅRT ART. NR.51845",
      "LEV. ART. NR.5450014004",
      "ANTAL ST PER KRT 40 st",
      "ANTAL KRT PER PALL 45 st"
    ],
    productAttributes: [
      "Svensk klassiker sedan 1963",
      "Perfekt för alla tidpunkter och tillfällen",
      "Innehåller nötter",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920898/ballerina_540x_pxn3kg.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Mixlåda Kakor",
    vendor: "Gille",
    description: [
      "En mixlåda med smakrika och knapriga kakor från Gille, denna mix innehåller 8 burkar. Gille bakar uppemot 1,5 miljarder kakor varje år och de är mycket omtyckta av Sveriges befolkning. Denna mix är utmärkt för storkök, restauranger eller till föreningens kiosk.",
    ],
    productSpecifications: [
      "LEVERANTÖR Continental Bakeries North Europé",
      "VARUMÄRKE Gille",
      "FÖRSÄLJNINGSENHET 8x800g",
      "VÅRT ART. NR.61102",
      "LEV. ART. NR.311245",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 24 st"
    ],
    productAttributes: [
      "4x2 sorter á 800g",
      "2x Chokladkakor",
      "2x Kolakakor",
      "2x hallonkransar",
      "2x Vaniljdrömmar",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747920969/gille_mixbox_540x_wm2rgb.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Stor Punschrulle",
    vendor: "Delicato",
    description: [
      "Stor punschrulle från Delicato för café, butik, förening och fikastunder. Den berömda dammsugaren i en större variant för de som bara inte kan få nog. En avlång kondisbit med marsipan och lyxig choklad på sidorna. Rullen är fylld med arrak, smör och kako.",
    ],
    productSpecifications: [
      "LEVERANTÖR Delicato Bakverk AB",
      "VARUMÄRKE Delicato",
      "FÖRSÄLJNINGSENHET 22x85g",
      "VÅRT ART. NR.54138",
      "LEV. ART. NR.415",
      "ANTAL ST PER KRT 1 st",
      "ANTAL KRT PER PALL 32 st"
    ],
    productAttributes: [
      "Stor punschrulle från Delicato för café, kontor, kiosk och förening",
      "Klassisk kondisbit med marsipan",
      "Större storlek för lite mer av det goda",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921040/415_3_540x_hdgbbt.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Delicatoboll",
    vendor: "Delicato",
    description: [
      "Klassiska delicatobollar för café, butik och kiosk. Ej i portionsförpackningar utan kommer i en låda. Delicato är berömda för sina saftiga chokladbollar och fika on-the-go har aldrig varit smidigare. Färska och redo att avnjuta. Ett måste bakom disken på café och butik. ",
    ],
    productSpecifications: [
      "LEVERANTÖR Delicato Bakverk AB",
      "VARUMÄRKE Delicato",
      "FÖRSÄLJNINGSENHET 35x58g",
      "VÅRT ART. NR.53899",
      "LEV. ART. NR.27",
      "ANTAL ST PER KRT 1 st",
      "ANTAL KRT PER PALL 32 st"
    ],
    productAttributes: [
      "Klassisk delicatoboll för café, butik och kiosk",
      "Färska chokladbollar",
      "Säljes i 35x58g",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921095/27_3_4_540x_eligqn.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Sandwich, Cheese & French Herbs",
    vendor: "Wasa",
    description: [
      "Wasa´s fullkornsråg sandwich, krämig fyllning av Cheese och French Herbs.Består av två knäckebrödssticks, så det är lätt att dela med sig av när det är dags för mellanmål. Knäckebröd är ett gott och mättande alternativ när hungern slår till.",
    ],
    productSpecifications: [
      "LEVERANTÖR Barilla Sverige AB",
      "VARUMÄRKE Wasa",
      "FÖRSÄLJNINGSENHET 24x30g",
      "VÅRT ART. NR.61111",
      "LEV. ART. NR.8498",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 160 st"
    ],
    productAttributes: [
      "Krämig fyllning av ost och franska örter.",
      "Mättande fullkornsråg mellanmål",
      "Säljs i storpack, perfekt till cafeer och kiosk",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921150/picture26012018090325312705685_540x_va9l4t.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Sandwich, Cheese, Tomato & Basil",
    vendor: "Wasa",
    description: [
      "Wasa Sandwich veteknäckebröd med krämig fyllning av Cheese, Tomato & Basil. Två mättande och goda knäckbrödstick som gör mellanmålet lätt att dela med sig av när du är på språng eller på utflykt.",
    ],
    productSpecifications: [
      "LEVERANTÖR Barilla Sverige AB",
      "VARUMÄRKE Wasa",
      "FÖRSÄLJNINGSENHET 24x40g",
      "VÅRT ART. NR.61114",
      "LEV. ART. NR.8496",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 160 st"
    ],
    productAttributes: [
      "Vete knäckebröd",
      "Krämig fyllning av ost, tomat och basilika",
      "Gott mellanmål till utlykten eller när du är på språng",
      "Säljs i storpack till cafeer och kiosk",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921262/picture25012018054400963357771-_1_540x_mi4ouo.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "White Chocolate Almond",
    vendor: "Barebells",
    description: [
      "Ni vet att Barebells under 2017 var Sveriges mest sålda proteinbar va? Det firar dem genom att släppa en femte smak och vi ser ingen tecken på att den kommer att sälja sämre. Eller vad sägs om \"white chocolate almond\"? Blandningen av vit choklad och mandlar gifter sig utmärkt i munnen och likt sina andra kompisar ger även denna bar dig en proteinboost som maximerar resultatet av träning och agerar ett perfekt mellanmål. Den är dessutom helt fri från tillsatt socker. Hugg in!",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 12x55g",
      "VÅRT ART. NR.60365",
      "LEV. ART. NR.B1024",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 300 st"
    ],
    productAttributes: [
      "Protein bar - Vit choklad och mandel",
      "Nummer 5 i Barebells-familjen",
      "20 g protein och inget tillsatt socker",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921321/barebells_bar_white_chocolate_almond_540x_juxgwl.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Crunchy Fudge",
    vendor: "Barebells",
    description: [
      "Julfavoriten som fick en stående plats sortimentet! Barebells Limited Christmas Fudge (Xmas Fudge) som nu heter Crunchy Fudge. En proteinbar med smak av härlig julkola täckt i len mjölkchoklad som nu kan avnjutas året om! Innehåller hela 20g protein och inget tillsatt socker. Det perfekta mellanmålet i samband med träning, eller när man helt enkelt bara är sugen!",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 12x55g",
      "VÅRT ART. NR.61734",
      "LEV. ART. NR.B1033",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 300 st",
    ],
    productAttributes: [
      "Barebells proteinbar Crunchy Fudge (föredetta Christmas Fudge)",
      "Innehåller 20g protein",
      "Säljes i pack á 12x55g",],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921543/se_fi_es_bb_proteinbar_crunchyfudge_l1_540x_n0msqs.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Chocolate Dough",
    vendor: "Barebells",
    description: [
      "Chocolate Dough Bar från från Barebells för café, gym, förening och andra verksamheter. Det finns få saker som är bättre än choklad. Denna baren med smak av Chocolate Dough är klockren för alla chokladälskare. Utöver den goda choklassmaken är det en stor bonus att baren både är utan tillsatt socker och berikad med 20 gram protein. Proteinbaren är perfekt att grunda med innan träningspasset och funkar såklart även utanför gymmet som ett mer hälsosamt snack. ",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET12x55g",
      "VÅRT ART. NR.62037",
      "LEV. ART. NR.B1035",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 300 st",
    ],
    productAttributes: [
      "Berikad med 20 gram protein",
      "Utan tillsatt socker",
      "Smak av Chocolate Dough",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921629/barebells_proteinbar_chocolate_dough_540x_qhdxtt.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Cookies & Cream",
    vendor: "Barebells",
    description: [
      "Protein Bar \"Cookies and Cream\" från Barebells. De gånger man kan förena nytta med nöje så borde man passa på. Därför kan vi starkt rekommendera denna bar som både stimulerar din kropp och dina smaklökar. Med ett proteininnehåll på 20 g, vilket motsvarar 36% så är den en proteinbomb som ger dig maximal utdelning efter ett träningspass. Kaloriinnehållet per bar är 196 kcal och den innehåller 12 gram fett. Att den utöver det är lika god som valfritt snacks på fredagsmyset gör den till en produkt man inte vill vara utan. ",
      "Säljes i 12-pack där varje bar väger 55 gram. Enligt oss en produkt alla gym, föreningar och caféer borde ha. "
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 12x55g",
      "VÅRT ART. NR.51131",
      "LEV. ART. NR.B1020",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 300 st",
    ],
    productAttributes: [
      "Protein Bar - 20 gram protein",
      "196 kcal, 12 gram fett",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921704/barebells_protein_bar_cookies_cream_l1_no_added_sugar_540x_jj1j3p.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Caramel Cashew",
    vendor: "Barebells",
    description: [
      "Protein Bars \"Caramell Cashew\" från Barebells. \"Staying fit has never been this delicious\". Framtagen för dess goda smak men samtidigt en proteinbomb med 20 gram protein som gör skillanden efter ett hårt träningspass. En svårslagen kombo och Barebells tycker inte att man ska behöva välja mellan att äta det man älskar och att ha magrutor... Det tycker inte vi heller, därför säljer vi Barebells protein bars. ",
      "Säljes i 12-pack där varje bar väger 55 gram. Enligt oss en produkt alla gym, föreningar och caféer borde ha. "
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 12x55g",
      "VÅRT ART. NR.51129",
      "LEV. ART. NR.B1022",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 300 st",
    ],
    productAttributes: [
      "Protein Bars - 20 gram protein",
      "199 kcal, 7,9 gram fett",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921806/barebells_protein_bar_caramel_cashew_l1_no_added_sugar_540x_nhs5kq.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Salty Peanut",
    vendor: "Barebells",
    description: [
      "Protein Bar \"Salty Peanut\" från Barebells. Marknadsledande Barebells släpper här sin 4:e smak i sin omåttligt populära bars-serie. Redan efter första tuggan är vi övertygade om att det här kommer bli en minst lika stor succé som sina föregångare. De salta jordnötterna i en krämig blandning med mjölkchoklad toppat med en massa protein är en \"match from heaven\". Barsen från Barebells ger er möjlighet att förena nytta med nöje och denna bar stimulerar såväl kropp som smaklökar. Varje bar innehåller hela 20 gram protein och produkten är helt utan tillsatt socker. Passar utmärkt efter träning, som mellanmål eller som mättande fredagssnack.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 12x55g",
      "VÅRT ART. NR.51691",
      "LEV. ART. NR.B1023",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 300 st",
    ],
    productAttributes: [
      "Protein Bar, Salty Peanut",
      "4:e smaken från Barebells",
      "20 gram protein",
      "Orimligt god",
      "Säljes 12x55 gram",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747921953/barebells_protein_bar_salty_peanut_l1_no_added_sugar_540x_dwh7ul.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Hazelnut & Nougat",
    vendor: "Barebells",
    description: [
      "Protein Bar \"Hazelnut & Nougat\" från Barebells. De gör det igen! Den senaste proteinbaren från Barebells möts i en harmoni av len mjölkchoklad, krispiga hasselnötter och krämig nougat. En kombination som inte mycket annat kan slå. Barebells bars är kända över hela riket och stimulerar både kropp och knopp. Med ett proteininnehåll på 20 g, vilket motsvarar 36% så är den en proteinbomb utan dess like som ger dig maximal utdelning. Kaloriinnehållet per bar är 196 kcal och den innehåller 12 gram fett. Se till att köpa in den stora nyheten i sortimentet hos gym, kiosker, caféer, föreningar och andra medvetna verksamheter.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 12x55g",
      "VÅRT ART. NR.60874",
      "LEV. ART. NR.B1027",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 300 st"
    ],
    productAttributes: [
      "Protein Bar med 20 g protein",
      "Hazelnut & Nougat",
      "196 kcal, 12 gram fett",
      "Säljes i 12-pack där varje bar väger 55 gram.",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922020/se_no_fi_dk_bb_proteinbar_hazelnut-nougat_540x_rrirmc.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Cashewnötter",
    vendor: "Nutisal",
    description: [
      "Nutisals cashewnötter är torrostade och lättsaltade. Förpackade i praktiska 60 g påsar.",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Nutisal",
      "FÖRSÄLJNINGSENHET 14x60g",
      "VÅRT ART. NR.122627",
      "LEV. ART. NR.1004986",
      "ANTAL ST PER KRT 14 st",
      "ANTAL KRT PER PALL 161 st"
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922099/1004986_cashews_60g_540x_sipxrx.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Tarragona dubbel stycksak",
    vendor: "Cloetta",
    description: [
      "Tarragona från Cloetta, för kiosk, butik och evenemang. Perfekt för choklad- och nötälskaren. Tarragona är en mjölkchoklad med spröda och rostade hasselnötter.",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 35x50g",
      "VÅRT ART. NR.54094",
      "LEV. ART. NR.1001277",
      "ANTAL ST PER KRT 35 st",
      "ANTAL KRT PER PALL 240 st"
    ],
    productAttributes: [
      "Mjölkchoklad med hasselnötter",
      "För kiosk, butik och evenemang",
      "Förpackning om 35x50g",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922177/796_07310040013438_a1c1_tarragona_540x_gldtg8.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Björnar Klubbmix, Automat",
    vendor: "Cloetta",
    description: [
      "Björnars klubbmix från Cloetta är en härlig blandning av klubbor och består av smakerna skogshallon, ananas, smultron, päron och jordgubbe. Levereras i en praktisk holk som innehåller 180 st klubbor. Innehåller enbart naturliga färger och smaker.",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 1x180st",
      "VÅRT ART. NR.122638",
      "LEV. ART. NR.1001446",
      "ANTAL ST PER KRT 1 st",
      "ANTAL KRT PER PALL 128 st"
    ],
    productAttributes: [
      "Innehållsförteckning: socker, glukossirap, surhetsreglerandemedel (citronsyra), färgämnen (E171, E120, E141, E153, E160a), arom."
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922268/1001446_bjornarklubbmix_540x_q0bv1s.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Sportlunch kaka",
    vendor: "Cloetta",
    description: [
      "Sportlunchen är inte bara glädje och energi. Den är en kombination av ren choklad och wafers i bitar som är enkla att bryta. Sportlunchen lanserades egentligen redan 1036. Då hette den \"Mellanmål\". Det var inte förrän 1996 som namnet Sportlunch lanserades på marknaden.",
      "Ingredienser: Socker, kakaosmör, skummjölkspulver, helmjölkspulver, vetemjöl, vegetabiliska fetter/oljor (palm*, shea, kokos), kakaomassa, vasslepulver (mjölk), fettreducerat kakaopulver, emulgeringsmedel (sojalecitin), salt, aromer (bl.a. vanillin), bakpulver (natriumvätekarbonat). Mjölkchokladen innehåller förutom kakaosmör även annat vegetabiliskt fett och minst 25 % kakao.",
      "Näringsvärde: Basmängdeklaration: 100 Gram, Energi 2196 kJ, Energi 522 kcal, Fett 28 g, varav mättat fett 18 g, Kolhydrat 58 g, varav sockerarter 49 g, Protein 9.20 g, Salt 0.33 g"
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 28x80g",
      "VÅRT ART. NR.50059",
      "LEV. ART. NR.1001161",
      "ANTAL ST PER KRT 1 st",
      "ANTAL KRT PER PALL 187 st"
    ],
    productAttributes: [
      "Ren choklad och kex i brytbara bitar",
      "Perfekt som mellanmål",
      "Energi efter gymm"
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922454/sportlunch_liten_540x_xpuyua.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Sportlunch dubbel",
    vendor: "Cloetta",
    description: [
      "Delad glädje är dubbel glädje! För i en Sportlunch dubbel ligger det två bitar av den goda chokladkakan på 25 gram vardera, vilket gör det enkelt att antingen dela med sig eller dela upp sitt mellanmål. De två bitarna är gjorda av samma härliga kombination, av ren choklad och wafers, som de större varianterna. Sportlunchen lanserades egentligen redan 1936. Då hette den \"Mellanmål\". Det var inte förrän 1996 som namnet Sportlunch lanserades på marknaden.",
      "Ingredienser: Socker, kakaosmör, skummjölkspulver, helmjölkspulver, vetemjöl, vegetabiliska fetter/oljor (palm*, shea, kokos), kakaomassa, vasslepulver (mjölk), fettreducerat kakaopulver, emulgeringsmedel (sojalecitin), salt, aromer (bl.a. vanillin), bakpulver (natriumvätekarbonat). Mjölkchokladen innehåller förutom kakaosmör även annat vegetabiliskt fett och minst 25 % kakao.",
      "Näringsvärde: Basmängdeklaration: 100 Gram, Energi 2196 kJ, Energi 522 kcal, Fett 28 g, varav mättat fett 18 g, Kolhydrat 58 g, varav sockerarter 49 g, Protein 9.20 g, Salt 0.33 g",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 30x50g",
      "VÅRT ART. NR. 50293",
      "LEV. ART. NR. 1001162",
      "ANTAL ST PER KRT 1 st",
      "ANTAL KRT PER PALL 240 st"
    ],
    productAttributes: [
      "Allergiinfo: Innehåller: Mjölk, sojabönor, vete, hasselnöt",
      "Ren choklad och kex i brytbara bitar",
      "Perfekt som mellanmål",
      "Energi efter gymmet",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922606/1001162_sportlunch_dubbel_50g_540x_pfsic6.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Polly Original",
    vendor: "Cloetta",
    description: [
      "Ljusa och mörka chokladkulor i en påse. Det är vad alla känner som Polly Blå. De ljusa chokladkulorna i Polly Original har två smaker: smörkola och arrack. De mörka kulorna smakar vanilj.",
      "Innehållsförteckning: Socker, vegetabiliska fetter/oljor (palm*, shea, kokos), invertsockersirap, glukos-fruktossirap, kakaomassa, helmjölkspulver, vasslepulver (mjölk), gelatin, emulgeringsmedel (sojalecitin, E476), stärkelse, aromer (bl.a. vanillin), förtjockningsmedel (pektin), ytbehandlingsmedel (shellack), surhetsreglerande medel (citronsyra).",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 20x130g",
      "VÅRT ART. NR. 50071",
      "LEV. ART. NR. 1001328",
      "ANTAL ST PER KRT 1 st",
      "ANTAL KRT PER PALL 50 st"
    ],
    productAttributes: [
      "Polly Blå/Original är en klassiker i varje hem",
      "En förpackning innehåller 20 st. 130 grams påsar",
      "Blandning av ljusa och mörka Polly vilka har olika smaker"
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922698/1001328_polly_130g_540x_bjzumq.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Plopp dubbel stycksak",
    vendor: "Cloetta",
    description: [
      "Plopp från Cloetta, för kiosk, butik och förening. Plopp lanserade 1949 och har varit en storfavorit hos många sedan dess. Vilket inte är konstigt med tanke på Plopps innhåll med en ljuvlig toffefyllning och god mjölkchoklad. Unna dig själv lite vardagslyx med en kopp kaffe och en plopp för att sätta pricken över i:et. Många tror inte att det är någon skillnad på Plopp och Center men faktum är att smaken skiljer sig avsevärt. Testa dig själv, genom med förbunda ögon så märker du garanterat skillanden. ",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 35x50g",
      "VÅRT ART. NR. 50685",
      "LEV. ART. NR. 1001294",
      "ANTAL ST PER KRT 35 st",
      "ANTAL KRT PER PALL 240 st"
    ],
    productAttributes: [
      "Plopp från Cloetta, för kisok, butik och förening",
      "Lyxa till vardagen med en Plopp med ljuvlig toffefyllning och god mjölkchoklad",
      "Förpackning om 35x50g",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922752/9227_07310040020726_d1n1_plopp_540x_e6fszz.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Kexchoklad Tub",
    vendor: "Cloetta",
    description: [
      "Mindre Kexchoklad från Cloetta i tub. Innehåller totalt 1032 gram. Passar utmärkt som snabbt tilltugg till kaffet eller mindre energikick vid slutet av arbetsdagen.",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 1x1032g",
      "VÅRT ART. NR. 50096",
      "LEV. ART. NR. 1001714",
      "ANTAL ST PER KRT 2 st",
      "ANTAL KRT PER PALL 18 st"
    ],
    productAttributes: [
      "Kexchoklad mini i tub",
      "Passar perfekt som tilltugg till kaffet",
      "Energikick på eftermiddagen",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922827/1001714_kexchoklad_tube_800x800_793bbc61-9b0e-44cc-8d31-a47c0a0eee48_540x_oyrtsm.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Plopp Orginal",
    vendor: "Cloetta",
    description: [
      "Plopp har fyllt våra gommar med ljuvlig toffeefyllning och god mjölkchoklad sedan 1949",
      "Ingredienser: socker, glukossirap, kakaosmör, helmjölkspulver, skummjölkspulver, vegetabiliska fetter (palm*, shea), kakaomassa, emulgeringsmedel (sojalecitin), salt, aromer (bl.a. vanillin). mjölkchokladen innehåller förutom kakaosmör även annat vegetabiliskt fett och minst 25 % kakao.",
      "Näringsvärde: Basmängdeklaration: 100 Gram, Energi 2052 kJ, Energi 486 kcal, Fett 24 g, varav mättatt fett 15 g, Kolhydrat 60 g, varav sockerarter 48 g, Protein 6.8 g, Salt 0.37 g",
      "Allergiinfo: Innehåller: Mjölk och Sojabönor. Kan innehålla spår av hasselnötter",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 28x80g",
      "VÅRT ART. NR. 50997",
      "LEV. ART. NR. 1001291",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 176 st"
    ],
    productAttributes: [

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747922972/plopp-80g-2_540x_te2jk4.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Kexchoklad",
    vendor: "Cloetta",
    description: [
      "Kexchoklad från Cloetta är ett klassiskt mellanmål som de flesta känner igen. Den ljusa mjölkchokladen döljer ett frasigt rån och läcker choklad. Kexchoklad är en unik produkt, älskad av alla och uppskattad på alla tänkbara platser. Den rutiga klassikern är svenska konfektyrmarknadens enskilt största produkt.",
      "Redan 1921 kom de chokladöverdragna rånet ut på marknaden, då under namnet \"Fixe o' clock kex-choklad\". Sedan dess har produkten bytt både förpackning och utseende men den goda smaken är densamma. Från första början har Kexchoklad marknadsförts som en ute-produkt och det perfekta mellanmålet. Under 90-talet kom den välkända payoffen \"Go' och glad Kexchoklad\" och strax därefter stod hela det Svenska Alpina Skidlandslaget i gul rutiga dräkter inför vintersäsongen 1999.",
      "Cloetta Kexchoklad är UTZ-certifierad. Det innebär att den uppfyller ett antal sociala och miljöbetingade kriterier.  Försäljning av kexchoklad är stor på caféer runt om i landet. Hos föreningar och föreningskiosker är kexchokladen en självklarhet i hyllan.",
      "Innehållsförteckning: socker, vetemjöl, vegetabiliska fetter/oljor (palm*, shea, kokos), skummjölkspulver, vasslepulver (mjölk), kakaosmör, helmjölkspulver, kakaomassa, fettreducerat kakaopulver, emulgeringsmedel (sojalecitin), salt, bakpulver (natriumvätekarbonat), aromer (bl.a. vanillin). Mjölkchokladen innehåller förutom kakaosmör även annat vegetabiliskt fett och minst 25 % kakao.",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 48x60g",
      "VÅRT ART. NR. 122640",
      "LEV. ART. NR. 1003086",
      "ANTAL ST PER KRT 48 st",
      "ANTAL KRT PER PALL 110 st"
    ],
    productAttributes: [

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747923070/1003086_kexchoklad_displaybox_540x_slhjbj.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Snacks",
  },
  {
    name: "Chokladmix i holk",
    vendor: "Cloetta",
    description: [
      "Denna praktiska automat från Cloetta är fullproppad med godsaker i små förpackningar. Färdig att ställa fram vid disken för enkel försäljning. Varje automat innehåller följande produkter: 70 st Center, 70 st Plopp, 64 st Kexchoklad och 60 st Sportlunch.",
    ],
    productSpecifications: [
      "LEVERANTÖR Cloetta Sverige AB",
      "VARUMÄRKE Cloetta",
      "FÖRSÄLJNINGSENHET 300x25g",
      "VÅRT ART. NR. 122660",
      "LEV. ART. NR. 1008312",
      "ANTAL ST PER KRT 1 st",
      "ANTAL KRT PER PALL 40 st"
    ],
    productAttributes: [
      "Förpackning: 1 stor automat med 300 stycksaker"
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747923227/1002226_22660_enkla_stycksaker_1-2_540x_k6vfsa.webp",
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
  {
    name: "Ramlösa Original",
    vendor: "Ramlösa",
    description: [
      "Sedan 1707 har Ramlösa mineralvatten släckt törsten för oss svenskar runt om i landet. Det är ett naturligt mineralvatten som fått sin mineral- och saltton direkt från naturen i Ramlösa hälsobrunn.",
      "För varje liter Ramlösa du köper, skänker Ramlösa Vattenfond en liter rent vatten till Röda Korsets utvecklingsprojekt i Afrika.",
    ],
    productSpecifications: ["LEVERANTÖR Carlsberg Sverige AB",
      "VARUMÄRKE Ramlösa",
      "FÖRSÄLJNINGSENHET 24x33cl",
      "VÅRT ART. NR. 50666",
      "LEV. ART. NR. 22068",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 81 st"
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747923490/22068_ramlosa_original_33cl_burk_540x_opvp4f.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Ramlösa Granatäpple",
    vendor: "Ramlösa",
    description: [
      "Ramlösa Granatäpple är ett naturligt smaksatt mineralvatten, med samma salt- och mineralton som övriga mineralvatten från Ramlösa.",
      "För varje liter Ramlösa du köper, skänker Ramlösa Vattenfond en liter rent vatten till Röda Korsets utvecklingsprojekt i Afrika.",
    ],
    productSpecifications: ["LEVERANTÖR Carlsberg Sverige AB",
      "VARUMÄRKE Ramlösa",
      "FÖRSÄLJNINGSENHET 24x33cl",
      "VÅRT ART. NR.50668",
      "LEV. ART. NR.22066",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 81 st",
    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747923599/22066_ramlosa_granatapple_33cl_burk_540x_ibnzbt.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Ramlösa Citrus",
    vendor: "",
    description: [
      "Ramlösa Citrus innehåller mineralvatten, från källan i Ramlösa, kolsyra och naturliga smakämnen. Inget mer, inget mindre. Har en härligt uppfriskande smak av lime och citron. Inte en enda kalori så långt ögat kan nå.",
      "För varje liter Ramlösa du köper, skänker Ramlösa Vattenfond en liter rent vatten till Röda Korsets utvecklingsprojekt i Afrika",
    ],
    productSpecifications: ["LEVERANTÖR Carlsberg Sverige AB",
      "VARUMÄRKE Ramlösa",
      "FÖRSÄLJNINGSENHET 24x33cl",
      "VÅRT ART. NR.50667",
      "LEV. ART. NR.22062",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 81 st",

    ],
    productAttributes: [
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747923725/22062_ramlosa_citrus_33cl_burk_540x_sbwzzx.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Pepsi Regular",
    vendor: "Pepsi",
    description: [
      "Pepsi är en berömd och läskande god dryck med colasmak. Pepsi-cola, som oftast endast kallas Pepsi, är en världsberömd läskedryck som finns i mångas vardagliga rutin. Under smakkategorin cola, ingår Pepsi som ett starkt varumärke och är den näst största leverantören av den svalkande goda drycken. Colasegmentet står för över 50% av en totala läskkonsumtionen i världen. Det är vad vi kallar ett måste på hyllan. Pepsi är perfekt att ha i sortimentet för café, restaurang, hotell, kiosk eller krok.",
    ],
    productSpecifications: [
      "LEVERANTÖR Carlsberg Sverige AB",
      "VARUMÄRKE Pepsi",
      "FÖRSÄLJNINGSENHET 24x33cl",
      "VÅRT ART. NR.50673",
      "LEV. ART. NR.22054",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 81 st",
    ],
    productAttributes: ["Pepsi i 33-cl burk",
      "Stor leverantör av den världsberömda smaken",
      "Perfekt att ha i sortimentet för café, restaurang, hotell, kiosk eller krok",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924383/22054_pepsi_regular_33cl_burk_540x_qquabg.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Pepsi Max",
    vendor: "Pepsi",
    description: [
      "Pepsi Max är, precis som vanliga Pepsi, en kolsyrad läskedryck med colasmak. Här har vi den däremot i en variant utan kalorier. Berömda varumärket Pepsi är den näst sörsta leverantören av läskedrycker med colasmak och är ett perfekt alternativ för caféer, restauranger, hotell, krogar och kiosker. Ett måste på hyllan helt enkelt. Pepsi Max har samma goda smak som Pepsi, och är därför en favorit hos de som vill ha ett light-alternativ.",
    ],
    productSpecifications: [
      "LEVERANTÖR Carlsberg Sverige AB",
      "VARUMÄRKE Pepsi",
      "FÖRSÄLJNINGSENHET 24x33cl",
      "VÅRT ART. NR.50674",
      "LEV. ART. NR.22052",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 81 st",
    ],
    productAttributes: ["Pepsi Max i 33 cl-burk",
      "Läskedryck med colasmak utan kalorier",
      "Perfekt alternativ för caféer, restauranger, hotell, krogar och kiosker",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924444/22052_pepsi_max_33cl_burk_540x_i2zvph.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Trocadero Zero",
    vendor: "Trocadero",
    description: [
      "Trocadero Zero på burk för restaurang, café och hotell. Trocadero Zero är en sockerfri läsk med koffein som smakar äpple och apelsin. Den lanserades första gången 1953 och har sedan dess blivit ofantligt populär över hela Sverige och specifikt i Norrland, där den har till och med kallats för nationaldryck. Trocadero är en frisk och fruktig läsk, lika god till lunchen som till fikabrödet. Säljes i 24x33 cl och serveras som bäst riktigt kall.",
    ],
    productSpecifications: [
      "LEVERANTÖR Spendrups Bryggeriaktiebolag",
      "VARUMÄRKE Trocadero",
      "FÖRSÄLJNINGSENHET 24x33cl",
      "VÅRT ART. NR.53907",
      "LEV. ART. NR.1336721",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 81 st",
    ],
    productAttributes: ["Trocadero Zero i 33 cl-burk",
      "Sockerfri läsk för restaurang och café",
      "Fruktig smak av äpple och apelsin",
      "Innehåller koffein",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924505/trocadero_zero_sugar_33cl_burk_540x_jlxwyk.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Red Bull Sugarfree",
    vendor: "Red Bull",
    description: [
      "Sockerfri energidryck med välkänd smak från Red Bull. Det här är den klassiska funktionsdrycken Red Bull, utan socker. Drycken ger energi genom sina aktiva ingredienser av koffein, taurin, B-vitaminer, Aspartam/Acesulfam K och naturligt alpvatten. Drycken är populär för den som vill få extra bränsle inför en mental eller fysisk ansträngning, så som i plugget, på jobbet eller inför ett träningspass. Red Bull är även en självklarhet på krogen. Energidrycken är därför en mycket attraktiv produkt för såväl restaurang- , krog- och caféverksamheter.",
    ],
    productSpecifications: [
      "LEVERANTÖR Red Bull Sweden AB",
      "VARUMÄRKE Red Bull",
      "FÖRSÄLJNINGSENHET 24x250ml",
      "VÅRT ART. NR.51881",
      "LEV. ART. NR.36195",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 96 st",
    ],
    productAttributes: ["Välkänd energidryck från Red Bull",
      "Sockerfri",
      "Populär produkt för restauranger, krogar och caféer",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924578/red_bull_sockerfri_energidryck_250mlx24_540x_eto0nh.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Proteinmilkshake Fudge",
    vendor: "Barebells",
    description: [
      "Jul-bästsäljaren är här för att stanna! Den var helt enkelt för god, Barebells Fudge Milkshake blir permanent i sortimentet. Med sin sagolika smak av mjuk chokladkola får vi en milkshake med en konsistens som är som sammet för halsen. Detta är den 5e smaken i milkshake-familjen från Barebells och precis som alltid är det bara att \"shake it to wake it\" och sen avnjuta den. Dricks med fördel efter ett träningspass då varje flaska innehåller hela 24 gram protein samtidigt som den mättar trivsamt. Den är dessutom helt laktosfri och utan tillsatt socker vilket gör den till det goda men nyttiga mellanmålet.",
      "Varje flaska innehåller 330 ml och de säljes i 8-pack. Ett givet val för gym, föreningar och caféer."
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 8x330ml",
      "VÅRT ART. NR.60359",
      "LEV. ART. NR.B3004",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 162 st",
    ],
    productAttributes: ["Proteinmilkshake - Fudge",
      "24 gram protein",
      "Laktosfri och utan tillsatt socker",
      "RTD (Ready To Drink)",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924694/barebells_milkshake_fudge_2_0_540x_orn2dj.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Proteinmilkshake Pear/White Chocolate",
    vendor: "Barebells",
    description: [
      "Barebells Milkshake med smak av päron och vit choklad för gym, föreningar och kiosker. Barebells produkter är proteinberikade och en sån här liten rackare innehåller hela 24 gram protein. Den här milkshaken smakar solmogna päron och söt vit choklad, trots sin söta smak har den ändå inget socker i sig. Kyll den, skaka den, drick den- mer behöver du inte göra. En förpackning innhåller 8 flaskor fyllda med 330 ml god milkshake. ",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 8x330ml",
      "VÅRT ART. NR.53447",
      "LEV. ART. NR.B3007",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 162 st",
    ],
    productAttributes: ["Barebells Milkshake Pear/ White Chocolate",
      "24 gram protein, fri från laktos och socker",
      "Perfekt för gym och kiosker",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924764/barebells_milkshake_creamy_pear_540x_r2xvgo.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Proteinmilkshake Strawberry",
    vendor: "Barebells",
    description: [
      "En proteinmilkshake för dig som vill att träningen ska ge resultat men inte har tid att äta mat!",
      "Krämig och fyllig proteinmilkshake med jordgubbssmak från Barebells.",
      "RTD vilket innebär att det bara är att öppna och börja dricka (Tips \"Shake it to wake it\"). Trots sitt rika näringsinnehåll är den precis lika lockande som en vanlig milkshake. Den är dessutom laktosfri och utan tillsatt socker. Finns i 3 klassiska smaker, choklad, banan och jordgubb och varje flaska innehåller 24 gram protein vilket gör den perfekt i samband med träning när man vill unna sig ett gott men ändå nyttigt mellanmål ",
      "Varje flaska innehåller 330 ml och de säljes i 8-pack. Ett givet val för gym, föreningar och caféer.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 8x330ml",
      "VÅRT ART. NR.51152",
      "LEV. ART. NR.B3001",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 162 st",
    ],
    productAttributes: ["Proteinmilkshake - jordgubbssmak",
      "24 gram protein",
      "Krämig och god",
      "Laktosfri och utan tillsatt socker",
      "RTD (Ready To Drink)",
      "3 olika smaker",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924865/se_barebells_milkshake_strawberry_540x_b6vhmk.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Bonaqua, Naturell",
    vendor: "Bonaqua",
    description: [
      "Bonaqua Naturell, är ett svenskt mineralvatten, här tappat i klassisk 33-cl burk. Hanveden i Södermanland har sedan en lång tid tillbaka försett landet med sitt välkända kolsyrade vatten. Bonaqua Naturell är lätt kolsyrat och ett solklart val för sortimentsuppdateringen. Som handen i handsken för caféer, restauranger, krogar och hotell.",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Bonaqua",
      "FÖRSÄLJNINGSENHET 20x33cl",
      "VÅRT ART. NR.61634",
      "LEV. ART. NR.1213",
      "ANTAL ST PER KRT 20 st",
      "ANTAL KRT PER PALL 104 st",
    ],
    productAttributes: ["Bonaqua Naturell i 33 cl-burk",
      "Lätt kolsyrat källvatten från Södermanland",
      "Drycken för alla lägen hos caféer, restauranger, krogar och hotell",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924934/bonaqua_naturell_540x_rgsjt2.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Bonaqua Citron/Lime",
    vendor: "Bonaqua",
    description: [
      "Populära Bonaqua, med smak av frisk lime och citron, på 33-cl burk. Från vackra Södermanland kommer det välkända mineralvattnet som törstar många strupar. Ett kolsyrat vatten för alla lägen, samt en självklar dryck att erbjuda hos caféer, restauranger, hotell och krogar. Ett måste i sortimentet helt enkelt.",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Bonaqua",
      "FÖRSÄLJNINGSENHET 20x33cl",
      "VÅRT ART. NR.60859",
      "LEV. ART. NR.1413",
      "ANTAL ST PER KRT 20 st",
      "ANTAL KRT PER PALL 104 st",
    ],
    productAttributes: ["Bonaqua Citron/Lime i 33 cl-burk",
      "Lätt kolsyrat källvatten med av citron och lime",
      "Drycken för alla lägen hos caféer, restauranger, krogar och hotell",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747924994/90041289_px500_540x_oyufce.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Sprite, Original",
    vendor: "Sprite",
    description: [
      "Sprite Orginal är en läskedryck med smak av färsk citron och lime, här tappad på snygga glasflaskor. Här har vi en riktig klassiker som fungerar i alla lägen. Sprite föddes i Coca-Cola familjen och har sedan många år tillbaka förgyllt törstiga strupar. Det här är dycken som alltid är en bra idé att ha i sortimetet för café, restaurang, krog och hotell!",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Sprite",
      "FÖRSÄLJNINGSENHET 20x33cl",
      "VÅRT ART. NR.61633",
      "LEV. ART. NR.4513",
      "ANTAL ST PER KRT 20 st",
      "ANTAL KRT PER PALL 104 st",
    ],
    productAttributes: ["Sprite Orginal i 33 cl-glasflaska",
      "Läskedryck med smak av citron och lime",
      "Bra idé för alla lägen",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925047/sleek_can_sprite_540x_nqlofh.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Fanta, Lemon",
    vendor: "Fanta",
    description: [
      "Fanta Lemon i 33cl-burk med smak av uppfriskande citroner. Fanta är en av världens populäraste läskedrycker och har sedan 1940 uppskattats med sina fruktiga smaker. Läsken är en storfavorit och gör sig som bäst på en varm sommardag med sina törstsläckande krafter. Utmärkt att ha i sortimentet på café, restaurang, kiosk eller hotell.",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Fanta",
      "FÖRSÄLJNINGSENHET 20x33cl",
      "VÅRT ART. NR.61236",
      "LEV. ART. NR.3212",
      "ANTAL ST PER KRT 20 st",
      "ANTAL KRT PER PALL 104 st",
    ],
    productAttributes: ["Fanta Lemon, 33cl-burk",
      "Fräsch och god citron smak",
      "Säljs i storpackför restaurang, café och kiosk",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925107/sleek_can_fanta_lemon_540x_s9kolx.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Fanta, Exotic",
    vendor: "Fanta",
    description: [
      "Fanta Exotic är en kolsyrad läskedryck med tropisk smak. Gänget bakom den här produkten är berömda för deras fruktiga Fanta-drycker i olika smakkombinationer. Orginalet har smak av saftiga apelsiner medan den här varianten, Fanta Exotic, får stående applåder med dess tropiska smaker. Fanta har varit med i bilden sedan 1940 och är mästare på läsk helt enkelt. Ett säkert kort att ha i sortimentet för café, restaurang, hotell, kiosk och krog.",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Fanta",
      "FÖRSÄLJNINGSENHET 20x33cl",
      "VÅRT ART. NR.61632",
      "LEV. ART. NR.3413",
      "ANTAL ST PER KRT 20 st",
      "ANTAL KRT PER PALL 104 st",
    ],
    productAttributes: ["Fanta Exotic i 33 cl-burk",
      "Finns även i orginalet, Fanta Orange",
      "Ett säkert kort för café, restaurang, hotell, kiosk och krog",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925165/sleek_can_fanta_exotic_540x_cusyic.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Fanta, Orange",
    vendor: "Fanta",
    description: [
      "Välkända och uppskattade Fanta Orange i 33 cl-burk. Kusinen till Cola, presenteras som Fanta Orange och har tagit världen med stor storm. Läsken är högt älskad av alla åldrar världen över och introducerades redan år 1940. Fanta finns idag i ett gäng smak-kombinationer men här presenteras orginalet med smak av saftiga apelsiner. Ett måste att ha i sortimentet för café, restaurang, hotell och krogar.",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Fanta",
      "FÖRSÄLJNINGSENHET 20x33cl",
      "VÅRT ART. NR.61631",
      "LEV. ART. NR.3013",
      "ANTAL ST PER KRT 20 st",
      "ANTAL KRT PER PALL 104 st",
    ],
    productAttributes: ["Fanta Orange",
      "33-cl",
      "Ett självklart val för café, restaurang, hotell och krog",
      "Produktspecifikation",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925218/60432_fanta_sleek_540x_xsgfmt.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Coca Cola Zero",
    vendor: "Coca Cola",
    description: [
      "Coca-Cola Zero är klassikern i en socker- och kalorifri kostym. Det världsberömda varumärket och namnet bakom en helt egen smak-kategori, presenteras som Coca-Cola. Den här varianten är helt utan tillsatt socker och är världens största sockerfria läskedryck. Det här är drycken att erbjuda i alla lägen, på alla platser. Se hit - caféer, restauranger, krogar, hotell och kiosker!",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Coca Cola",
      "FÖRSÄLJNINGSENHET 20x33cl",
      "VÅRT ART. NR.61630",
      "LEV. ART. NR.2838",
      "ANTAL ST PER KRT 20 st",
      "ANTAL KRT PER PALL 104 st",
    ],
    productAttributes: ["Coca-Cola Zero i 33 cl burk",
      "Socker- och kalorifri",
      "Perfekt för sortimentet hos caféer, restauranger, krogar, hotell och kiosker",
      "Produktspecifikation",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925283/sleek_can_coca_cola_zero_540x_pqq0rv.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Coca Cola Original",
    vendor: "Coca Cola",
    description: [
      "Världsberömda klassikern Coca-Cola i 33 cl-burk. Varumärket som står sig strarkt efter flera decennier, skapat en helt egen smak-kategori, och förädlar smaklökar var dag, är ingen mindre än Coca-Cola. The Coca Cola Company grundades redan år 1886 i USA, var den idag är något av en nationaldryck. Globalt sett är Coca-Cola en av världens absolut mest populära drycker, och det hemliga receptet har vi nu kommit lite närmare med Coca-Cola i lager. Ett måste i sortimentet för varje café, restaurang, hotell och kiosk.",
      "Psst! Varje år tillverkas cirka 350 miljoner liter Coca-Cola, enbart för den svenska marknaden.",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Coca Cola",
      "FÖRSÄLJNINGSENHET 20x33cl",
      "VÅRT ART. NR.61629",
      "LEV. ART. NR.2064",
      "ANTAL ST PER KRT 20 st",
      "ANTAL KRT PER PALL 104 st",
    ],
    productAttributes: ["Coca-Cola 33 cl",
      "Världsberömda klassikern",
      "Ett måste i sortimentet för café, restaurang, hotell och kiosk",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925343/sleek_can_coca_cola_original_540x_nojkj5.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "DEFENCE",
    vendor: "Vitamin Well",
    description: [
      "Vitamin Well Defence med smak av Citrus/Fläder. Vitamin Well-serien består av 8 olika dryckar, alla med en egen smak och med en unik funktion och uppsättning vitaminer och mineraler. Defence = Försvar och det är just försvaret som är denna drycks stora styrka. En benhård backlinje bestående av Vitamin C, D, B12 och zink kommer inte ens en Vitamin Well-drickande Zlatan lyckas luckra upp. Lägg därtill två spjutspetsar i form av extrakt från fläderbär och grönt te så förstår ni vilken stark uppställning som Vitamin Well Defence ställer på benen.",
      "Varje flaska innehåller 500 ml och de säljes i 12-pack. För caféer, gym och föreningar är Vitamin Well-produkterna ett måste.",
    ],
    productSpecifications: [
      "Produktspecifikation",
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Vitamin Well",
      "FÖRSÄLJNINGSENHET 12x500ml",
      "VÅRT ART. NR.51094",
      "LEV. ART. NR.1000",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 90 st",
    ],
    productAttributes: ["CITRUS/FLÄDER",
      "VITAMIN C+D",
      "ZINK",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925428/vitamin_well_defence_540x_fkrvbf.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "UPGRADE",
    vendor: "Vitamin Well",
    description: [
      "Vitamin Well Upgrade med smak av citron/kaktus. Denna törstsläckande och goda dryck är utan kolsyra och ett nyttigt alternativ till juice och läsk. Vitamin Well-serien består av 8 olika drycker, alla med en egen smak och med en unik funktion och uppsättning vitaminer och mineraler. Upgrade sticker ut genom sitt höga innehåll av Vitamnin B6 och B12 vilka gör dig piggare och minskar risken för utmattning. Vid sidan av det är Upgrade berikad med mycket magnesium och Vitamin D vilka gör att dina muskler mår bra. Denna dryck går hand i hand med en sund och hälsosam livsstil.",
      "Varje flaska innehåller 500 ml och de säljes i 12-pack. För caféer, gym och föreningar är Vitamin Well-produkterna ett måste.",

    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Vitamin Well",
      "FÖRSÄLJNINGSENHET 12x500ml",
      "VÅRT ART. NR.51101",
      "LEV. ART. NR.1100",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 90 st",
    ],
    productAttributes: ["CITRON/KAKTUS",
      "VITAMIN B6+B12+D",
      "MAGNESIUM+ZINK",

    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925505/vitamin_well_upgrade_citron_kaktus_540x_nkzemq.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "RELOAD",
    vendor: "Vitamin Well",
    description: [
      "Vitamin Well Reload med smak av citron/lime. Vitamin Well-serien består av 8 olika drycker, alla med en egen och ofta innovativ smak och med en unik funktion och uppsättning vitaminer och mineraler. Som namnet avslöjar hjälper denna dryck dig att ladda om batterierna. Den innehåller den viktiga mineralen magnesium som bland annat motverkar kramp och som av många kallas för kroppens viktigaste mineral då den är grunden för att nerver och muskler ska fungera effektivt. Vitamin Well Reload innehåller dessutom Biotin, B12 och Vitamin D som alla gör din kropp glad och välmående.",
      "Varje flaska innehåller 500 ml och de säljes i 12-pack. För caféer, gym och föreningar är Vitamin Well-produkterna ett måste.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Vitamin Well",
      "FÖRSÄLJNINGSENHET 12x500ml",
      "VÅRT ART. NR.51097",
      "LEV. ART. NR.1050",
      "ANTAL ST PER KRT 12 st",
      "ANTAL KRT PER PALL 90 st",
    ],
    productAttributes: ["CITRON/LIME",
      "VITAMIN B12 +D",
      "MAGNESIUM+ZINK",
      "BIOTIN",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925572/vitamin_well_reload_540x_f9wkgb.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Legend Soda Focus 4",
    vendor: "NOCCO",
    description: [
      "Här kommer ytterligare en smak från Nocco - NOCCO Focus 4 Legend Soda! Nocco producerar funktionsdrycker och serien Fokus är gjord för att öka den mentala fokusen istället för den fysiska. Drycken innehåller alltså ingen BCAA (aminosyra) som många av deras andra drycker utan denna är istället fylld med 180mg koffein och sex olika vitaminer. Detta gör att denna drycken lämpar sig otroligt bra till e-sport eller tillfällen där du behöver förbättra koncentration och energi. Drycken är kolsyrad och sockerfri och passar utmärkt i sortimentet på café, gym, kiosk, föreningar och andra aktiva verksamheter.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE NOCCO",
      "FÖRSÄLJNINGSENHET 24x33cl",
      "VÅRT ART. NR.62730",
      "LEV. ART. NR.6330",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 70 st",
    ],
    productAttributes: ["NOCCO Focus 4 Legend Soda",
      "När du behöver ha huvudet på skaft!",
      "Sockerfri, kolsyrad och vitaminberikad",
      "Säljes i pack om 24x33cl",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925644/se_nocco_legendsoda_2_0_540x_wh844e.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Raspberry Blast Focus 3",
    vendor: "NOCCO",
    description: [
      "NOCCO Focus 3 Raspberry Blast är ännu en smakuppdatering från det omåttligt populära märket NOCCO! Till skillnad från NOCCOs övriga sortiment har dryckerna med namnet FOCUS lagt sin vikt vid den mentala prestationen, istället för den fysiska. För att ge en extra kick åt prestationsförmåga och att minska trötthet innehåller denna drycken 180mg koffein, vilket motsvarar ungefär 2 koppar kaffe(!). Den läskande hallondrycken är såklart även utan tillsatt socker och passar perfekt hos föreningar, aktiva verksamheter och framförallt skolcaféer när det behövs en boost med energi.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE NOCCO",
      "FÖRSÄLJNINGSENHET 24x330ml",
      "VÅRT ART. NR.62034",
      "LEV. ART. NR.6300",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 70 st",
    ],
    productAttributes: ["Fokus på mental prestation",
      "Innehåller 180mg koffein",
      "Kolsyrad",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925702/nocco_raspberry_focus_2.0_540x_zsvtdm.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Caribbean BCAA",
    vendor: "NOCCO",
    description: [
      "NOCCO BCAA Caribbean är en oerhört god funktions- och träningsdryck.BCAA är ett samlingsnanmn för de tre aminosyror som har allra störst positiv inverkan på våra muskler. De hjälper till att maximera resultatat av träning genom att stimulera tillväxt samtidigt som de motverkar nedbrytning. Denna Caribbean-edition är en nyhet och har snabbt blivit en bästsäljare. Den för tankarna mot varmare breddgrader och NOCCO:s produkter används idag av i princip hela Fitness-Sverige och hjälper till att släcka törsten både före och efter träning. De är också omåttligt populära inom studievärlden som hjälpmedel för att hålla koncentrationen under en lång tid.",
      "Säljes i snygga burkar på 330 ml i flak med 24 burkar i varje. Ett måste för alla gym, föreningar och andra aktiva verksamheter.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE NOCCO",
      "FÖRSÄLJNINGSENHET 24x330ml",
      "VÅRT ART. NR.51123",
      "LEV. ART. NR.6160",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 70 st",
    ],
    productAttributes: ["Funktions- och träningsdryck",
      "Kolsyrad och sockerfri",
      "Stimulerar tillväxt och motverkar nedbrytning",
      "Innehåller BCAA",
      "Koffein",
      "6 olika vitaminer",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925759/nocco_caribbean_1_540x_ognoso.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Miami BCAA",
    vendor: "NOCCO",
    description: [
      "NOCCO Miami med smak av jordgubbe för gym, café och kiosker. Om inte denna dryck gör er törstig vet vi inte vad! Med smak av jordgubb har denna nyhet all potential att bli sommarens stora bästsäljare. NOCCO Miami innehåller BCAA, grönt-te extrakt, koffein och sex olika vitaminer, vilket kan ha en uppiggande effekt. Drycken är dessutom fri från socker. Inspirationen kommer givetvis från den färgstarka, soldränkta och svängiga stan Miami, vill du känna stadens puls på avstånd så prova NOCCO Miami. ",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE NOCCO",
      "FÖRSÄLJNINGSENHET 24x330ml",
      "VÅRT ART. NR.53444",
      "LEV. ART. NR.6260",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 70 st",
    ],
    productAttributes: ["Summer Edition - 2019",
      "Miami - jordgubb",
      "Säljes 24x330 ml",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925822/nocco-miami_540x_z9bilv.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Limón del Sol BCAA, SUMMER Edition",
    vendor: "NOCCO",
    description: [
      "NOCCOs Summer Edition 2020 är äntligen här! BCAA drycken med smaken Limon del sol är en solklar funktionsdryck att erbjuda hos gym, cáfe och kiosker. De omåttligt populära limited sommarsmakerna fortsätter. Bland NOCCOs tidigare varianter hittar man Tropical, Caribbean, Carnival samt Miami, och efter lång väntan är äntligen Limited Summer Edition 2020 här i form av Limón Del Sol! Limón del Sol har hämtat sin inspiration från den varma medelhavskusten och med uppfriskande smak av citrus, har denna nyhet all potential att blir sommarens bästsäljare. NOCCO Limón del Sol smakar inte bara gott utan är även berikad med BCAA, grönt-te extrakt, koffein och sex olika vitaminer, vilket kan ha en uppiggande effekt. Precis som alla andra drycker från NOCCO är även denna fri från socker. Med hjälp av årets sommarsmak kan du enkelt låta sinnena resa till varmare breddgrader, där randiga parasoll vajar i vinden och vardagen känns lugn och harmonisk. ",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE NOCCO",
      "FÖRSÄLJNINGSENHET 24x330ml",
      "VÅRT ART. NR.62411",
      "LEV. ART. NR.6310",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 70 st",
    ],
    productAttributes: ["NOCCO Summer Edition 2020 med fräscha citrussmaker",
      "För gym, café och kiosker",
      "Inspirerad av medelhavet",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925898/se_nocco_limon_ltd_2_540x_qwt0ws.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Proteinmilkshake Chocolate",
    vendor: "Barebells",
    description: [
      "Proteinmilkshake från Barebells med chokladsmak. Utmärkt i samband med träning när man vill unna sig ett gott men ändå nyttigt mellanmål. Denna krämiga och goda milkshake finns i 3 fylliga smaker och varje flaska innehåller 24 gram protein. Den är precis lika oemotståndlig som en vanlig milkshake och är dessutom laktosfri och utan tillsatt socker. En proteinmilkshake för dig som vill att träningen ska ge resultat men inte har tid att äta mat!",
      "Säljes i 8-pack där varje flaska innehåller 33 cl. Ett givet val för gym, föreningar och caféer.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE Barebells",
      "FÖRSÄLJNINGSENHET 8x330ml",
      "VÅRT ART. NR.51154",
      "LEV. ART. NR.B3000",
      "ANTAL ST PER KRT 8 st",
      "ANTAL KRT PER PALL 162 st",
    ],
    productAttributes: ["Proteinmilkshake - Chokladsmak",
      "Krämig och god",
      "3 olika smaker",
      "24 gram protein",
      "Laktosfri och utan tillsatt socker",
      "RTD (Ready To Drink)",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747925959/se_barebells_milkshake_chocolate_540x_kyxetr.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "ICE Soda BCAA",
    vendor: "NOCCO",
    description: [
      "NOCCO kickar igång säsongen med höstens nyförvärv: NOCCO ICE SODA, med inspiration från ishockeyns actionfyllda värld. Nocco BCAA ICE Soda har en smakkombination av de klassiska smakerna sockerdricka och fruktsoda. Mer nostalgiskt än så blir det väl inte? Nocco Ice Soda innehåller precis som många andra smaker 180 mg koffein samt BCAA(3000 mg) även grönt te-extrakt och sex olika vitaminer. Liksom övriga NOCCO-drycker är den är helt utan socker. Perfekt i samband med fysisk aktivitet eller när du behöver en energiboost.",
    ],
    productSpecifications: [
      "LEVERANTÖR Vitamin Well AB",
      "VARUMÄRKE NOCCO",
      "FÖRSÄLJNINGSENHET 24x330ml",
      "VÅRT ART. NR.61731",
      "LEV. ART. NR.6270",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 70 st",
    ],
    productAttributes: ["Funktions- och träningsdryck",
      "Kolsyrad och sockerfri",
      "180 mg koffein",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747926041/nocco_icesoda_330ml_540x_ylbqeu.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Fanta Orange",
    vendor: "Fanta",
    description: [
      "Välkända Fanta Orange med smak av saftiga apelsiner i 50 cl PET. Vad är bättre än en iskall fanta? Älskad av alla åldrar och kusinen till Cola själv. Redan år 1940 lanserades den berömda apelsinläsken på marknaden‚ och idag finns ett gäng olika smaker. Här finner du orginalet med smak av saftiga apelsiner och varma vindar. Ett måste att ha i sortimentet för café, restaurang, hotell, kiosk och krog.",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Fanta",
      "FÖRSÄLJNINGSENHET 24x50cl",
      "VÅRT ART. NR.60949",
      "LEV. ART. NR.3030",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 54 st",
    ],
    productAttributes: [
      "Ett självklart val för café, restaurang, hotell och krog",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747926142/fanta_orange_pet_540x_ve4kgp.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Coca-Cola Original",
    vendor: "Coca Cola",
    description: [
      "Coca Cola 50 cl PET. Det känns inte som att Coca-Cola behöver någon närmare beskrivning. 98% av världens befolkning känner ju till varumärket. Här kan ni köpa original-smaken i sin smidiga 50-cl flaska. En given produkt för i princip alla törstiga verksamheter vi kan komma på!",
    ],
    productSpecifications: [
      "LEVERANTÖR Coca-Cola European Partners Sverige AB",
      "VARUMÄRKE Coca Cola",
      "FÖRSÄLJNINGSENHET 24x50cl",
      "VÅRT ART. NR.60946",
      "LEV. ART. NR.2030",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 54 st",
    ],
    productAttributes: ["För alla törstiga verksamheter",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747926218/coca_cola_classic_pet_540x_mkbhiq.webp",
    ],
    stock: 10,
    category: "Övrigt",
    subCategory: "Kyld Dryck",
  },
  {
    name: "Red Bull Original",
    vendor: "Red Bull",
    description: [
      "Energidryck med välkänd smak från Red Bull. Det här är funktionsdrycken som ger energi genom sina aktiva ingredienser av koffein, taurin, B-vitamin, sockerbeta och naturligt alpvatten. Drycken är populär för studenter, idrottare och yrkesarbetande, samt för den som vill få extra bränsle inför en annan mental eller fysisk ansträngning. Red Bull är även en självklarhet inom krogbranschen. Energidrycken är därför en mycket attraktiv produkt för såväl restaurang- , krog- och caféverksamheter.",
    ],
    productSpecifications: [
      "LEVERANTÖR Red Bull Sweden AB",
      "VARUMÄRKE Red Bull",
      "FÖRSÄLJNINGSENHET 24x250ml",
      "VÅRT ART. NR.51880",
      "LEV. ART. NR.36178",
      "ANTAL ST PER KRT 24 st",
      "ANTAL KRT PER PALL 96 st",
    ],
    productAttributes: ["Välkänd energidryck från Red Bull",
      "Extra bränsle inför mental eller fysisk ansträngning",
      "Passar för restaurang-, krog- och cafébranschen",
    ],
    price: 0,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1747926280/red_bull_original_energidryck_250mlx24_540x_wqpcvt.webp",
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
