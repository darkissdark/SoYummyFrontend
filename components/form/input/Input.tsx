import { InputHTMLAttributes, useState } from "react";

export type InputState = "normal" | "hover" | "warning" | "error" | "correct";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState;
  message?: string;
  icon?: string;
  type?: string;
}

const inputBg = "bg-[#1e1e1e]";
const textClr = "text-white";

const getStateClasses = (currentState: InputState, isHovered: boolean) => {
  let baseClasses =
    "w-full px-4 py-3 rounded-md transition-colors duration-200 border-2 ";
  let iconClasses = "w-5 h-5 transition-colors duration-200";

  switch (currentState) {
    case "error":
      baseClasses += "border-red-500";
      iconClasses += " text-red-500";
      break;
    case "correct":
      baseClasses += "border-green-500";
      iconClasses += " text-green-500";
      break;
    case "warning":
      baseClasses += "border-yellow-500";
      iconClasses += " text-yellow-500";
      break;
    case "normal":
    default:
      if (isHovered) {
        baseClasses += "border-white";
        iconClasses += " text-white";
      } else {
        baseClasses += "border-gray-700";
        iconClasses += " text-gray-700";
      }
      break;
  }

  return {
    inputClasses: `${baseClasses} ${inputBg} ${textClr} focus:outline-none`,
    iconClasses,
    messageClasses: getMessageClasses(currentState),
  };
};

const getMessageClasses = (currentState: InputState) => {
  switch (currentState) {
    case "error":
      return "text-red-500";
    case "correct":
      return "text-green-500";
    case "warning":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

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
  const { inputClasses, iconClasses, messageClasses } = getStateClasses(
    state,
    isHovered
  );

  const Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={iconClasses}
    >
      <use xlinkHref={`/sprite.svg#icon-${icon}`} />
    </svg>
  );

  const StatusIcon = () => {
    switch (state) {
      case "warning":
        // Exclamation Mark
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={iconClasses}
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        // X Mark
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={iconClasses}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "correct":
        // Check Mark
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={iconClasses}
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.842l-4.249 5.253-1.859-1.859a.75.75 0 1 0-1.06 1.06l2.459 2.459a.75.75 0 0 0 1.137-.087l4.89-6Z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div
        className={inputClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-3">
          {icon && <Icon />}

          <input
            type={type}
            className={`flex-grow ${inputBg} ${textClr} focus:outline-none`}
            placeholder={placeholder}
            {...rest}
          />

          <StatusIcon />
        </div>
      </div>

      {message && <p className={`text-sm ml-8 ${messageClasses}`}>{message}</p>}
    </div>
  );
};
