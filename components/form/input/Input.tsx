import { InputHTMLAttributes, useState } from "react";
import { InputIcon } from "./InputIcon";
import { InputStatusIcon } from "./InputStatusIcon";
import { InputMessage } from "./InputMessage";
import { getStateColorClasses, BASE_CLASSES } from "./inputUtils";

export type InputState = "normal" | "hover" | "warning" | "error" | "correct";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState;
  message?: string;
  icon?: string;
  type?: string;
}

export const Input = ({
  state = "normal",
  message,
  className = "",
  type = "text",
  placeholder = "",
  icon = "",
  ...rest
}: InputProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { border, text } = getStateColorClasses(state, isHovered);

  const containerClasses = `${BASE_CLASSES.inputContainer} ${border} ${BASE_CLASSES.inputBg} ${BASE_CLASSES.textColor} focus:outline-none`;
  const iconClasses = `${BASE_CLASSES.icon} ${text}`;

  return (
    <div className={`flex flex-col relative ${className}`}>
      <div
        className={containerClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-3">
          {icon && <InputIcon iconName={icon} className={iconClasses} />}
          <input
            type={type}
            className={BASE_CLASSES.inputField}
            placeholder={placeholder}
            {...rest}
          />
          <InputStatusIcon state={state} className={iconClasses} />
        </div>
      </div>

      {message && <InputMessage message={message} state={state} />}
    </div>
  );
};
