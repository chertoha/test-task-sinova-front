import "./PostList.style.css";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import ROUTES from "@/config/routes";
import { createImageApiUrl } from "@/config/url";
import { PostType } from "@/types/entities";

interface IProps {
  post: PostType;
}

const PostCard: FC<IProps> = ({ post: { _id: id, title, shortDescription, banner } }) => {
  return (
    <Link href={`${ROUTES.POSTS}/${id}`} className="post-card-link">
      <article className="post-card-article">
        <div className="post-card-image-wrapper">
          <Image
            priority
            className="post-card-image"
            fill
            src={createImageApiUrl(banner)}
            alt={title}
            sizes="(max-width: 768px) 800px, (max-width: 1440px) 500px, 800px"
            quality={75}
          />
        </div>

        <div className="post-card-meta">
          <h2 className="post-card-title trim-text-two-row">{title}</h2>
          <p className="post-card-description trim-text-three-row">{shortDescription}</p>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
