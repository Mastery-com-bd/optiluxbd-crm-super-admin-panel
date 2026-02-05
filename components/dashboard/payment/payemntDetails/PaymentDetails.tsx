"use client";

import { useEffect, useState } from "react";
import { downloadInvoice } from "@/service/payment";

interface PaymentDetailsProps {
  id: string;
}

const PaymentDetails = ({ id }: PaymentDetailsProps) => {
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

  useEffect(() => {
    let blobUrl: string | null = null;

    const fetchInvoice = async () => {
      try {
        const blob = await downloadInvoice(id);
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
  }, [id]);

  const handlePrint = () => {
    if (invoiceUrl) {
      const printWindow = window.open(invoiceUrl);
      printWindow?.focus();
    }
  };

  console.log(invoiceUrl);

  if (!invoiceUrl) return <p>Loading invoice...</p>;

  return (
    <div>
      <h2>Payment Details</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handlePrint}>Print Invoice</button>
        <a
          href={invoiceUrl}
          download="invoice.pdf"
          style={{ marginLeft: "1rem" }}
        >
          Download Invoice
        </a>
      </div>
      {/* Use iframe to display PDF */}
      <iframe
        src={invoiceUrl}
        style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
        title="Invoice PDF"
      />
    </div>
  );
};

export default PaymentDetails;
