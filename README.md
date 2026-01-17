# The Ledger Co - Frontend

A minimalist, modern frontend application for the Loan Management System, built with **React**, **Vite**, and **Tailwind CSS**.

## Features
- **Loan Management**: Create new loans with Bank ID, User ID, Principal, Tenure, and ROI.
- **Payment Processing**: Make EMI payments against existing loans.
- **Balance Check**: View outstanding balance for a specific loan and EMI count.
- **Dark Mode**: Fully supported dark/light theme toggle.
- **Responsive Design**: Mobile-friendly interface with glassmorphism effects.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Toastify

## Prerequisites
- Node.js (v18 or higher recommended)
- Spring Boot Backend running on port `8080`

## Installation

1. Clone the repository (or navigate to the directory):
   ```bash
   cd spring-ledger-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Backend Integration
The application is configured to proxy API requests to the backend.
- **Frontend URL**: `http://localhost:5173`
- **Backend URL**: `http://localhost:8080`
- **Proxy Rule**: All requests starting with `/v1` are forwarded to the backend.

### API Endpoints Used
- `POST /v1/loan` - Create Loan
- `POST /v1/payment` - Make Payment
- `GET /v1/balance` - Get Balance (expects `loanRefId` and `emiNumber` as Query Params)

## Configuration
- **Port**: Default is `5173` (Vite default).
- **Proxy**: Configured in `vite.config.js`. If your backend runs on a different port, update the `target` in `vite.config.js`.
