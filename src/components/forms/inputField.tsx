import { useId, type ComponentProps } from "react";

type InputFieldProps = ComponentProps<"input"> & {
  heading: string;
  description: string;
  error?: string;
};

const InputField = ({
  heading,
  description,
  error,
  ref,
  className,
  ...props
}: InputFieldProps) => {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="font-bold text-sm capitalize text-[#3A4374]"
      >
        {heading}
      </label>
      <p className="text-sm text-[#647196]">{description}</p>
      <input
        ref={ref}
        id={id}
        {...props}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${descriptionId} ${errorId}` : descriptionId}
        className={`mt-4 w-full cursor-pointer rounded-lg border bg-[#F7F8FD] px-4 py-3 hover:border-[#4661E6] focus:border-[#4661E6] focus:outline-none ${
          error ? "border-red-500" : "border-transparent"
        } ${className ?? ""}`}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
