import React, { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  color: 'primary' | 'transparent';
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
  disabled?: boolean;
}

const Button = ({
  color,
  onClick,
  children,
  submit,
  disabled,
}: ButtonProps) => {
  const colorClasses = (() => {
    switch (color) {
      case 'primary':
        return 'bg-primary text-white';
      case 'transparent':
        return 'bg-transparent text-primary';
    }
  })();

  return (
    <button
      className={`w-full inline-block text-center text-sm font-bold min-h-[33px] px-3 py-1 text-base ${colorClasses} rounded-full ${disabled && 'opacity-50'}`}
      onClick={onClick}
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};

export default Button;
