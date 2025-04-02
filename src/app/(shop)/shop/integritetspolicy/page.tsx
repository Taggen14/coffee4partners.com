import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy | Coffee4partners",
  description: "Läs om hur vi hanterar och skyddar dina personuppgifter.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          Integritetspolicy
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}
          </p>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">1. Inledning</h2>
            <p>
              Coffee4partners värnar om din personliga integritet. Denna
              integritetspolicy förklarar hur vi samlar in, använder och skyddar
              dina personuppgifter när du använder vår webbplats och tjänster.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">
              2. Personuppgifter vi samlar in
            </h2>
            <p>Vi samlar in följande typer av personuppgifter:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kontaktinformation (namn, e-postadress, telefonnummer)</li>
              <li>Leveransadress och faktureringsadress</li>
              <li>Orderhistorik och köpinformation</li>
              <li>
                Betalningsinformation (hanteras säkert via våra
                betalningsleverantörer)
              </li>
              <li>Kommunikationshistorik med vår kundservice</li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">
              3. Hur vi använder dina uppgifter
            </h2>
            <p>Vi använder dina personuppgifter för att:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hantera dina beställningar och leveranser</li>
              <li>Skicka orderbekräftelser och fakturor</li>
              <li>Hantera returer och reklamationer</li>
              <li>Skicka viktig information om din beställning</li>
              <li>Förbättra våra tjänster och webbplats</li>
              <li>Skicka nyhetsbrev och erbjudanden (med ditt samtycke)</li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">
              4. Rättslig grund för behandling
            </h2>
            <p>
              Vi behandlar dina personuppgifter på följande rättsliga grunder:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Uppfyllelse av avtal (köp och leverans av produkter)</li>
              <li>Lagliga skyldigheter (bokföring, momsredovisning)</li>
              <li>
                Berättigat intresse (förbättring av tjänster, marknadsföring)
              </li>
              <li>Samtycke (nyhetsbrev, direktmarknadsföring)</li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">5. Dina rättigheter</h2>
            <p>Enligt GDPR har du följande rättigheter:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Rätt till åtkomst till dina personuppgifter</li>
              <li>Rätt till rättelse av felaktiga uppgifter</li>
              <li>Rätt till radering av dina uppgifter</li>
              <li>Rätt att begränsa behandlingen</li>
              <li>Rätt till dataportabilitet</li>
              <li>Rätt att invända mot behandling</li>
              <li>Rätt att återkalla samtycke</li>
            </ul>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">6. Säkerhet</h2>
            <p>
              Vi implementerar lämpliga tekniska och organisatoriska åtgärder
              för att skydda dina personuppgifter mot obehörig eller olaglig
              behandling, oavsiktlig förlust, förstörelse eller skada.
            </p>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">7. Kontakt</h2>
            <p>
              För frågor om vår hantering av personuppgifter eller för att utöva
              dina rättigheter, kontakta oss på:
            </p>
            <div className="mt-2">
              <p>E-post: info@Coffee4partners.se</p>
              <p>Telefon: 010-440 63 45</p>
            </div>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold">
              8. Ändringar i integritetspolicyn
            </h2>
            <p>
              Vi förbehåller oss rätten att ändra denna integritetspolicy.
              Eventuella ändringar kommer att publiceras på denna sida med
              uppdaterat datum.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
