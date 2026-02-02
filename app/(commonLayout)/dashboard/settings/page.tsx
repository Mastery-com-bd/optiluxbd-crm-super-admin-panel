import AllBrandList from "@/components/dashboard/settings/allBrands/AllBrandList";
import { getBranding } from "@/service/settings";

const SettingsPage = async () => {
  const result = await getBranding();
  const branding = result?.data;
  return (
    <section>
      <AllBrandList branding={branding} />
    </section>
  );
};

export default SettingsPage;
