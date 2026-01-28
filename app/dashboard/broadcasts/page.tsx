import AllBroadcast from "@/components/dashboard/broadcast/allBroadcast/AllBroadcast";
import { getAllBroadcast } from "@/service/broadcast";

const BroadcastPage = async () => {
  const result = await getAllBroadcast();
  console.log(result);
  const broadcasts = result?.data;

  return (
    <section>
      <AllBroadcast broadcasts={broadcasts} />
    </section>
  );
};

export default BroadcastPage;
