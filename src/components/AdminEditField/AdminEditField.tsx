"use client";

import { FC, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

interface IProps {
  value: string;
  fieldName: string;
}

const AdminEditField: FC<IProps> = ({ value, fieldName }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>();

  return isEditMode ? (
    <form>
      <textarea
        name={fieldName}
        value={value}
        className="block w-full max-w-[500px] min-h-[60px] max-h-[100px]"
      ></textarea>

      <button type="button" onClick={() => setIsEditMode(false)}>
        Cancel
      </button>
      <button type="submit">Submit</button>
    </form>
  ) : (
    <div className=" flex">
      <button type="button" aria-label="Edit field" onClick={() => setIsEditMode(true)}>
        <MdOutlineEdit />
      </button>
      <p className="trim-text-three-row">{value}</p>
    </div>
  );
};

export default AdminEditField;
