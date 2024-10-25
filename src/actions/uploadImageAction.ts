"use server";

import { basicFetch } from "@/helpers/basicFetch";
import { ResponseError } from "@/helpers/responseErrors";
import { UploadFileResponse } from "@/types/responses";

export type UploadImageActionresponse = {
  error: boolean;
  message?: string;
  src?: string;
};

export const uploadImageAction = async (formData: FormData): Promise<UploadImageActionresponse> => {
  let message = "Something went wrong";

  try {
    const response = await basicFetch<UploadFileResponse>(`/files/image`, {
      method: "POST",
      body: formData,
    });

    if (!response || !response.src) throw new Error(message);

    return { error: false, src: response.src };
  } catch (error) {
    if (error instanceof ResponseError) {
      message = error.message;
    }
    return { error: true, message };
  }
};
