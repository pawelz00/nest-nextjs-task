# Currency Converter Application

A full-stack application for currency conversion and exchange rate tracking between EUR and PLN.

## Project Structure

The project consists of two main parts:

- **Frontend**: Next.js application providing a user interface for currency conversion
- **Backend**: NestJS API handling exchange rates and transactions

## Getting Started

### Backend

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Add .env file:

   ```
   API_URL=url
   API_KEY=key
   ```

4. Start the development server:
   ```
   pnpm run start:dev
   ```

### Frontend

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the development server:

   ```
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application

## API Endpoints

### Exchange Rate

- `GET /exchange-rate` - Get current exchange rate between EUR and PLN

### Transactions

- `GET /transaction` - Get all transactions
- `POST /transaction` - Create a new transaction
