import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ColorInput = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-3">
      <Input type="color" defaultValue={value} className="w-14 p-1" />
      <Input defaultValue={value} />
    </div>
  </div>
);

export default ColorInput;
