import { twMerge } from "tailwind-merge";

import React, { ButtonHTMLAttributes } from "react";

// Define the props for your button component
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional custom props you need
  customProp?: string;
  variaant?: "outline" | "contained";
}

export const Button: React.FC<CustomButtonProps> = ({
  customProp,
  ...props
}) => {
  const variantStyle =
    props.variaant === "outline" ? "btn-outline text-primary" : "btn-primary";
  return (
    <button
      className={twMerge(
        "btn btn-primary btn-md text-white rounded-full",
        props.className,
        variantStyle
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
