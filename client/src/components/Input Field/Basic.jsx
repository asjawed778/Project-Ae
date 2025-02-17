import clsx from "clsx";
import { forwardRef } from "react";

const Basic = forwardRef(
  (
    {
      id,
      type,
      placeholder,
      className,
      variantClasses,
      onChange = () => {},
      ...rest
    },
    ref
  ) => {
    return (
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          "px-4 py-2 border border-gray-300 rounded-md outline-none",
          variantClasses?.variant || variantClasses?.default,
          className
        )}
        ref={ref} // Attach ref for React Hook Form
        {...rest}
      />
    );
  }
);

export default Basic;

/*

      <InputField
        id="pdf"
        type="pdf"
        placeholder={"Enter PDF"}
        {...register("pdf")}
      >
        Select PDF
      </InputField>

      <InputField
        id="image"
        type="image"
        placeholder={"Enter Image"}
        {...register("image")}
      >
        Select Image
      </InputField>

*/
