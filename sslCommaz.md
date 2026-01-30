# SSLCommerz Payment Gateway - Workflow Documentation

This document provides a comprehensive guide to the SSLCommerz payment integration for subscription payments in OptiluxBD CRM.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Payment Flow Diagram](#payment-flow-diagram)
4. [API Endpoints](#api-endpoints)
5. [Frontend Integration Guide](#frontend-integration-guide)
6. [Backend Route Handlers](#backend-route-handlers)
7. [Environment Configuration](#environment-configuration)
8. [Testing with Sandbox](#testing-with-sandbox)
9. [Error Handling](#error-handling)
10. [Security Considerations](#security-considerations)

---

## Overview

SSLCommerz is Bangladesh's leading payment gateway that supports:

- **Credit/Debit Cards** (Visa, MasterCard, AMEX)
- **Mobile Banking** (bKash, Nagad, Rocket, etc.)
- **Internet Banking** (All major banks)
- **Wallet Payments**

This integration allows organizations to purchase subscription plans through SSLCommerz.

---

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │────▶│  Backend API    │────▶│   SSLCommerz    │
│   (React/Next)  │◀────│  (Express.js)   │◀────│   Gateway       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
   User Browser           PostgreSQL DB            Payment Page
```

### Key Components

| Component  | File                                           | Description               |
| ---------- | ---------------------------------------------- | ------------------------- |
| Config     | `src/config/sslcommerz.config.ts`              | Environment configuration |
| Service    | `src/services/sslcommerz.service.ts`           | Core payment logic        |
| Controller | `src/modules/payment/sslcommerz.controller.ts` | HTTP request handlers     |
| Routes     | `src/modules/payment/sslcommerz.routes.ts`     | Route definitions         |

---

## Payment Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SSLCommerz Payment Flow                              │
└─────────────────────────────────────────────────────────────────────────────┘

     Frontend                    Backend                     SSLCommerz
        │                           │                            │
        │  1. POST /initiate        │                            │
        │  (planId, cycle, etc.)    │                            │
        │─────────────────────────▶│                            │
        │                           │                            │
        │                           │  2. Create PaymentLog      │
        │                           │     (status: PENDING)      │
        │                           │                            │
        │                           │  3. POST /gwprocess/v4/api │
        │                           │─────────────────────────▶│
        │                           │                            │
        │                           │  4. Return GatewayPageURL  │
        │                           │◀─────────────────────────│
        │                           │                            │
        │  5. Return paymentUrl     │                            │
        │◀─────────────────────────│                            │
        │                           │                            │
        │  6. Redirect to           │                            │
        │     GatewayPageURL        │                            │
        │─────────────────────────────────────────────────────▶│
        │                           │                            │
        │                           │                            │
        │         USER COMPLETES PAYMENT ON SSLCOMMERZ           │
        │                           │                            │
        │                           │  7a. POST /success (or)    │
        │                           │◀─────────────────────────│
        │                           │  7b. POST /fail (or)       │
        │                           │◀─────────────────────────│
        │                           │  7c. POST /cancel          │
        │                           │◀─────────────────────────│
        │                           │                            │
        │                           │  8. Validate with          │
        │                           │     SSLCommerz API         │
        │                           │─────────────────────────▶│
        │                           │                            │
        │                           │  9. Update PaymentLog      │
        │                           │     & Organization Plan    │
        │                           │                            │
        │  10. Redirect to          │                            │
        │      Frontend Result Page │                            │
        │◀─────────────────────────│                            │
        │                           │                            │
```

---

## API Endpoints

### 1. Initiate Payment

**Endpoint:** `POST /api/v1/payments/sslcommerz/initiate`

**Authentication:** Required (JWT Token)

**Description:** Initiates a new payment session with SSLCommerz.

#### Request Body

```json
{
  "planId": 1,
  "cycle": "MONTHLY",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "01712345678",
  "customerAddress": "123 Main Street",
  "customerCity": "Dhaka",
  "customerPostcode": "1205",
  "customerCountry": "Bangladesh",
  "couponCode": "SAVE20",
  "organizationId": 5 // Only for SuperAdmin
}
```

| Field              | Type   | Required | Description                     |
| ------------------ | ------ | -------- | ------------------------------- |
| `planId`           | number | ✅       | Subscription plan ID            |
| `cycle`            | string | ✅       | `DAILY`, `MONTHLY`, or `YEARLY` |
| `customerName`     | string | ✅       | Customer's full name            |
| `customerEmail`    | string | ✅       | Customer's email address        |
| `customerPhone`    | string | ❌       | Customer's phone number         |
| `customerAddress`  | string | ❌       | Billing address                 |
| `customerCity`     | string | ❌       | City name                       |
| `customerPostcode` | string | ❌       | Postal code                     |
| `customerCountry`  | string | ❌       | Country (default: Bangladesh)   |
| `couponCode`       | string | ❌       | Discount coupon code            |
| `organizationId`   | number | ❌       | Required only for SuperAdmin    |

#### Success Response (200)

```json
{
  "success": true,
  "message": "Payment session initiated successfully",
  "data": {
    "paymentUrl": "https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=pay&SESSIONKEY=xxx",
    "transactionId": "SUBS_M2X9K3_A1B2C3D4",
    "paymentLogId": 42
  }
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Invalid amount for the selected plan and cycle",
  "code": "BAD_REQUEST"
}
```

---

### 2. Payment Success Callback

**Endpoint:** `POST /api/v1/payments/sslcommerz/success`

**Authentication:** None (Called by SSLCommerz)

**Description:** SSLCommerz redirects to this URL after successful payment.

#### Request Body (from SSLCommerz)

```json
{
  "tran_id": "SUBS_M2X9K3_A1B2C3D4",
  "val_id": "230501123456789",
  "amount": "999.00",
  "card_type": "VISA",
  "bank_tran_id": "230501123456",
  "status": "VALID",
  "verify_sign": "abc123...",
  "verify_key": "amount,bank_tran_id,..."
}
```

#### Response

Redirects to: `{FRONTEND_URL}/payment/success?transaction_id=SUBS_M2X9K3_A1B2C3D4`

---

### 3. Payment Failure Callback

**Endpoint:** `POST /api/v1/payments/sslcommerz/fail`

**Authentication:** None (Called by SSLCommerz)

**Description:** SSLCommerz redirects here when payment fails.

#### Request Body

```json
{
  "tran_id": "SUBS_M2X9K3_A1B2C3D4",
  "error": "Card declined"
}
```

#### Response

Redirects to: `{FRONTEND_URL}/payment/failed?transaction_id=SUBS_M2X9K3_A1B2C3D4&reason=Card%20declined`

---

### 4. Payment Cancellation Callback

**Endpoint:** `POST /api/v1/payments/sslcommerz/cancel`

**Authentication:** None (Called by SSLCommerz)

**Description:** SSLCommerz redirects here when user cancels payment.

#### Request Body

```json
{
  "tran_id": "SUBS_M2X9K3_A1B2C3D4"
}
```

#### Response

Redirects to: `{FRONTEND_URL}/payment/cancelled?transaction_id=SUBS_M2X9K3_A1B2C3D4`

---

### 5. IPN (Instant Payment Notification)

**Endpoint:** `POST /api/v1/payments/sslcommerz/ipn`

**Authentication:** None (Server-to-Server)

**Description:** Server-to-server callback from SSLCommerz for reliable payment confirmation.

#### Why IPN is Important

- Browser redirects can fail (network issues, user closes browser)
- IPN provides guaranteed server-to-server notification
- Always verify payment status via IPN, not just success redirect

#### Request Body

Same as success callback.

#### Response

```json
{
  "success": true,
  "message": "Payment processed successfully"
}
```

---

### 6. Get Payment Status

**Endpoint:** `GET /api/v1/payments/sslcommerz/status/:transactionId`

**Authentication:** Required (JWT Token)

**Description:** Check the status of a payment by transaction ID.

#### Response

```json
{
  "success": true,
  "data": {
    "status": "PAID",
    "payment": {
      "id": 42,
      "amount": "999",
      "currency": "BDT",
      "status": "PAID",
      "transactionReference": "SUBS_M2X9K3_A1B2C3D4",
      "billingCycle": "MONTHLY",
      "startDate": "2026-01-29T00:00:00.000Z",
      "endDate": "2026-02-28T00:00:00.000Z",
      "plan": {
        "name": "Professional Plan"
      },
      "organization": {
        "id": 5,
        "name": "Acme Corp",
        "slug": "acme-corp"
      }
    }
  }
}
```

#### Payment Status Values

| Status      | Description                               |
| ----------- | ----------------------------------------- |
| `PENDING`   | Payment initiated, waiting for completion |
| `PAID`      | Payment successful and verified           |
| `REJECTED`  | Payment failed or validation failed       |
| `CANCELLED` | User cancelled the payment                |

---

### 7. Initiate Refund (SuperAdmin Only)

**Endpoint:** `POST /api/v1/payments/sslcommerz/:id/refund`

**Authentication:** Required (SuperAdmin only)

**Description:** Initiate a refund for a completed payment.

#### Request Body

```json
{
  "refundAmount": 500,
  "reason": "Customer requested refund"
}
```

| Field          | Type   | Required | Description                           |
| -------------- | ------ | -------- | ------------------------------------- |
| `refundAmount` | number | ❌       | Partial refund amount (default: full) |
| `reason`       | string | ❌       | Reason for refund                     |

#### Response

```json
{
  "success": true,
  "message": "Refund initiated successfully",
  "data": {
    "status": "success",
    "refund_amount": 500,
    "bank_tran_id": "230501123456"
  }
}
```

---

## Frontend Integration Guide

### Step 1: Create Payment Initiation Function

```typescript
// services/payment.service.ts

interface PaymentInitParams {
  planId: number;
  cycle: "DAILY" | "MONTHLY" | "YEARLY";
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  couponCode?: string;
}

interface PaymentInitResponse {
  success: boolean;
  message: string;
  data?: {
    paymentUrl: string;
    transactionId: string;
    paymentLogId: number;
  };
}

export async function initiatePayment(
  params: PaymentInitParams,
): Promise<PaymentInitResponse> {
  const response = await fetch("/api/v1/payments/sslcommerz/initiate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    credentials: "include",
    body: JSON.stringify(params),
  });

  return response.json();
}
```

### Step 2: Payment Button Component

```tsx
// components/PaymentButton.tsx

import { useState } from "react";
import { initiatePayment } from "@/services/payment.service";
import { toast } from "react-hot-toast";

interface PaymentButtonProps {
  plan: {
    id: number;
    name: string;
    priceMonthly: number;
  };
  cycle: "DAILY" | "MONTHLY" | "YEARLY";
  user: {
    name: string;
    email: string;
    phone?: string;
  };
}

export function PaymentButton({ plan, cycle, user }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const result = await initiatePayment({
        planId: plan.id,
        cycle,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
      });

      if (result.success && result.data?.paymentUrl) {
        // Redirect to SSLCommerz payment page
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error(result.message || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="btn btn-primary"
    >
      {loading ? "Processing..." : `Subscribe to ${plan.name}`}
    </button>
  );
}
```

### Step 3: Payment Result Pages

Create these pages in your frontend to handle redirects from SSLCommerz:

#### Success Page (`/payment/success`)

```tsx
// pages/payment/success.tsx

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transaction_id");
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (transactionId) {
      // Fetch payment details
      fetch(`/api/v1/payments/sslcommerz/status/${transactionId}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setPaymentDetails(data.data));
    }
  }, [transactionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Your subscription has been activated successfully.
        </p>
        {paymentDetails?.payment && (
          <div className="bg-gray-50 p-4 rounded text-left mb-4">
            <p>
              <strong>Transaction ID:</strong> {transactionId}
            </p>
            <p>
              <strong>Plan:</strong> {paymentDetails.payment.plan?.name}
            </p>
            <p>
              <strong>Amount:</strong> ৳{paymentDetails.payment.amount}
            </p>
            <p>
              <strong>Valid Until:</strong>{" "}
              {new Date(paymentDetails.payment.endDate).toLocaleDateString()}
            </p>
          </div>
        )}
        <a href="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
```

#### Failure Page (`/payment/failed`)

```tsx
// pages/payment/failed.tsx

import { XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function PaymentFailed() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const transactionId = searchParams.get("transaction_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-700 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          {reason || "Your payment could not be processed."}
        </p>
        {transactionId && (
          <p className="text-sm text-gray-500 mb-4">
            Reference: {transactionId}
          </p>
        )}
        <div className="flex gap-2 justify-center">
          <a href="/pricing" className="btn btn-primary">
            Try Again
          </a>
          <a href="/support" className="btn btn-outline">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
```

#### Cancelled Page (`/payment/cancelled`)

```tsx
// pages/payment/cancelled.tsx

import { AlertCircle } from "lucide-react";

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-yellow-700 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-4">
          You have cancelled the payment process. No charges have been made.
        </p>
        <div className="flex gap-2 justify-center">
          <a href="/pricing" className="btn btn-primary">
            View Plans
          </a>
          <a href="/dashboard" className="btn btn-outline">
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
```

### Step 4: Check Payment Status (Polling)

```typescript
// hooks/usePaymentStatus.ts

import { useState, useEffect } from "react";

export function usePaymentStatus(transactionId: string | null) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!transactionId) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `/api/v1/payments/sslcommerz/status/${transactionId}`,
          { credentials: "include" },
        );
        const data = await response.json();
        setStatus(data.data?.status);
      } catch (error) {
        console.error("Error checking payment status:", error);
      } finally {
        setLoading(false);
      }
    };

    // Check immediately
    checkStatus();

    // Poll every 5 seconds if still pending
    const interval = setInterval(() => {
      if (status === "PENDING") {
        checkStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [transactionId, status]);

  return { status, loading };
}
```

---

## Backend Route Handlers

### How Success Route Works

```typescript
// 1. SSLCommerz sends POST to /success with payment data
// 2. Backend validates payment with SSLCommerz API
// 3. If valid:
//    - Updates PaymentLog status to PAID
//    - Updates Organization with new plan
//    - Increments coupon usage (if used)
// 4. Redirects user to frontend success page
```

### How Fail Route Works

```typescript
// 1. SSLCommerz sends POST to /fail with error info
// 2. Backend updates PaymentLog status to REJECTED
// 3. Stores failure reason
// 4. Redirects user to frontend failure page
```

### How Cancel Route Works

```typescript
// 1. SSLCommerz sends POST to /cancel
// 2. Backend updates PaymentLog status to CANCELLED
// 3. Redirects user to frontend cancelled page
```

### How IPN Route Works

```typescript
// 1. SSLCommerz server sends POST to /ipn (server-to-server)
// 2. Same processing as success route
// 3. Returns JSON response (no redirect)
// 4. Acts as backup if success redirect fails
```

### How Refund Route Works

```typescript
// 1. SuperAdmin calls POST /:id/refund
// 2. Backend finds PaymentLog and validates status
// 3. Extracts bank_tran_id from payment proof
// 4. Calls SSLCommerz refund API
// 5. Updates PaymentLog status
```

---

## Environment Configuration

Add these variables to your `.env` file:

```bash
# SSLCommerz Configuration
SSLCOMMERZ_STORE_ID=testbox              # Your store ID
SSLCOMMERZ_STORE_PASSWORD=qwerty         # Your store password
SSLCOMMERZ_SANDBOX=true                  # true for sandbox, false for production

# Callback URLs (optional - will use APP_URL if not set)
SSLCOMMERZ_SUCCESS_URL=https://your-api.com/api/v1/payments/sslcommerz/success
SSLCOMMERZ_FAIL_URL=https://your-api.com/api/v1/payments/sslcommerz/fail
SSLCOMMERZ_CANCEL_URL=https://your-api.com/api/v1/payments/sslcommerz/cancel
SSLCOMMERZ_IPN_URL=https://your-api.com/api/v1/payments/sslcommerz/ipn

# Frontend URL for redirects
FRONTEND_URL=https://your-frontend.com

# Backend URL
APP_URL=https://your-api.com
```

### Production vs Sandbox

| Setting              | Sandbox                  | Production                 |
| -------------------- | ------------------------ | -------------------------- |
| `SSLCOMMERZ_SANDBOX` | `true`                   | `false`                    |
| Base URL             | `sandbox.sslcommerz.com` | `securepay.sslcommerz.com` |
| Store ID             | `testbox`                | Your merchant ID           |
| Password             | `qwerty`                 | Your merchant password     |

---

## Testing with Sandbox

### Sandbox Credentials

```
Store ID: testbox
Store Password: qwerty
```

### Test Cards

| Card Type  | Card Number      | Expiry | CVV |
| ---------- | ---------------- | ------ | --- |
| Visa       | 4111111111111111 | 12/25  | 123 |
| MasterCard | 5500000000000004 | 12/25  | 123 |

### Testing Flow

1. Call `/initiate` endpoint with test data
2. Open the returned `paymentUrl` in browser
3. Select any payment method
4. Use test credentials
5. Complete payment
6. Verify redirect to success page
7. Check payment status via `/status/:transactionId`

---

## Error Handling

### Common Errors

| Error                       | Cause                       | Solution                 |
| --------------------------- | --------------------------- | ------------------------ |
| `Store Credential Error`    | Invalid store ID/password   | Check `.env` credentials |
| `Invalid amount`            | Plan has no price for cycle | Ensure plan has pricing  |
| `Organization not found`    | Invalid organization ID     | Verify organizationId    |
| `Payment validation failed` | Amount mismatch or tampered | Check SSLCommerz logs    |

### Error Response Format

```json
{
  "success": false,
  "message": "Error description here",
  "code": "BAD_REQUEST"
}
```

---

## Security Considerations

### 1. Validate IPN/Success Data

Always validate payment with SSLCommerz API:

```typescript
// Don't trust client-side data alone
const validationResult = await this.validatePayment(data.val_id);
if (validationResult.status !== "VALID") {
  // Reject the payment
}
```

### 2. Verify Amount

```typescript
const paidAmount = parseFloat(data.amount);
const expectedAmount = parseFloat(paymentLog.amount.toString());

if (Math.abs(paidAmount - expectedAmount) > 0.01) {
  // Amount mismatch - possible tampering
}
```

### 3. Use HTTPS

All callback URLs must use HTTPS in production.

### 4. Store Sensitive Data Securely

- Never log store passwords
- Store `bank_tran_id` for refunds
- Don't expose full card numbers

### 5. Implement Rate Limiting

Protect the `/initiate` endpoint from abuse.

---

## Quick Reference

### Payment States

```
PENDING → PAID      (success)
PENDING → REJECTED  (fail/validation error)
PENDING → CANCELLED (user cancelled)
PAID → CANCELLED    (refunded)
```

### URLs Quick Reference

| Type     | URL                                           |
| -------- | --------------------------------------------- |
| Initiate | `POST /api/v1/payments/sslcommerz/initiate`   |
| Success  | `POST /api/v1/payments/sslcommerz/success`    |
| Fail     | `POST /api/v1/payments/sslcommerz/fail`       |
| Cancel   | `POST /api/v1/payments/sslcommerz/cancel`     |
| IPN      | `POST /api/v1/payments/sslcommerz/ipn`        |
| Status   | `GET /api/v1/payments/sslcommerz/status/:id`  |
| Refund   | `POST /api/v1/payments/sslcommerz/:id/refund` |

---

## Support

For SSLCommerz integration issues:

- **SSLCommerz Docs:** https://developer.sslcommerz.com/
- **Sandbox Panel:** https://sandbox.sslcommerz.com/manage/
- **Support:** integration@sslcommerz.com

---

_Last Updated: January 29, 2026_
