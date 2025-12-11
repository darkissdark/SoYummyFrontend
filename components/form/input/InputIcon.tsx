interface InputIconProps {
  iconName: string;
  className?: string;
}

export const InputIcon = ({ iconName, className = "" }: InputIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <use xlinkHref={`/sprite.svg#icon-${iconName}`} />
  </svg>
);

