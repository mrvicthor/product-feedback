import { useId, type ComponentProps } from "react";

type CustomProps = ComponentProps<"textarea"> & {
  heading: string;
  description: string;
  error?: string;
};

const TextareaField = ({
  heading,
  description,
  error,
  ref,
  className,
  ...props
}: CustomProps) => {
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
      <textarea
        ref={ref}
        id={id}
        {...props}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${descriptionId} ${errorId}` : descriptionId}
        rows={4}
        className={`px-4 py-3 w-full mt-4 bg-[#F7F8FD] hover:border cursor-pointer hover:border-[#4661E6] focus:border-[#4661E6] focus:outline-none ${
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

export default TextareaField;
