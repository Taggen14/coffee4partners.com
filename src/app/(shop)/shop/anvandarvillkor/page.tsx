import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Användarvillkor | Coffee4partners",
  description: "Läs våra användarvillkor för webbplatsen och butiken.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          Användarvillkor
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}
          </p>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">1. Inledning</h2>
            <p>
              Dessa användarvillkor gäller för användning av Coffee4partners
              webbplats och butik. Genom att använda vår webbplats godkänner du
              dessa villkor.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">2. Köp och betalning</h2>
            <p>När du gör ett köp gäller följande:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Alla priser är i svenska kronor (SEK) inklusive moms</li>
              <li>Vi accepterar betalning via faktura</li>
              <li>Betalning ska ske inom 30 dagar från fakturadatum</li>
              <li>Vid försenad betalning debiteras ränta enligt räntelagen</li>
              <li>
                Vi förbehåller oss rätten att ändra priser och erbjudanden
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">3. Leverans</h2>
            <p>Angående leverans gäller:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Leveranstider varierar beroende på produkt och lager</li>
              <li>Vi levererar inom Sverige</li>
              <li>Leveranskostnader tillkommer enligt gällande prislista</li>
              <li>Vi är inte ansvariga för förseningar utanför vår kontroll</li>
              <li>Risk för förlust övergår till kunden vid leverans</li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">4. Ångerrätt och retur</h2>
            <p>Enligt distansavtalslagen har du:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>14 dagars ångerrätt från mottagandet av varan</li>
              <li>Rätt att avstå köpet utan att ange skäl</li>
              <li>Rätt att få tillbaka betalt belopp inom 14 dagar</li>
              <li>Rätt att få tillbaka eventuella leveranskostnader</li>
            </ul>
            <p className="mt-4">
              För att utöva ångerrätten, kontakta oss inom 14 dagar från
              mottagandet av varan.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">
              5. Garanti och reklamation
            </h2>
            <p>Våra produkter är omfattade av:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>3 års reklamationsrätt enligt konsumentköplagen</li>
              <li>Garanti enligt gällande lagstiftning</li>
              <li>Rätt till ersättning vid fel och brister</li>
              <li>Rätt till ombyte eller återbetalning vid fel</li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">
              6. Immateriella rättigheter
            </h2>
            <p>
              Allt innehåll på webbplatsen, inklusive texter, bilder, logotyper
              och design är Coffee4partners egendom och skyddas av
              upphovsrättslagen.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">7. Ansvarsfriskrivning</h2>
            <p>
              Vi strävar efter att all information på webbplatsen ska vara
              korrekt och uppdaterad, men kan inte garantera att all information
              är fullständig eller felfri. Vi ansvarar inte för eventuella
              skador som uppstår genom användning av vår webbplats eller
              produkter.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">8. Tvistelösning</h2>
            <p>
              Eventuella tvister ska lösas enligt svensk lag och ska prövas i
              svensk domstol. Vid konsumenttvister kan du också vända dig till
              Allmänna reklamationsnämnden (ARN).
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">9. Kontakt</h2>
            <p>
              För frågor om dessa villkor eller andra ärenden, kontakta oss på:
            </p>
            <div className="mt-2">
              <p>E-post: info@coffee4partners.se</p>
              <p>Telefon: 010-440 63 45</p>
            </div>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">
              10. Ändringar i villkoren
            </h2>
            <p>
              Vi förbehåller oss rätten att ändra dessa villkor. Eventuella
              ändringar kommer att publiceras på denna sida med uppdaterat
              datum.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
