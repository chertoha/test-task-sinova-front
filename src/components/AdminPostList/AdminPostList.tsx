"use client";

import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";

import AdminEditField from "../AdminEditField";
import EditBannerButton from "../EditBannerButton";
import DeletePostButton from "../DeletePostButton";

import { createClientImageApiUrl } from "@/config/url";
import { PostType } from "@/types/entities";

import { FaTrashCan } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { deletePostsBatchAction } from "@/actions/deletePostsBatchAction";

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

  const onConfirmHandler = async () => {
    const response = await deletePostsBatchAction({ ids: selected });
    console.log("response", response);

    close();
  };

  return (
    <>
      <div className="mb-10">
        {isOpen ? (
          <div className="flex gap-6">
            <button
              type="button"
              aria-label="Cancel"
              onClick={close}
              className="hover:scale-125 transition-transform duration-300 ease-in-out"
            >
              <MdClose size={35} />
            </button>

            <button
              type="button"
              aria-label="Confirm delete"
              onClick={onConfirmHandler}
              className="hover:scale-125 transition-transform duration-300 ease-in-out"
            >
              <FaTrashCan size={30} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="border rounded-md border-red-600 py-2 px-3 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
            onClick={open}
          >
            Multiple delete
          </button>
        )}
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
                <AdminEditField value={content || ""} fieldName="content" id={id} />
              </div>

              <div className="">
                <DeletePostButton id={id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminPostList;
