"use client";

import "./AdminPostList.style.css";
import { ChangeEvent, FC, useState } from "react";

import DeleteBatchButton from "../DeleteBatchButton";
import AdminPostItem from "./AdminPostItem";
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

          <ul className="list">
            {list.map(post => (
              <li key={post._id} className="item">
                <AdminPostItem
                  post={post}
                  onSelectChange={addToSelected}
                  isCheckboxShown={isOpen}
                />
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
