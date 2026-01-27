import { getAllPlans } from "@/service/plans";

export type TSearchParams = Promise<{
  [key: string]: string | string[] | number | undefined;
}>;

const AllPlansPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;

  const result = await getAllPlans(query);
  console.log("plans result", result);

  return <div>this is all plans page</div>;
};

export default AllPlansPage;
