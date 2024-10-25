"use client";

import { createClientImageApiUrl } from "@/config/url";
import { PostType } from "@/types/entities";
import Image from "next/image";
import { FC } from "react";

import { MdOutlineEdit } from "react-icons/md";
import AdminEditField from "../AdminEditField";

interface IProps {
  list: PostType[];
}

const AdminPostList: FC<IProps> = ({ list }) => {
  return (
    <>
      <ul className="space-y-6">
        {list.map(({ _id: id, banner, title, shortDescription, content }) => (
          <li key={id}>
            <div className="md:flex gap-7 max-w-[800px] ">
              <div className="h-[150px] w-[150px] overflow-hidden relative rounded-xl shrink-0">
                <Image
                  priority
                  className="h-full w-full object-cover"
                  fill
                  src={createClientImageApiUrl(banner)}
                  alt={title}
                  sizes="200px"
                  quality={50}
                />
              </div>

              <div className="space-y-4">
                {/* <p className="trim-text-two-row flex">
                  <button type="button" aria-role="Edit title">
                    <MdOutlineEdit />
                  </button>
                  {title}
                </p> */}
                <AdminEditField value={title} fieldName="title" />
                <AdminEditField value={shortDescription} fieldName="shortDescription" />
                <AdminEditField value={content || ""} fieldName="content" />

                {/* <p className="trim-text-two-row flex">
                  <button type="button" aria-role="Edit short description">
                    <MdOutlineEdit />
                  </button>
                  {shortDescription}
                </p>

                <p className="trim-text-three-row flex">
                  <button type="button" aria-role="Edit content">
                    <MdOutlineEdit />
                  </button>
                  {content}
                </p> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminPostList;
