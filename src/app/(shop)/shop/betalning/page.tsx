import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Betalningsinformation | Coffee4partners",
  description:
    "Information om betalningsalternativ och villkor för Coffee4partners.",
};

export default function PaymentPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tillbaka till butiken
        </Link>

        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          Betalningsinformation
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Här hittar du information om våra betalningsalternativ och villkor.
          </p>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Betalningsalternativ</h2>
            <p>
              Coffee4partners erbjuder följande betalningsalternativ för att
              göra din köpupplevelse så smidig som möjligt:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Faktura</strong> - Vi skickar en faktura via e-post som
                betalas inom 30 dagar.
              </li>
              <li>
                <strong>Företagskonto</strong> - För företagskunder med
                befintligt konto hos oss.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Betalningsvillkor</h2>
            <p>
              När du handlar på Coffee4partners gäller följande
              betalningsvillkor:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Betalning ska göras inom 30 dagar från fakturadatum.</li>
              <li>Alla priser anges inklusive moms om inget annat anges.</li>
              <li>
                Vid försenad betalning debiteras dröjsmålsränta enligt
                räntelagen samt eventuell påminnelseavgift.
              </li>
              <li>
                Varorna förblir Coffee4partners egendom tills full betalning har
                mottagits.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Betalningsprocess</h2>
            <p>Så här fungerar betalningsprocessen:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Lägg din beställning genom att fylla i nödvändig information.
              </li>
              <li>Du får en orderbekräftelse via e-post.</li>
              <li>
                Vi behandlar din order och skickar en faktura till din angivna
                e-postadress.
              </li>
              <li>
                Betala fakturan inom 30 dagar via banköverföring till vårt
                konto.
              </li>
              <li>
                När betalningen är mottagen markeras ordern som betald i vårt
                system.
              </li>
            </ol>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Säker betalning</h2>
            <p>
              Vi prioriterar säkerheten vid betalningar och följer gällande
              säkerhetsstandarder för att skydda dina personuppgifter och
              betalningsinformation.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Kontakta oss</h2>
            <p>
              Har du frågor om betalningar eller fakturor? Kontakta vår
              kundservice:
            </p>
            <div className="mt-2">
              <p>E-post: info@Coffee4partners.se</p>
              <p>Telefon: 010-440 63 45</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
