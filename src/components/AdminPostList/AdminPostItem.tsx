import "./AdminPostList.style.css";
import Image from "next/image";
import { ChangeEvent, FC } from "react";

import EditBannerButton from "../EditBannerButton";
import AdminEditField from "../AdminEditField";
import DeletePostButton from "../DeletePostButton";

import { createClientImageApiUrl } from "@/config/url";
import { PostType } from "@/types/entities";

interface IProps {
  post: PostType;
  onSelectChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  isCheckboxShown: boolean;
}

const AdminPostItem: FC<IProps> = ({
  post: { _id: id, title, shortDescription, banner, content },
  onSelectChange,
  isCheckboxShown,
}) => {
  return (
    <div className="card">
      {isCheckboxShown && (
        <input type="checkbox" className="card-input" onChange={e => onSelectChange(e, id)} />
      )}

      <div className="card-image-wrapper">
        <Image
          priority
          className="card-image"
          fill
          src={createClientImageApiUrl(banner)}
          alt={title}
          sizes="200px"
          quality={50}
        />

        <div className="card-edit">
          <EditBannerButton id={id} />
        </div>
      </div>

      <div className="card-fields">
        <AdminEditField value={title} fieldName="title" id={id} />
        <AdminEditField value={shortDescription} fieldName="shortDescription" id={id} />
        <AdminEditField value={content || ""} fieldName="content" id={id} huge />
      </div>

      <div className="max-md:mt-4">
        <DeletePostButton id={id} />
      </div>
    </div>
  );
};

export default AdminPostItem;
