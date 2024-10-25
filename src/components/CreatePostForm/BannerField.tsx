import { ChangeEvent, useTransition } from "react";
import { useField } from "formik";
import { IoAddOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

import Image from "next/image";

import { MAX_IMAGE_FILE_SIZE, imageAllowedMIMETypes } from "@/config/images";
import { uploadImageAction } from "@/actions/uploadImageAction";
import { createClientImageApiUrl } from "@/config/url";
import FixedLoader from "../UIKit/FixedLoader";

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

      <div className="h-[250px] w-[250px]  relative">
        {imageName ? (
          <>
            <Image
              priority
              className="h-full w-full object-cover rounded-2xl"
              fill
              src={createClientImageApiUrl(imageName)}
              alt="Banner"
              sizes="200px"
              quality={50}
            />

            <div className="absolute -top-5 -right-5">
              <button type="button" onClick={() => setValue("")}>
                <MdClose size={25} />
              </button>
            </div>
          </>
        ) : (
          <label className="border h-full border-black flex items-center rounded-2xl justify-center cursor-pointer hover:border-green-600 hover:text-green-600 transition-colors duration-300 ease-in-out">
            <IoAddOutline size={60} />
            <input
              type="file"
              hidden
              accept={imageAllowedMIMETypes.join(",")}
              onChange={onBannerChangeHandler}
              disabled={isPending}
            />
          </label>
        )}

        {error && <p className="text-red-600 absolute top-full left-0">{error}</p>}
      </div>
    </>
  );
};

export default BannerField;
