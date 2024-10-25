import Link from "next/link";
import { FC } from "react";
import { BsArrowLeft } from "react-icons/bs";

import Post from "@/components/Post";
import ROUTES from "@/config/routes";

import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import Container from "@/components/Container";

interface IProps {
  params: Promise<{ id: string }>;
}

const PostPage: FC<IProps> = async ({ params }) => {
  const { id } = await params;

  const data = await basicFetch<PostType>(`/posts/${id}`);

  if (!data) return null;

  return (
    <Container>
      <Link
        href={ROUTES.HOME}
        className="block mb-6 hover:text-green-600 transition-colors duration-300 ease-in-out"
      >
        <BsArrowLeft size={32} />
      </Link>

      <Post data={data} />
    </Container>
  );
};

export default PostPage;
