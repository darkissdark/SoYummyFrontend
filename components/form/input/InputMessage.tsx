import { InputState } from "./Input";
import { getMessageColorClass, BASE_CLASSES } from "./inputUtils";

interface InputMessageProps {
  message: string;
  state: InputState;
}

export const InputMessage = ({ message, state }: InputMessageProps) => {
  const colorClass = getMessageColorClass(state);

  return <p className={`${BASE_CLASSES.message} ${colorClass}`}>{message}</p>;
};
