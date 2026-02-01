import PaymentList from "@/components/dashboard/payment/paymentList/PaymentList";
import { getPaymentList } from "@/service/payment";

const PaymentListPage = async () => {
  const result = await getPaymentList();
  const payments = result?.data;

  return (
    <section>
      <PaymentList payments={payments} />
    </section>
  );
};

export default PaymentListPage;
