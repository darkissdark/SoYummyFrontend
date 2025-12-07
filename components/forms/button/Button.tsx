import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link, { type LinkProps } from "next/link";
import css from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "transparent";

interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  rounded?: boolean;
  color?: string;
  fullWidth?: boolean;
}

interface ButtonAsButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  as?: "button";
}

interface ButtonAsLinkProps
  extends BaseButtonProps,
    Omit<LinkProps, "className" | "children"> {
  as: "link";
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    className = "",
    rounded = false,
    color = "",
    fullWidth = false,
    children,
    ...restProps
  } = props;
  const classes = [css[variant], className].filter(Boolean).join(" ");

  if ("as" in restProps && restProps.as === "link") {
    const { as, ...linkProps } = restProps;
    return (
      <Link
        data-link={as}
        className={`${classes} ${css.button} 
        ${rounded ? css.rounded : ""} 
        ${color ? css[color] : ""}
        ${fullWidth ? css.w100 : ""}`}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${classes} ${css.button} 
      ${rounded ? css.rounded : ""}
      ${color ? css[color] : ""}
      ${fullWidth ? css.w100 : ""}`}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button;
