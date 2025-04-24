import {
  PrismaClient,
  InquiryType,
  InquiryStatus,
  MessageRole,
} from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Varumärken",
    description: "Någon beskrivning för dem.",
  },
  {
    name: "Varm dryck",
    description: "Någon beskrivning för dem.",
  },
  {
    name: "Övrigt",
    description: "Någon beskrivning för dem.",
  },
  {
    name: "Kafferosterier",
    description: "Någon beskrivning för dem.",
  },
  {
    name: "Fikalösningar",
    description: "Någon beskrivning för dem.",
  },
] as const;

const products = [
  {
    name: "Esprecious 11L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Varumärken",
  },
  {
    name: "Esprecious 221L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Varumärken",
  },
  {
    name: "Esprecious 33L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Varumärken",
  },
  {
    name: "Esprecious 44L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Varumärken",
  },
  {
    name: "Esprecious 33L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Kafferosterier",
  },
  {
    name: "Esprecious 44L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Kafferosterier",
  },
  {
    name: "Esprecious 55L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Varm dryck",
  },
  {
    name: "Esprecious 66L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Varm dryck",
  },


  {
    name: "Esprecious 66L",
    description: `
      <div class="product-description">
        <h2>Om Esprecious 11L</h2>
        <p>Esprecious 11L har två behållare, en för kaffebönor och en för instantprodukter. Esprecious 11L är avsedd för användning med färsk mjölk. Maskinen styr mjölkskummaren så att drycker som cappuccino och café au lait bereds med färsk mjölk. Den stora instantbehållaren på drygt 3 liter kan fyllas med kakao för bl.a. varm choklad.</p>
        
        <h3>Egenskaper Esprecious 11L</h3>
        <ul>
          <li>Användarvänlig: intuitiv pekskärm</li>
          <li>Böna-till-kopp: brygger med färska kaffebönor</li>
          <li>Kaffespecialiteter som cappuccino bereds med färsk mjölk</li>
          <li>Dubbelt utlopp: serverar två drycker samtidigt</li>
          <li>Professionell kvarn och bryggare: för perfekt malning och kaffeextraktion</li>
          <li>Separata inställningar av temperatur, vatten/kaffeförhållande, etc.</li>
          <li>Service- och underhållsvänlig</li>
          <li>Hög kvalitet i koppen tack vare automatiskt sköljprogram</li>
          <li>Unikt hetvattensystem som minimerar kalkbeläggning vilket resulterar i mindre underhåll</li>
          <li>Separat utlopp för hetvatten för bl.a. te</li>
        </ul>

        <h3>Specifikationer</h3>
        <ul>
          <li>Vattentrycket: 2 Bar</li>
          <li>Vattenanslutning: Ja</li>
          <li>Färg: Stainless dark</li>
          <li>Anslutning: 230V~ 50/60Hz 1650W</li>
          <li>Mått (B × D × H): 240 × 460 × 630 mm</li>
        </ul>
      </div>
    `,
    price: 12345,
    stock: 50,
    images: [
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-540x_rmlqhk.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-sideview-540x_frtpqv.webp",
      "https://res.cloudinary.com/dnte9pl8k/image/upload/v1743426661/Esprecious-11L-open-540x_utt3rl.webp",
    ],
    category: "Varm dryck",
  },
];

async function main() {
  // Clean up existing data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.feature.deleteMany();

  console.log("🗑️ Cleaned up existing data");

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

  // Create products
  const createdProducts = await Promise.all(
    products.map((product) => {
      const category = createdCategories.find(
        (c) => c.name === product.category,
      );
      if (!category) throw new Error(`Category ${product.category} not found`);

      return prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          // longDescription: product.longDescription,
          price: product.price,
          stock: product.stock,
          images: product.images,
          categoryId: category.id,
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
