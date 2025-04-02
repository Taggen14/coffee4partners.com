import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Returer & Reklamationer | Coffee4partners",
  description:
    "Information om returer, reklamationer och garantier hos Coffee4partners.",
};

export default function ReturnsPage() {
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
          Returer & Reklamationer
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Här hittar du information om returer, reklamationer och garantier.
          </p>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Ångerrätt</h2>
            <p>
              Enligt konsumentköplagen och distansavtalslagen har du som
              privatperson 14 dagars ångerrätt från den dag du mottar varan. För
              företagskunder gäller separata villkor enligt överenskommelse.
            </p>
            <p>För att utnyttja din ångerrätt:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Kontakta oss inom 14 dagar från mottagande av varan.</li>
              <li>Meddela tydligt att du vill nyttja din ångerrätt.</li>
              <li>Returnera varan i originalskick och originalförpackning.</li>
              <li>Använd helst originalemballaget vid retursändning.</li>
            </ol>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Returprocess</h2>
            <p>Så här går du tillväga vid retur:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Kontakta vår kundservice för att meddela om returen.</li>
              <li>Du får en returblankett och instruktioner via e-post.</li>
              <li>Fyll i returblanketten och packa varan säkert.</li>
              <li>Skicka varan till vår returadress (se nedan).</li>
              <li>
                När vi mottagit och godkänt returen återbetalar vi beloppet inom
                14 dagar.
              </li>
            </ol>
            <p className="mt-4">
              <strong>Returadress:</strong>
              <br />
              Coffee4partners
              <br />
              Returavdelningen
              <br />
              adress?????
              <br />
              123 45 ORT
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Returkostnader</h2>
            <p>
              Vid utövande av ångerrätten står du för returkostnaden. Vi
              rekommenderar att du använder ett spårbart leveranssätt för
              returen.
            </p>
            <p>
              Vid reklamation av defekt vara står vi för returfrakten. Kontakta
              kundservice för att få en fraktsedel.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Reklamation</h2>
            <p>
              Om varan är defekt eller felaktig har du rätt att reklamera den.
              Enligt konsumentköplagen har du tre års reklamationsrätt från
              köptillfället.
            </p>
            <p>Vid reklamation:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Kontakta vår kundservice så snart som möjligt efter att du
                upptäckt felet.
              </li>
              <li>
                Beskriv felet så detaljerat som möjligt, gärna med bilder.
              </li>
              <li>
                Vi hjälper dig med hur du ska gå tillväga för att skicka in
                produkten.
              </li>
              <li>
                Efter att vi undersökt varan erbjuder vi reparation, utbyte
                eller återbetalning.
              </li>
            </ol>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Garanti</h2>
            <p>
              Coffee4partners lämnar minst 12 månaders garanti på alla produkter
              om inget annat anges. Garantin täcker material- och
              tillverkningsfel.
            </p>
            <p>Garantin omfattar inte:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Skador orsakade av felaktig användning.</li>
              <li>Normalt slitage.</li>
              <li>Förbrukningsvaror eller slitdelar.</li>
              <li>
                Skador orsakade av externa faktorer (t.ex. vatten, fall, extrema
                temperaturer).
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">Kontakta oss</h2>
            <p>
              Har du frågor om returer, reklamationer eller garantier? Kontakta
              vår kundservice:
            </p>
            <div className="mt-2">
              <p>E-post: returns@coffee4partners.se</p>
              <p>Telefon: 010-440 63 45</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
