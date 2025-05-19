import ExchangeRateDisplay from "@/components/ExchangeRateDisplay";
import CurrencyConverterForm from "@/components/CurrencyConverterForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 md:p-12 p-8 max-w-2xl mx-auto">
      <header className="w-full">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-4xl font-bold">EUR to PLN Currency Converter</h1>
        </div>
      </header>

      <main className="flex flex-col gap-8 items-center w-full">
        <ExchangeRateDisplay />
        <CurrencyConverterForm />
      </main>
    </div>
  );
}
