"use client";

import { updatePostAction } from "@/actions/updatePostAction";
import { PostType } from "@/types/entities";
import { updatePostValidationSchema } from "@/utils/validationSchemas";
import { Formik } from "formik";
import { FC, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

interface IProps {
  value: string;
  fieldName: string;
  id: string;
}

type UpdateFormValues = Partial<Omit<PostType, "_id">>;
type UpdateFormValuesKey = keyof UpdateFormValues;

const AdminEditField: FC<IProps> = ({ value, fieldName, id }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>();

  const onSubmitHandler = async (values: { [fieldName: string]: string }) => {
    const data = new FormData();
    data.append(fieldName, values[fieldName].trim());
    const response = await updatePostAction(id, data);

    if (response.status === "error") {
      alert(response.message);
    }

    setIsEditMode(false);
  };

  const initialValues: UpdateFormValues = { [fieldName]: value };

  return isEditMode ? (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={updatePostValidationSchema}
    >
      {({ handleSubmit, getFieldProps, errors }) => (
        <form onSubmit={handleSubmit}>
          <textarea
            className="block w-full max-w-[500px] min-h-[60px] max-h-[100px]"
            {...getFieldProps(fieldName)}
          ></textarea>
          {errors[fieldName as UpdateFormValuesKey] && (
            <p className="text-xs text-red-600">{errors[fieldName as UpdateFormValuesKey]}</p>
          )}

          <button type="button" onClick={() => setIsEditMode(false)}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  ) : (
    <div className="flex items-start">
      <p className="trim-text-three-row">{value}</p>

      <button type="button" aria-label="Edit field" onClick={() => setIsEditMode(true)}>
        <MdOutlineEdit />
      </button>
    </div>
  );
};

export default AdminEditField;
