export const setValuesToFormData = (values: {
  [key: string]: string | boolean;
}): FormData => {
  const formData = new FormData();
  Object.keys(values).forEach(key =>
    formData.append(key, values[key].toString())
  );
  return formData;
};
