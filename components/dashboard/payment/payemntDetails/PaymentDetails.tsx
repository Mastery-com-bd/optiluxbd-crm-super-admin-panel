/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentDetails = ({ blob }: { blob: any }) => {
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let blobUrl: string | null = null;
    const fetchInvoice = () => {
      try {
        blobUrl = URL.createObjectURL(blob);
        setInvoiceUrl(blobUrl);
      } catch (err) {
        console.error("Failed to load invoice", err);
      }
    };
    fetchInvoice();
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blob]);

  const handlePrint = () => {
    if (invoiceUrl) {
      const printWindow = window.open(invoiceUrl);
      printWindow?.focus();
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>
      <h2>Payment Details</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handlePrint}>Print Invoice</button>
        <a
          href={invoiceUrl as string}
          download="invoice.pdf"
          style={{ marginLeft: "1rem" }}
        >
          Download Invoice
        </a>
      </div>
      {/* Use iframe to display PDF */}
      <iframe
        src={invoiceUrl as string}
        style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
        title="Invoice PDF"
      />
    </div>
  );
};

export default PaymentDetails;
