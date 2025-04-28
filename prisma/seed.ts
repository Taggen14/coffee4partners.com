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
    name: "Kaffe",
    description: "Någon beskrivning för kaffe.",
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
] as const;

const products = [
  /* Kaffe */
  {
    name: "Arvid Nordquist Green Forest , Hela bönor",
    vendor: "Arvid Nordquist",
    description: "MELLANMÖRK - BALANSERAD & FRUKTIG Doft av karamell och mandel. Balanserad smak med ton av fikon. En fruktigt syrlig eftersmak. . Green Forest är dubbelcertifierat med UTZ och  EU Ekologiskt.",
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
    description: "MÖRKROST - KRAFTFULL & KRYDDIG Ren doft av nöt. Smaken är fyllig med livlig syrlighet. Kryddig eftersmak med ton av lakrits. Ethic Harvest är trippelcertifierat med Fairtrade, EU Ekologiskt och KRAV",
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
    description: "MELLANROST - FRUKTIG & NÖTIG Generös doft av hasselnöt. Rund smak med viss pepprighet. En balanserad och fruktig eftersmak. Highland Nature är trippelcertifierat med Fairtrade, EU Ekologiskt och KRAV",
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
    description: "EXTRA MÖRKROST - INTENSIV & KRAFTFULL Intensiv doft. Kraftfull och fyllig smak med inslag av mörk choklad. Lång och generös eftersmak.Midnight Grown är UTZ certifierat.",
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
    description: "MÖRKROST - BÄRIG & FYLLIG Fyllig smak med inslag av björnbär och orientaliska kryddor. Elegant syra och lång eftersmak. Dark Mountain är UTZ certifierat.",
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
  {
    name: "Gran Riserva Filter, hela bönor",
    vendor: "Lavazza",
    description: "Gran Riserva Filter, hela bönor, från Lavazza för café, hotell, restaurang och kaffebarer. 100 % Arabica-bönor och ljuvliga toner av karamell och kakao som balanseras med det intesiva kaffet. Rökiga toner från den torkade kakon och en sötare profil från karamelliserat socker. Gran Riserva Filter är optimalt för gott bryggkaffe. ",
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
    description: "Ekologiskt kaffe med hela bönor, Alteco, från Lavazza. En söt och elegant espresso, med aromer av honung och torkad frukt. Kaffet har en rund kakaofinish och bönorna är rostade under en lång tid under låg värme, för en ultimat balans mellan arom och smak. Bönorna härstammar ifrån de finaste sluttningarna i Centralamerika och vackra berg i Afrika. Alteco är ett 100% ekologisk kaffe gjort på både Arabica och Robusta. Kaffet har både EU:s ekologiska certifiering och UTZ, för bättre villkor i landbruket. Ett hållbart och säkert val för din kaffeservering på café, restaurang, hotell, förening eller hotell!",
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
    description: "Ett välbalanserat mellanrostat kaffe med en fyllig och omfamnande smak av kryddor och torkad frukt från Lavazza. Fylligheten kommer huvudsakligen från Arabicabönor med inslag av Robustabönor. Kaffet är en UTZ certifierad blandning från odlingar i Västra Sydamerika och Sydöstra Brasilien som framkallar aromer av torkade frukter såsom dadlar samt en kryddig avslutning med en hint av kanel.",
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
  /* Automater */
  {
    name: "Esprecious 11L",
    vendor: "Bravilor Bonamat",
    description: "Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.",
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
  /* Övrigt */
  /* Övrigt/Snacks */
  {
    name: "TWIX White chokladbit",
    vendor: "Mars",
    description: "Kex med ett tjockt lager av krämig karamell och ett täckte av len vit choklad, hör du vilken magisk kombination för munnen det är, och det är just vad TWIX White är. Och självklart är bitarna tvådelade, så dela med dig av denna godbit.",
    longDescription: "Psst... Twix började säljas i USA år 1969 och TWIX White har tidigare bara varit Limited Edition men nu är favoriten här för att stanna.",
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
    description: "Ramlösa Fläder/Lime i 33 cl-burk för café, restaurang och kiosk. Vad är egentligen godare än dryck med smak av fläder? Ramlösa har skapat en fantastisk törstsläckare bestående av lätt kolsyrat mineralvatten med naturliga mineraler och salter, smaksatt med frisk lime och somrig fläder. Vattnet från Ramlösa Hälsobrunn får sin balanserade smak på naturlig väg från dess vandring genom berggrunden och de skånska ängarna. ",
    longDescription: "",
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
          description: product.description,
          longDescription: product.longDescription,
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
