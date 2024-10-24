import { FC } from "react";

interface IProps {
 params: { id: string };
}

const PostPage: FC<IProps> = async ({ params }) => {
 const { id } = await params;

 return <div>posts {id}</div>;
};

export default PostPage;
