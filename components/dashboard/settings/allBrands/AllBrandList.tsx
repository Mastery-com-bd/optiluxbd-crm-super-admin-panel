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

const AllBrandList = ({ branding }: { branding: TBranding }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <PageHeader
        title="System Settings"
        description="Here the settings of the system is available with the custom branding "
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
              <Input defaultValue={branding?.siteName} />
            </div>

            <div className="space-y-2">
              <Label>Font Family</Label>
              <Input defaultValue={branding?.fontFamily} />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label>Site Description</Label>
              <Input defaultValue={branding?.siteDescription ?? ""} />
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <ColorInput label="Primary" value={branding?.primaryColor} />
            <ColorInput label="Secondary" value={branding?.secondaryColor} />
            <ColorInput label="Accent" value={branding?.accentColor ?? ""} />
            <ColorInput label="Background" value={branding?.backgroundColor} />
            <ColorInput label="Sidebar" value={branding?.sidebarColor} />
          </CardContent>
        </Card>

        {/* Branding Assets */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Brand Assets</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <InputField label="Logo URL" value={branding?.logoUrl} />
            <InputField label="Favicon URL" value={branding?.faviconUrl} />
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
              value={branding?.metaDescription}
            />
            <InputField
              label="Privacy Policy URL"
              value={branding?.privacyPolicyUrl}
            />
            <InputField label="Terms URL" value={branding?.termsUrl} />
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Support Info</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <InputField label="Support Email" value={branding?.supportEmail} />
            <InputField label="Support Phone" value={branding?.supportPhone} />
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-end">
          <ButtonComponent
            icon={Plus}
            type="submit"
            varient="yellow"
            buttonName="Save Change"
            className="h-10 px-6 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AllBrandList;
