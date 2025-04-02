import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function ShopFooter() {
  return (
    <footer className="w-full border-t px-8 flex justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12 md:py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">Butik</h3>
            <div className="flex flex-col space-y-3 text-sm">
              <Link
                href="/shop/categories"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Alla kategorier
              </Link>
              <Link
                href="/shop/search?sort=newest"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Nyheter
              </Link>
              <Link
                href="/shop/search?sort=popular"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Bästsäljare
              </Link>
              <Link
                href="/shop/search?sort=price-asc"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Rea
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">Kundservice</h3>
            <div className="flex flex-col space-y-3 text-sm">
              <Link
                href="/shop/betalning"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Betalning
              </Link>
              <Link
                href="/shop/leverans"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Leverans
              </Link>
              <Link
                href="/shop/returer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Returer
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">Nyhetsbrev</h3>
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">
                Prenumerera för att få erbjudanden, uppdateringar och nyheter.
              </p>
              <form className="flex space-x-2">
                <Input
                  placeholder="Din e-postadress"
                  type="email"
                  className="h-10 text-base"
                />
                <Button className="h-10 px-6 text-base">Prenumerera</Button>
              </form>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>© 2024 Coffee4partners. Alla rättigheter förbehållna.</p>
          <div className="flex items-center space-x-6">
            <Link
              href="/shop/integritetspolicy"
              className="transition-colors hover:text-foreground"
            >
              Integritetspolicy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
