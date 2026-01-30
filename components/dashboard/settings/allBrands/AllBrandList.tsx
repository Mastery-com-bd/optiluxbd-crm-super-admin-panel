/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PageHeader from "@/components/shared/pageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TBranding } from "@/types/settings.types";
import ColorInput from "./ColorInput";
import InputField from "./InputField";
import { Plus } from "lucide-react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentBrand,
  setBranding,
  updateBrandingField,
} from "@/redux/slice/settingsSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import { updateBranding, uploadFavicon, uploadLogo } from "@/service/settings";
import ImageUploader from "@/components/ui/ImageUploader";

const AllBrandList = ({ branding }: { branding: TBranding }) => {
  const currentBranding = useAppSelector(currentBrand);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (branding) {
      dispatch(setBranding(branding));
    }
  }, [branding, dispatch]);

  const handleChange = <K extends keyof TBranding>(
    key: K,
    value: TBranding[K],
  ) => {
    dispatch(updateBrandingField({ key, value }));
  };

  const handleLogoChnage = async (image: File) => {
    const formData = new FormData();
    const toastId = toast.loading("logo uploading", { duration: 3000 });
    if (!image) {
      toast.error("logo is required", { id: toastId, duration: 3000 });
      return;
    }

    formData.append("logo", image);
    try {
      const result = await uploadLogo(formData);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleFaviconChnage = async (image: File) => {
    const formData = new FormData();
    const toastId = toast.loading("favicon uploading", { duration: 3000 });
    if (!image) {
      toast.error("favicon is required", { id: toastId, duration: 3000 });
      return;
    }

    formData.append("favicon", image);
    try {
      const result = await uploadFavicon(formData);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("updating settings...", { duration: 3000 });
    try {
      const result = await updateBranding(
        currentBranding as Partial<TBranding>,
      );
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <PageHeader
        title="System Settings"
        description="Here the settings of the system is available with the custom branding"
      />

      <div className="space-y-8">
        {/* Brand Identity */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Brand Identity</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input
                value={currentBranding.siteName ?? ""}
                onChange={(e) => handleChange("siteName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Font Family</Label>
              <Input
                value={currentBranding.fontFamily ?? ""}
                onChange={(e) => handleChange("fontFamily", e.target.value)}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label>Site Description</Label>
              <Input
                value={currentBranding.siteDescription ?? ""}
                onChange={(e) =>
                  handleChange("siteDescription", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-3 gap-4">
            <ColorInput
              label="Primary"
              value={currentBranding.primaryColor as string}
              onChange={(v) => handleChange("primaryColor", v)}
            />

            <ColorInput
              label="Secondary"
              value={currentBranding.secondaryColor as string}
              onChange={(v) => handleChange("secondaryColor", v)}
            />

            <ColorInput
              label="Accent"
              value={currentBranding.accentColor as string}
              onChange={(v) => handleChange("accentColor", v)}
            />

            <ColorInput
              label="Background"
              value={currentBranding.backgroundColor as string}
              onChange={(v) => handleChange("backgroundColor", v)}
            />

            <ColorInput
              label="Sidebar"
              value={currentBranding.sidebarColor as string}
              onChange={(v) => handleChange("sidebarColor", v)}
            />
          </CardContent>
        </Card>

        {/* Branding Assets */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Brand Assets</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center justify-between">
            <ImageUploader
              image={branding?.logoUrl as string}
              handleChange={handleLogoChnage}
            />
            <ImageUploader
              image={branding?.faviconUrl as string}
              handleChange={handleFaviconChnage}
            />
          </CardContent>
        </Card>

        {/* SEO */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>SEO & Legal</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Meta Description"
              value={currentBranding.metaDescription}
              onChange={(v) => handleChange("metaDescription", v)}
            />

            <InputField
              label="Privacy Policy URL"
              value={currentBranding.privacyPolicyUrl}
              onChange={(v) => handleChange("privacyPolicyUrl", v)}
            />

            <InputField
              label="Terms URL"
              value={currentBranding.termsUrl}
              onChange={(v) => handleChange("termsUrl", v)}
            />
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Support Info</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Support Email"
              value={currentBranding.supportEmail}
              onChange={(v) => handleChange("supportEmail", v)}
            />

            <InputField
              label="Support Phone"
              value={currentBranding.supportPhone}
              onChange={(v) => handleChange("supportPhone", v)}
            />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-end">
          <ButtonComponent
            icon={Plus}
            type="button"
            varient="yellow"
            buttonName="Save Change"
            className="h-10 px-6 rounded-2xl"
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AllBrandList;
