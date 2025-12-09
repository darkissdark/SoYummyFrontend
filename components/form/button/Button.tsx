import Link, { type LinkProps } from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "transparent";

const BASE_CLASSES =
  "inline-flex justify-center items-center font-normal leading-[18px] " +
  "px-6 py-3 text-[14px] transition-all duration-250 ease-in-out " +
  "md:px-11 md:py-[22px] md:text-[16px]";

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return (
        "text-[var(--primary-button-color)] bg-[var(--primary-button-background)] " +
        "hover:bg-[var(--primary-button-hover-background)]"
      );
    case "secondary":
      return (
        "text-[var(--secondary-button-color)] border border-[var(--secondary-border-color)] " +
        "hover:border-[var(--secondary-hover-border-color)]"
      );
    case "transparent":
      return (
        "bg-transparent border border-current text-current " +
        "hover:bg-[var(--transparent-button-hover-background)]"
      );
    default:
      return "";
  }
};

interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  rounded?: boolean;
  color?: "green" | "white";
  fullWidth?: boolean;
}

interface ButtonAsButtonProps
  extends BaseButtonProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "children" | "color" | "className"
    > {
  as?: "button";
}

interface ButtonAsLinkProps
  extends BaseButtonProps,
    Omit<LinkProps, "className" | "children"> {
  as: "link";
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    className = "",
    rounded = false,
    color,
    fullWidth = false,
    children,
    ...restProps
  } = props;

  const dynamicClasses = [
    BASE_CLASSES,
    getVariantClasses(variant),
    rounded ? "rounded-[24px_44px]" : "rounded-[6px]",
    color === "green" ? "text-[var(--primary-button-background)]" : "",
    color === "white" ? "text-[var(--primary-button-color)]" : "",
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("as" in restProps && restProps.as === "link") {
    const { as, ...linkProps } = restProps;
    return (
      <Link data-link={as} className={dynamicClasses} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={dynamicClasses}
      {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export default Button;
