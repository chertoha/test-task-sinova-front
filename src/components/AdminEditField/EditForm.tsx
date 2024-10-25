import { FC } from "react";
import { Formik } from "formik";

import Field from "../UIKit/Field";

import { UpdateFormValues } from "./AdminEditField";
import { updatePostAction } from "@/actions/updatePostAction";
import { updatePostValidationSchema } from "@/utils/validationSchemas";

interface IProps {
  initialValues: UpdateFormValues;
  fieldName: string;
  id: string;
  close: () => void;
  huge?: boolean;
}

const EditForm: FC<IProps> = ({ initialValues, fieldName, id, close, huge }) => {
  const onSubmitHandler = async (values: { [fieldName: string]: string }) => {
    const data = new FormData();
    data.append(fieldName, values[fieldName].trim());
    const response = await updatePostAction(id, data);

    if (response.status === "error") {
      alert(response.message);
    }

    close();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={updatePostValidationSchema}
      validateOnChange
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="">
            <Field name={fieldName} huge={huge} />
          </div>

          <div className="mt-8 flex gap-4">
            <button type="button" onClick={close} className="cancel">
              Cancel
            </button>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditForm;
