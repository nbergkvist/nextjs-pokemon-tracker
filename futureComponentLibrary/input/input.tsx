import React from "react";

type Props = {
  onChange: any;
  label: string;
  type?: "text" | "email" | "password";
  value?: string;
  name: string;
};

const Input = (props: Props) => {
  const { onChange, label, value, type = "text", name } = props;
  return (
    <div>
      {label && <label className="font-semibold">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border border-black block w-full"
      />
    </div>
  );
};

export default Input;
