"use client";

import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

import AdminEditField from "../AdminEditField";
import EditBannerButton from "../EditBannerButton";
import DeletePostButton from "../DeletePostButton";
import DeleteBatchButton from "../DeleteBatchButton";

import { createClientImageApiUrl } from "@/config/url";
import { PostType } from "@/types/entities";

interface IProps {
  list: PostType[];
}

const AdminPostList: FC<IProps> = ({ list }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setSelected([]);
  };

  const addToSelected = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const isChecked = e.target.checked;
    setSelected(prev => (isChecked ? [...prev, id] : prev.filter(val => val !== id)));
  };

  return (
    <>
      {list.length > 0 ? (
        <>
          <div className="mb-10">
            <DeleteBatchButton isOpen={isOpen} open={open} close={close} ids={selected} />
          </div>
          <ul className="space-y-6 max-w-[800px]">
            {list.map(({ _id: id, banner, title, shortDescription, content }) => (
              <li
                key={id}
                className="border-b border-gray-300 py-5 first:pt-0 last:border-none last:pb-0"
              >
                <div className="md:flex gap-10  relative">
                  {isOpen && (
                    <input
                      type="checkbox"
                      className="w-6 h-6 shrink-0 accent-red-700"
                      onChange={e => addToSelected(e, id)}
                    />
                  )}

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
                    <AdminEditField value={content || ""} fieldName="content" id={id} huge />
                  </div>

                  <div className="">
                    <DeletePostButton id={id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No posts found</p>
      )}
    </>
  );
};

export default AdminPostList;
