import "./PostList.style.css";
import { FC } from "react";

import PostCard from "./PostCard";
import { PostType } from "@/types/entities";

interface Iprops {
  list: PostType[];
}

const PostList: FC<Iprops> = ({ list }) => {
  return (
    <ul className="post-list">
      {list.map(post => (
        <li key={post._id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
