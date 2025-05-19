"use client";

import { useState } from "react";
import { transaction } from "@/services/exchangeService";

export default function CurrencyConverterForm() {
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const conversion = await transaction(Number(numAmount));

      if (!conversion) {
        throw new Error("No conversion data received");
      }

      setResult(conversion.amountPln);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        EUR to PLN Converter
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount (EUR)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              €
            </span>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setResult(null);
              }}
              className="block w-full pl-8 pr-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-70"
        >
          {isLoading ? "Converting..." : "Convert to PLN"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}

      {result !== null && !error && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-gray-600 ">Converted amount:</p>
          <p className="text-2xl font-bold text-gray-900">
            {result.toFixed(2)} PLN
          </p>
          <p className="text-xs text-gray-500 mt-1">({amount} EUR)</p>
        </div>
      )}
    </div>
  );
}
