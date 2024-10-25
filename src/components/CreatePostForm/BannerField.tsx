import "./CreatePostForm.style.css";
import Image from "next/image";

import { ChangeEvent, useTransition } from "react";
import { useField } from "formik";
import { IoCamera } from "react-icons/io5";
import { MdClose } from "react-icons/md";

import FixedLoader from "../UIKit/FixedLoader";

import { MAX_IMAGE_FILE_SIZE, imageAllowedMIMETypes } from "@/config/images";
import { uploadImageAction } from "@/actions/uploadImageAction";
import { createClientImageApiUrl } from "@/config/url";

const BannerField = () => {
  const [{ value: imageName }, { error }, { setValue, setError }] = useField<string>("banner");
  const [isPending, startTransition] = useTransition();

  const onBannerChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      const files = e.target.files;
      if (!files) return;

      const file = files[0];
      if (!file) return;

      if (file.size > MAX_IMAGE_FILE_SIZE) {
        setError(`Max file size = ${MAX_IMAGE_FILE_SIZE}B`);
        e.target.value = "";
        return;
      }

      const fileFormData = new FormData();
      fileFormData.append("file", file);
      const uploadResponse = await uploadImageAction(fileFormData);

      if (!uploadResponse.src) {
        return;
      }

      setValue(uploadResponse.src);
    });
  };

  return (
    <>
      <FixedLoader isLoading={isPending} />

      <div className="banner-wrapper">
        {imageName ? (
          <>
            <Image
              priority
              className="banner-preview"
              fill
              src={createClientImageApiUrl(imageName)}
              alt="Banner"
              sizes="200px"
              quality={50}
            />

            <div className="banner-clear">
              <button
                type="button"
                onClick={() => setValue("")}
                aria-label="Clear"
                className="clear-button"
              >
                <MdClose size={25} />
              </button>
            </div>
          </>
        ) : (
          <label className="banner-label">
            <IoCamera size={60} />
            <input
              type="file"
              hidden
              accept={imageAllowedMIMETypes.join(",")}
              onChange={onBannerChangeHandler}
              disabled={isPending}
            />
          </label>
        )}

        {error && <p className="banner-error">{error}</p>}
      </div>
    </>
  );
};

export default BannerField;
