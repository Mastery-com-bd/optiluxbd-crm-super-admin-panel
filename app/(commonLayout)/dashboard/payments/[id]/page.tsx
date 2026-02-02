import PaymentDetails from "@/components/dashboard/payment/payemntDetails/PaymentDetails";

const PaymentsDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <section>
      <PaymentDetails />
    </section>
  );
};

export default PaymentsDetails;
