// "use client";

import { createClientImageApiUrl } from "@/config/url";
import { PostType } from "@/types/entities";
import Image from "next/image";
import { FC } from "react";

import { MdOutlineEdit } from "react-icons/md";
import AdminEditField from "../AdminEditField";
import EditBannerButton from "../EditBannerButton";
import DeletePostButton from "../DeletePostButton";

interface IProps {
  list: PostType[];
}

const AdminPostList: FC<IProps> = ({ list }) => {
  return (
    <>
      <ul className="space-y-6 max-w-[800px]">
        {list.map(({ _id: id, banner, title, shortDescription, content }) => (
          <li
            key={id}
            className="border-b border-gray-300 py-5 first:pt-0 last:border-none last:pb-0"
          >
            <div className="md:flex gap-10  relative">
              <div className="h-[150px] w-[150px] relative shrink-0 ">
                <Image
                  priority
                  className="h-full w-full object-cover rounded-xl"
                  fill
                  src={createClientImageApiUrl(banner)}
                  alt={title}
                  sizes="200px"
                  quality={50}
                />

                <div className="absolute -top-4 -right-4">
                  <EditBannerButton id={id} />
                </div>
              </div>

              <div className="space-y-4 grow">
                <AdminEditField value={title} fieldName="title" id={id} />
                <AdminEditField value={shortDescription} fieldName="shortDescription" id={id} />
                <AdminEditField value={content || ""} fieldName="content" id={id} />
              </div>

              <div className="">
                <DeletePostButton id={id} />
                {/* <button
                  type="button"
                  className="border rounded-md border-red-600 py-1 px-4 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
                >
                  delete
                </button> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminPostList;
