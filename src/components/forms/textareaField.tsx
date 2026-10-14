import { forwardRef, type TextareaHTMLAttributes } from "react";

type CustomProps = {
  label: string;
  heading: string;
  description: string;
  error?: string;
};

type TextareaFieldProps = CustomProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
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
        <textarea
          ref={ref}
          id={label}
          {...props}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "description-error" : undefined}
          rows={4}
          className={`px-4 py-3 w-full mt-4 bg-[#F7F8FD] hover:border hover:border-[#4661E6] cursor-pointer rounded-lg ${error && "border border-red-500"}`}
        />
        {error && (
          <p
            role="alert"
            id="description-error"
            className="text-red-500 text-xs mt-1"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default TextareaField;
