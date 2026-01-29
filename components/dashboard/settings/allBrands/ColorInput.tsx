import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};
const ColorInput = ({ label, value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <Input
          type="color"
          value={value ?? "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="w-14 p-1"
        />
        <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
};

export default ColorInput;
