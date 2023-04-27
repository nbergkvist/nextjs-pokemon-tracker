import React from "react";

type Props = {
  onClick: () => void;
  text: string;
  type?: "primary" | "default";
  grow?: boolean
};

const Button = (props: Props) => {
  const { onClick, text, type = "primary", grow = false } = props;
  const primaryStyle = "bg-purple text-black"
  return (
    <button onClick={onClick} className={`border rounded h-[42px] ${grow && "grow"} ${type === "primary" && primaryStyle}`}>
      {text}
    </button>
  );
};

export default Button;
