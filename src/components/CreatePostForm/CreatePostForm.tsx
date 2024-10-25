"use client";

import { useState, useTransition } from "react";
import { Formik, FormikHelpers } from "formik";
import { IoAddOutline } from "react-icons/io5";

import Field from "../UIKit/Field";
import BannerField from "./BannerField";

import { PostType } from "@/types/entities";
import { createPostValidationSchema } from "@/utils/validationSchemas";
import { createPostAction } from "@/actions/createPostAction";
import FixedLoader from "../UIKit/FixedLoader";

export type CreateFormValues = Omit<PostType, "_id">;
const initialValues: CreateFormValues = {
  title: "",
  shortDescription: "",
  banner: "",
  content: "",
};

const CreatePostForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onSubmitHandler = (
    values: CreateFormValues,
    { resetForm }: FormikHelpers<CreateFormValues>,
  ) => {
    startTransition(async () => {
      const response = await createPostAction(values);

      if (response.status === "error") {
        alert(response.message);
      }

      resetForm({ values: initialValues });
    });
  };

  return (
    <>
      <FixedLoader isLoading={isPending} />

      {!isOpen && (
        <button
          type="button"
          aria-label="Add post"
          className="border rounded-md text-white bg-green-600 hover:bg-green-500 transition-colors duration-300 ease-in-out"
          onClick={open}
        >
          <IoAddOutline size={28} />
        </button>
      )}

      {isOpen && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
          validationSchema={createPostValidationSchema}
        >
          {({ handleSubmit }) => (
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
                  <button type="button" onClick={close} className="cancel">
                    Cancel
                  </button>
                  <button type="submit" className="submit" disabled={isPending}>
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
