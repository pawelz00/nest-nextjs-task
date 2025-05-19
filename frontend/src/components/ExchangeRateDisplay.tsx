"use client";

import { useEffect, useState } from "react";
import { getExchangeRate } from "@/services/exchangeService";

export default function ExchangeRateDisplay() {
  const [rateData, setRateData] = useState<{
    rate: number;
    timestamp: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const data = await getExchangeRate();

        if (!data) {
          throw new Error("No data received");
        }

        setRateData({
          rate: data.rate,
          timestamp: data.timestamp,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRate();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md flex items-center justify-center h-36">
        <div className="animate-pulse flex space-x-4">
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const formattedDate = rateData?.timestamp
    ? new Date(rateData.timestamp).toLocaleString()
    : "";

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-1 text-gray-900">
        Current Exchange Rate
      </h2>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">
          1 EUR = {rateData?.rate.toFixed(2)} PLN
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Last updated: {formattedDate}
      </p>
    </div>
  );
}
