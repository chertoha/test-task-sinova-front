import { FC } from "react";

interface IProps {
 params: Promise<{ id: string }>;
}

const PostPage: FC<IProps> = async ({ params }) => {
 const { id } = await params;

 return <div>posts {id}</div>;
};

export default PostPage;
