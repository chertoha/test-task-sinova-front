import "./Post.style.css";
import Image from "next/image";
import parse from "html-react-parser";
import { FC } from "react";

import { PostType } from "@/types/entities";
import { createImageApiUrl } from "@/config/url";

interface IProps {
  data: PostType;
}

const Post: FC<IProps> = ({ data: { banner, title, content } }) => {
  return (
    <>
      <article>
        <h1 className="post-heading">{title}</h1>
        <div className="post-image-wrapper">
          <Image
            priority
            className="post-image"
            fill
            src={createImageApiUrl(banner)}
            alt={title}
            sizes="30vw"
            quality={75}
          />
        </div>
        {content && <div className="content">{parse(content)}</div>}
      </article>
    </>
  );
};

export default Post;
