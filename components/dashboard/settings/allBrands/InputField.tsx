import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputField = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input defaultValue={value ?? ""} />
    </div>
  );
};

export default InputField;
