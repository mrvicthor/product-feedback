import { forwardRef, type InputHTMLAttributes } from "react";

type CustomProps = {
  label: string;
  heading: string;
  description: string;
  error?: string;
};

type InputFieldProps = CustomProps & InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, heading, description, error, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={label}
          className="font-bold text-sm capitalize text-[#3A4374]"
        >
          {heading}
        </label>
        <p className="text-sm text-[#647196]">{description}</p>
        <input
          ref={ref}
          id={label}
          {...props}
          aria-invalid={error ? "true" : "false"}
          className={`py-3 px-4 w-full mt-4 bg-[#F7F8FD] hover:border hover:border-[#4661E6] cursor-pointer rounded-lg ${error && "border border-red-500"}`}
        />
        {error && (
          <p role="alert" className="text-xs text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default InputField;
