import { InputState } from "./Input";

export const STATE_COLORS = {
  error: {
    border: "border-red-500",
    text: "text-red-500",
  },
  correct: {
    border: "border-green-500",
    text: "text-green-500",
  },
  warning: {
    border: "border-yellow-500",
    text: "text-yellow-500",
  },
  normal: {
    border: "border-gray-700",
    text: "text-gray-700",
  },
  hover: {
    border: "border-white",
    text: "text-white",
  },
} as const;

export const BASE_CLASSES = {
  inputContainer:
    "w-full px-4 py-3 rounded-md transition-colors duration-200 border-2",
  icon: "w-5 h-5 transition-colors duration-200",
  inputBg: "bg-[#1e1e1e]",
  textColor: "text-white",
  inputField: "flex-grow bg-[#1e1e1e] text-white focus:outline-none",
  message: "m-0 absolute text-[14px] left-0 top-[calc(100%_+_2px)]",
} as const;

export const STATE_ICON_MAP: Record<
  Exclude<InputState, "normal" | "hover">,
  string
> = {
  warning: "warning",
  error: "error",
  correct: "correct",
} as const;

export const getStateColorClasses = (
  state: InputState,
  isHovered: boolean
): { border: string; text: string } => {
  if (state === "normal") {
    return isHovered ? STATE_COLORS.hover : STATE_COLORS.normal;
  }
  return STATE_COLORS[state];
};

export const getMessageColorClass = (state: InputState): string => {
  if (state === "normal") {
    return "text-gray-500";
  }
  return STATE_COLORS[state].text;
};

export const getStatusIconName = (state: InputState): string | null => {
  if (state === "normal" || state === "hover") {
    return null;
  }
  return STATE_ICON_MAP[state] || null;
};

