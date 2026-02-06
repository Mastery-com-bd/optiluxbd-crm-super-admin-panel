import PaymentDetails from "@/components/dashboard/payment/payemntDetails/PaymentDetails";
import { downloadInvoice } from "@/service/payment";

const PaymentsDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const blob = await downloadInvoice(id);
  return (
    <section>
      <PaymentDetails blob={blob} />
    </section>
  );
};

export default PaymentsDetailsPage;
