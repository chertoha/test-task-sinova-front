"use client";

import { ChangeEvent, FC } from "react";
import { MdOutlineEdit } from "react-icons/md";

import { updatePostAction } from "@/actions/updatePostAction";
import { uploadImageAction } from "@/actions/uploadImageAction";
import { MAX_IMAGE_FILE_SIZE, imageAllowedMIMETypes } from "@/config/images";

interface IProps {
  id: string;
}

const EditBannerButton: FC<IProps> = ({ id }) => {
  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_FILE_SIZE) {
      alert(`Max file size = ${MAX_IMAGE_FILE_SIZE}B`);
      e.target.value = "";
      return;
    }

    const fileFormData = new FormData();
    fileFormData.append("file", file);
    const uploadResponse = await uploadImageAction(fileFormData);

    if (!uploadResponse.src) {
      return;
    }

    const fieldFormData = new FormData();
    fieldFormData.append("banner", uploadResponse.src);
    const updateResponse = await updatePostAction(id, fieldFormData);
  };

  return (
    <>
      <label aria-label="Edit banner" className="cursor-pointer">
        <MdOutlineEdit />
        <input
          type="file"
          hidden
          accept={imageAllowedMIMETypes.join(",")}
          onChange={onChangeHandler}
        />
      </label>
    </>
  );
};

export default EditBannerButton;
