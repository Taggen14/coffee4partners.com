# Coffee4parnters-website-shop-adminUI

Detta är en fullstack e-handelswebbplats med tillhörande admin-gränssnitt för produkthantering och kundadministration. Projektet är byggt med moderna webbutvecklingstekniker och hanterar fullt flöde för beställning av produkter med fakturering som betalinings metod.

## Deploment

https://coffee4partners.vercel.app/

---

## Teknikstack

### Ramverk & Språk
- Next.js 15, React 19, TypeScript, Tailwind CSS 4

### Autentisering & Säkerhet
- Clerk – Inloggning, registrering och sessioner

### Databas & ORM
- Prisma ORM, PostgreSQL / annan DB – via `DATABASE_URL` i `.env`

### UI-Komponenter
- Shadcn, Lucide Icons, framer-motion

### Datahantering
- TanStack React Query, Zustand, React Hook Form + Zod

### Media, PDF & E-post
- Cloudinary, PDF-generatorer, Nodemailer

### Kvalitet & Verktyg
- ESLint, Prettier

---

## Website endpoints

/admin är ett admin gränssnitt där ägaren av webbsidan kan hantera produkter, kategorier & underkatergorier. dvs få en översikt, skapa, ändra & ta bort produkter. Även hantera konton för webbsidan, skapa, ta bort & bestämma roller. för att få åtkomst till /admin behöver du vara inloggad på ett konto med "admin" som roll.

Resterande av webbsidan är publik förutom /shop/checkout då man måste vara kund för att få lägga en beställning. Med kund innebär det att vara inloggad på ett konto med roll "customer".

──admin/
    ├── accounts/
    └── products/
        ├── categories/
        └── sub-categories/
(website)
── about/
── career/
── contact/
── create-account/
── service/
── sign-in/[[...sign-in]]
── sign-up/[[...sign-up]]
├─ shop/
    └── [categorySlug]/
        ├── [subCategorySlug]/
        └──── [productId]/
    ├── anvandarvillkor/
    ├── betalning/
    ├── cart/
    ├── checkout/
    ├── confirmation/
    ├── integritetspolicy/
    ├── leverans/
    ├── orders/
    │   └── [orderId]/
    ├── returer/
    ├── search/
    └── [categorySlug]/
        └── [subCategorySlug]/
            └── [productId]/

## API endpoints

Hanterar CRUD operationer flesta fallen via hooks

api/
└── admin/
    ├── categories/                 -- Create, Read 
    │   └── [categoryId]/           -- Update, Delete
    ├── products/                   -- Create, Read
    │   ├── search/                 -- Filter Read
    │   └── [productId]/            -- Update, Delete
    ├── sub-categories/             -- Create, Read
    │   └── [subCategoryId]/        -- Update, Delete
    ├── upload/                     -- Saves image (cloudinary)
    └── users/                      -- Read
        └── [userId]/               -- Update, Delete
└── email/
    ├── contact-form/               -- sends form informaiton to admin
    ├── create-account-notify/      -- sends amail to admin when i customer have applied to create an account
    └── user-invite/                -- Send email with Clerk invite
└── invitations/                    -- Create, Read (Clerk invites)
    └── [userId]/                   -- Delete
└── invoices/generate/              -- Create order-pdf and sends it to customer and admin
└── newsletter/                     -- Create newsletter subscription
└── products/search/                -- Filter Read

---

## hooks

Skapar återanvändbar logik för CRUD operationer och minskar antalet HTTP anrop som behövsgöras 

use-categories
use-invites
use-products
use-sub-categories
use-users

---

## .env setup
BASE_URL=
NEXT_PUBLIC_BASE_URL=

### Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=

### Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

### DB
DATABASE_URL=

### SMTP-INSTÄLLNINGAR TEST
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASSWORD=
RECIPIENT_EMAIL=

ADMIN_EMAIL=
SMTP_FROM_EMAIL=