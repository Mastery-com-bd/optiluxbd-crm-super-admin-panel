"use client";

import PageHeader from "@/components/shared/pageHeader";
import CreateFeature from "./CreateFeature";
import { TFeatureData } from "@/types/feature.types";
import { featureTableColumn } from "./AllFeatureTable";
import TableComponent from "@/components/ui/TableComponent";

const AllFeature = ({ features }: { features: TFeatureData[] }) => {
  const column = featureTableColumn();
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between ">
        <PageHeader title="Feature List" />
        <CreateFeature />
      </div>
      <TableComponent data={features} columns={column} />
    </div>
  );
};

export default AllFeature;
