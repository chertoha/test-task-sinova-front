"use client";

import { FC, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import EditForm from "./EditForm";
import { PostType } from "@/types/entities";

interface IProps {
  value: string;
  fieldName: string;
  id: string;
  huge?: boolean;
}

export type UpdateFormValues = Partial<Omit<PostType, "_id">>;

const AdminEditField: FC<IProps> = ({ value, fieldName, id, huge }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>();
  const closeEditMode = () => setIsEditMode(false);

  const initialValues: UpdateFormValues = { [fieldName]: value };

  return isEditMode ? (
    <EditForm
      initialValues={initialValues}
      fieldName={fieldName}
      id={id}
      close={closeEditMode}
      huge={huge}
    />
  ) : (
    <div className="flex items-start">
      <button
        type="button"
        aria-label="Edit field"
        onClick={() => setIsEditMode(true)}
        className="edit-pencil"
      >
        <MdOutlineEdit size={18} />
      </button>

      <p className="trim-text-three-row">{value}</p>
    </div>
  );
};

export default AdminEditField;
