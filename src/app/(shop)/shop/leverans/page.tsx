import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Leveransinformation | Coffee4partners",
  description:
    "Information om leveranstider, fraktkostnader och leveransmetoder för Coffee4partners.",
};

export default function DeliveryPage() {
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
          Leveransinformation
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Här hittar du information om våra leveransalternativ, leveranstider
            och fraktkostnader.
          </p>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Leveransalternativ</h2>
            <p>Coffee4partners erbjuder följande leveransalternativ:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Standardleverans</strong> - Leverans inom 3-5
                arbetsdagar.
              </li>
              <li>
                <strong>Expressleverans</strong> - Leverans inom 1-2 arbetsdagar
                (extra kostnad tillkommer).
              </li>
              <li>
                <strong>Företagsleverans</strong> - Anpassade leveranstider för
                företagskunder.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Leveranstider</h2>
            <p>
              Leveranstider kan variera beroende på lagerstatusen för de
              produkter du beställer:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Produkter i lager: 3-5 arbetsdagar.</li>
              <li>Produkter som inte finns i lager: 7-10 arbetsdagar.</li>
              <li>Skrymmande produkter kan ha längre leveranstid.</li>
              <li>
                Leveranstiden räknas från det att beställningen bekräftats, inte
                från betalningstillfället.
              </li>
            </ul>
            <p className="mt-4">
              Observera att leveranstider kan påverkas vid storhelger,
              semestertider och andra högtider.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Fraktkostnader</h2>
            <p>
              Våra fraktkostnader baseras på beställningens vikt, storlek och
              leveransadress:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standardfrakt: från 99 kr (inkl. moms)</li>
              <li>Expressfrakt: från 199 kr (inkl. moms)</li>
              <li>
                Fri frakt på beställningar över 3000 kr (gäller
                standardleverans)
              </li>
            </ul>
            <p className="mt-4">
              Den exakta fraktkostnaden visas i kassan innan du slutför din
              beställning.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Leveransprocess</h2>
            <p>Så här fungerar vår leveransprocess:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                När din beställning är bekräftad får du en orderbekräftelse.
              </li>
              <li>Vi förbereder din order för leverans.</li>
              <li>
                När din beställning skickas får du ett leveransmeddelande med
                eventuell spårningsinformation.
              </li>
              <li>Leveransen sker till angiven leveransadress.</li>
              <li>
                För vissa skrymmande produkter kan vi kontakta dig för att
                avtala en specifik leveranstid.
              </li>
            </ol>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Leveransområde</h2>
            <p>
              För närvarande levererar vi till hela Sverige. Leveranser till
              andra länder kan arrangeras på förfrågan.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Kontakta oss</h2>
            <p>Har du frågor om leveranser? Kontakta vår kundservice:</p>
            <div className="mt-2">
              <p>E-post: info@coffee4partners.se</p>
              <p>Telefon: 010-440 63 45</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
