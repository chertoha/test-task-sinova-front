import { FC } from "react";

import Post from "@/components/Post";
import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";

interface IProps {
 params: Promise<{ id: string }>;
}

const PostPage: FC<IProps> = async ({ params }) => {
 const { id } = await params;

 const data = await basicFetch<PostType>(`/posts/${id}`);

 if (!data) return null;

 return (
  <>
   <Post data={data} />
  </>
 );
};

export default PostPage;
