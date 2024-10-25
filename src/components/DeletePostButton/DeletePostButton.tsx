"use client";

import "./DeletePostButton.style.css";
import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FaTrashCan } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

import ROUTES from "@/config/routes";
import FixedLoader from "../UIKit/FixedLoader";

import { deletePostAction } from "@/actions/deletePostAction";

interface IProps {
  id: string;
}

const DeletePostButton: FC<IProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const onConfirmHandler = () => {
    startTransition(async () => {
      await deletePostAction(id);
      close();
      router.replace(ROUTES.ADMIN);
    });
  };

  return isOpen ? (
    <div className="flex gap-3">
      <FixedLoader isLoading={isPending} />

      <button
        type="button"
        aria-label="Cancel"
        onClick={close}
        className="delete-cancel"
        disabled={isPending}
      >
        <MdClose size={25} />
      </button>

      <button
        type="button"
        aria-label="Confirm delete"
        onClick={onConfirmHandler}
        className="delete-confirm"
        disabled={isPending}
      >
        <FaTrashCan size={20} />
      </button>
    </div>
  ) : (
    <button type="button" className="delete-one" onClick={open}>
      delete
    </button>
  );
};

export default DeletePostButton;
