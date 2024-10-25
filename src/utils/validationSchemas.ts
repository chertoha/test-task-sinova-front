import * as Yup from "yup";

export const updatePostValidationSchema = Yup.object()
  .shape({
    title: Yup.string().min(5).max(100).trim(),
    shortDescription: Yup.string().min(30).max(300).trim(),
    content: Yup.string().trim(),
    banner: Yup.string().trim(),
  })
  .required();
