import React from "react";

interface PillProps {
  children: React.ReactNode;
}

const Pill = ({ children }: PillProps) => {

  return (
    <div
      className={`mx-auto rounded-full bg-primary w-min px-4 py-1 text-xs font-normal text-white`}
    >
      {children}
    </div>
  );
};

export default Pill;
