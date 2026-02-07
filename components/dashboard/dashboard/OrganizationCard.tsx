import { TUsageAnalytics } from "@/types/type.analytics";

const OrganizationCard = ({
  usageAnalytics,
}: {
  usageAnalytics: TUsageAnalytics;
}) => {
  return (
    <div className="flex items-center justify-between gap-10 p-3 rounded-xl hover:bg-white/10 duration-500 relative">
      <div className="flex gap-4">
        <h1>{usageAnalytics?.organizationName}</h1>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="flex items-center gap-1 text-sm text-[#F2F2F2]">
          <span>Usage</span>
          <span>{usageAnalytics?.usage}</span>
        </p>
        <div
          className={`relative rounded-lg px-3 effect ${
            usageAnalytics?.percentage < 50
              ? "bg-[rgba(0,166,86,0.05)]"
              : "bg-[rgba(255,106,85,0.05)] "
          }`}
        >
          <span className={`text-xs`}>{usageAnalytics?.limit}</span>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard;
