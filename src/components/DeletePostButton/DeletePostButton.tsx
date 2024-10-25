"use client";

import { FC, useState, useTransition } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

import { deletePostAction } from "@/actions/deletePostAction";
import FixedLoader from "../UIKit/FixedLoader";

interface IProps {
  id: string;
}

const DeletePostButton: FC<IProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onConfirmHandler = () => {
    startTransition(async () => {
      await deletePostAction(id);
      close();
    });
  };

  return isOpen ? (
    <div className="flex gap-3">
      <FixedLoader isLoading={isPending} />

      <button
        type="button"
        aria-label="Cancel"
        onClick={close}
        className="hover:scale-125 transition-transform duration-300 ease-in-out"
        disabled={isPending}
      >
        <MdClose size={25} />
      </button>

      <button
        type="button"
        aria-label="Confirm delete"
        onClick={onConfirmHandler}
        className="hover:scale-125 transition-transform duration-300 ease-in-out"
        disabled={isPending}
      >
        <FaTrashCan size={20} />
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="border rounded-md border-red-600 py-1 px-4 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
      onClick={open}
    >
      delete
    </button>
  );
};

export default DeletePostButton;
