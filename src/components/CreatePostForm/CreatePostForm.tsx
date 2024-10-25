"use client";

import { uploadImageAction } from "@/actions/uploadImageAction";
import { MAX_IMAGE_FILE_SIZE, imageAllowedMIMETypes } from "@/config/images";
import { PostType } from "@/types/entities";
import { createPostValidationSchema } from "@/utils/validationSchemas";
import { Formik, FormikHelpers } from "formik";
import { ChangeEvent, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import BannerField from "./BannerField";
import { createPostAction } from "@/actions/createPostAction";
import { setValuesToFormData } from "@/utils/setValuesToFormData";
import Field from "../UIKit/Field";

export type CreateFormValues = Omit<PostType, "_id">;

const initialValues: CreateFormValues = {
  title: "title-1",
  shortDescription:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, atque, rem unde autem doloremque neque omnis alias porro deleniti velit incidunt natus corporis? Deserunt, itaque.",
  banner: "",
  content: "atus corporis? Deser",
};

const CreatePostForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onSubmitHandler = async (
    values: CreateFormValues,
    { resetForm }: FormikHelpers<CreateFormValues>,
  ) => {
    const response = await createPostAction(values);

    if (response.status === "error") {
      alert(response.message);
    }

    resetForm({ values: initialValues });
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          aria-label="Add post"
          className="border rounded-md text-white bg-green-600 hover:bg-green-500 transition-colors duration-300 ease-in-out"
          onClick={open}
        >
          <IoAddOutline size={40} />
        </button>
      )}

      {isOpen && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
          validationSchema={createPostValidationSchema}
        >
          {({ handleSubmit, getFieldProps, errors }) => (
            <form onSubmit={handleSubmit} className="md:flex gap-10 max-w-[800px]">
              <div className="shrink-0">
                <BannerField />
              </div>

              <div className="w-full">
                <Field name="title" placeholder="Title" />

                <div className="mt-8">
                  <Field name="shortDescription" placeholder="Short description" />
                </div>

                <div className="mt-8 [&>div>textarea]:h-[100px]">
                  <Field name="content" placeholder="Content" />
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={close}
                    className="border border-red-600 px-4 py-1 rounded-md text-red-600  hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="border bg-green-600 px-4 py-1 rounded-md text-white hover:bg-green-500 transition-colors duration-300 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default CreatePostForm;
