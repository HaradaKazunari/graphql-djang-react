import clsx from "clsx";
import { getRandomKey } from "@/utils/variable";

const variants = {
  primary: {
    input:
      "checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500",
    label: "peer-checked:border-blue-500 peer-checked:before:bg-blue-500",
  },
  danger: {
    input:
      "checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500",
    label: "peer-checked:border-red-500 peer-checked:before:bg-red-500",
  },
  info: {
    input:
      "checked:bg-green-500 peer-checked:border-green-500 peer-checked:before:bg-green-500",
    label: "peer-checked:border-green-500 peer-checked:before:bg-green-500",
  },
};

const sizes = {
  md: {
    input: "w-8 h-4 ",
    label: "h-5 w-5 ",
  },
};

export type SwitchProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  disabled?: boolean;
  defaultChecked?: boolean;
};

export const Switch = ({
  variant = "primary",
  size = "md",
  disabled = false,
  ...props
}: SwitchProps) => {
  const id = getRandomKey();
  return (
    <>
      <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
        <input
          id={id}
          defaultChecked
          type="checkbox"
          disabled={disabled}
          className={clsx([
            "absolute transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100",
            variants[variant].input,
            sizes[size].input,
          ])}
          {...props}
        />
        <label
          htmlFor={id}
          className={clsx([
            "before:content[''] absolute top-2/4 -left-1 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full ",
            variants[variant].label,
            sizes[size].label,
          ])}
        >
          <div
            className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
            data-ripple-dark="true"
          ></div>
        </label>
      </div>
    </>
  );
};
