import { useField } from "formik";
import { FC } from "react";

interface IProps {
  name: string;
  placeholder?: string;
  huge?: boolean;
}

const Field: FC<IProps> = ({ name, placeholder = "Text", huge = false }) => {
  const [props, { error }] = useField(name);

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        className={`input block ${huge ? "h-[150px]" : "h-[60px]"}`}
        {...props}
      ></textarea>
      {error && <p className=" absolute top-full left-0 text-red-600">{error}</p>}
    </div>
  );
};

export default Field;
