import PaymentDetails from "@/components/dashboard/payment/payemntDetails/PaymentDetails";

const PaymentsDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <section>
      <PaymentDetails id={id} />
    </section>
  );
};

export default PaymentsDetailsPage;
