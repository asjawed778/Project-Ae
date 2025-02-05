import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] px-5 py-2 rounded-t-md cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
