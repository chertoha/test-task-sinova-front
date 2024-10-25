import * as Yup from "yup";

const TITLE_MIN_LENGTH = 5;
const TITLE_MAX_LENGTH = 100;
const SHORT_DESCRIPTION_MIN_LENGTH = 30;
const SHORT_DESCRIPTION_MAX_LENGTH = 300;

export const updatePostValidationSchema = Yup.object()
  .shape({
    title: Yup.string().min(TITLE_MIN_LENGTH).max(TITLE_MAX_LENGTH).trim(),
    shortDescription: Yup.string()
      .min(SHORT_DESCRIPTION_MIN_LENGTH)
      .max(SHORT_DESCRIPTION_MAX_LENGTH)
      .trim(),
    content: Yup.string().trim(),
    banner: Yup.string().trim(),
  })
  .required();

export const createPostValidationSchema = Yup.object()
  .shape({
    title: Yup.string().min(TITLE_MIN_LENGTH).max(TITLE_MAX_LENGTH).required().trim(),
    shortDescription: Yup.string()
      .min(SHORT_DESCRIPTION_MIN_LENGTH)
      .max(SHORT_DESCRIPTION_MAX_LENGTH)
      .required()
      .trim(),
    content: Yup.string().trim(),
    banner: Yup.string().required().trim(),
  })
  .required();
