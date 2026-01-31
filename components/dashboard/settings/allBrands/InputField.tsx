import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  value?: string | null;
  onChange: (value: string) => void;
};
const InputField = ({ label, value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default InputField;
