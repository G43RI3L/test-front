import React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => (
  <input
    className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
    {...props}
  />
);
