"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TFeatureData } from "@/types/feature.types";
import { ArrowLeft, Calendar, Layers, Tag } from "lucide-react";
import { useRouter } from "next/navigation";

const FeatureDetails = ({ feature }: { feature: TFeatureData }) => {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
      </div>
      <Card className="bg-[#1A1129] border border-white/10 text-white rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center justify-between">
            <span>{feature?.name}</span>
            <Badge
              variant={feature?.status === "ACTIVE" ? "default" : "secondary"}
            >
              {feature?.status}
            </Badge>
          </CardTitle>
        </CardHeader>

        <Separator className="bg-white/10" />

        <CardContent className="space-y-4 pt-4">
          {/* Slug */}
          <div className="flex items-start gap-3">
            <Tag size={18} className="text-yellow-400 mt-1" />
            <div>
              <p className="text-sm text-gray-400">Slug</p>
              <p className="text-sm font-medium">{feature?.slug}</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            <Layers size={18} className="text-blue-400 mt-1" />
            <div>
              <p className="text-sm text-gray-400">Description</p>
              <p className="text-sm leading-relaxed text-gray-200">
                {feature?.description}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-green-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Created At</p>
                <p className="text-sm">
                  {new Date(feature?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-purple-400 mt-1" />
              <div>
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-sm">
                  {new Date(feature?.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureDetails;
