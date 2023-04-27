import React from "react";

type Props = {
  onChange: any;
  label: string;
  checked: boolean;
};

const Switch = (props: Props) => {
  const { onChange, label, checked } = props;
  return (
    <>
      {label && <p className="grow">{label}</p>}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-darkbg peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-purple after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple"></div>
      </label>
    </>
  );
};

export default Switch;
