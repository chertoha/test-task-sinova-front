"use client";

import "./DeleteBatchButton.style.css";
import { FC, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";

import ROUTES from "@/config/routes";
import FixedLoader from "../UIKit/FixedLoader";
import { deletePostsBatchAction } from "@/actions/deletePostsBatchAction";

interface IProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  ids: string[];
}

const DeleteBatchButton: FC<IProps> = ({ isOpen, open, close, ids }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onConfirmHandler = () => {
    startTransition(async () => {
      const _response = await deletePostsBatchAction({ ids });
      close();
      router.replace(ROUTES.ADMIN);
    });
  };

  return isOpen ? (
    <div className="flex gap-5">
      <FixedLoader isLoading={isPending} />

      <button
        type="button"
        aria-label="Cancel"
        onClick={close}
        className="delete-cancel"
        disabled={isPending}
      >
        <MdClose size={35} />
      </button>

      <button
        type="button"
        aria-label="Confirm delete"
        onClick={onConfirmHandler}
        className="delete-confirm"
        disabled={isPending}
      >
        <FaTrashCan size={26} />
      </button>
    </div>
  ) : (
    <button type="button" className="delete-multiple" onClick={open}>
      Multiple delete
    </button>
  );
};

export default DeleteBatchButton;
