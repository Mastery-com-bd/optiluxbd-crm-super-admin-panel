import UserActions from '@/components/dashboard/userActions/user-actions';
import { getUserActions } from '@/service/logs/user-actions';
import React from 'react'

const Page = async ({ searchParams }: { searchParams: Promise<{
  [key: string]: string | string[] | undefined;
}> }) => {
    const query = await searchParams;
    const limit = query.limit || "10";
    const offset = query.offset || "0";
    const userId = Number(query.userId);

    // if (!userId) {
    //   return <div className="p-6 text-white bg-[#111111] rounded-3xl border border-white/10">User ID is required to view actions.</div>;
    // }

    const data = await getUserActions({ 
      userId, 
      query: { 
        ...query, 
        limit, 
        offset 
      } 
    });

  return (
    <div className="space-y-6">
      <UserActions userActions={data} />
    </div>
  );
};

export default Page