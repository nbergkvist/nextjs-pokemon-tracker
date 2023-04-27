import React from "react";

type Props = {
  onChange: any;
  label?: string;
  type?: "text" | "email" | "password";
  value?: string;
  name: string;
  placeholder?: string;
};

const Input = (props: Props) => {
  const { onChange, label, value, type = "text", name, placeholder } = props;
  return (
    <div>
      {label && <label className="font-semibold">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded block w-full bg-darkbg border-purple text-sm p-2"
        style={{ color: "#ffffff", outline: "none" }}
      />
    </div>
  );
};

export default Input;
