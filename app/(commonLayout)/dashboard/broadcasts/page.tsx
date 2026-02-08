import AllBroadcast from "@/components/dashboard/broadcast/allBroadcast/AllBroadcast";
import { getAllBroadcast } from "@/service/broadcast";

const BroadcastPage = async () => {
  const result = await getAllBroadcast();
  const broadcasts = result?.data;
  console.log(broadcasts);
  return (
    <section>
      <AllBroadcast broadcasts={broadcasts} />
    </section>
  );
};

export default BroadcastPage;
