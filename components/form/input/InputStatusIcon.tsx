import { InputState } from "./Input";
import { InputIcon } from "./InputIcon";
import { getStatusIconName } from "./inputUtils";

interface InputStatusIconProps {
  state: InputState;
  className: string;
}

export const InputStatusIcon = ({ state, className }: InputStatusIconProps) => {
  const iconName = getStatusIconName(state);

  if (!iconName) {
    return null;
  }

  return <InputIcon iconName={iconName} className={className} />;
};

