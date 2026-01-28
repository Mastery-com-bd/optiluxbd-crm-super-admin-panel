import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type TSwitcherProps = {
  data: boolean;
  onChange: () => void;
};

const Switcher = ({ data, onChange }: TSwitcherProps) => {
  const [checked, setChecked] = useState<boolean>(data);

  return (
    <Switch
      checked={checked}
      onCheckedChange={(value) => {
        setChecked(value);
        onChange();
      }}
      className={`
        h-7 w-30 py-1 cursor-pointer
        data-[state=unchecked]:bg-white/20
        data-[state=checked]:bg-green-700
        [&>span]:bg-white!
        data-[state=checked]:[&>span]:translate-x-4
      `}
    />
  );
};

export default Switcher;
