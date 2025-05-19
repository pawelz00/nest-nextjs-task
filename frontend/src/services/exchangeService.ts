const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

interface ExchangeRateResponse {
  rate: number;
  timestamp: string;
}

interface TransactionResponse {
  id: string;
  amountEur: number;
  amountPln: number;
  exchangeRate: number;
  timestamp: Date;
}

export async function getExchangeRate(): Promise<
  ExchangeRateResponse | undefined
> {
  try {
    const res = await fetch(`${API_URL}/exchange-rate`);
    const rate = await res.json();

    return {
      rate: rate,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return undefined;
  }
}

export async function transaction(
  amountEur: number
): Promise<TransactionResponse | undefined> {
  try {
    const res = await fetch(`${API_URL}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amountEur: amountEur,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch conversion");
    }

    const data: TransactionResponse = await res.json();

    if (!data) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error) {
    console.error("Error with transaction:", error);
    return undefined;
  }
}
