import { FC } from "react";
import { MdClose } from "react-icons/md";
import { deletePostsBatchAction } from "@/actions/deletePostsBatchAction";

import { FaTrashCan } from "react-icons/fa6";

interface IProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  ids: string[];
}

const DeleteBatchButton: FC<IProps> = ({ isOpen, open, close, ids }) => {
  const onConfirmHandler = async () => {
    const response = await deletePostsBatchAction({ ids });
    close();
  };

  return isOpen ? (
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
  );
};

export default DeleteBatchButton;
