import Container from "@/components/Container";
import { createImageApiUrl } from "@/config/url";
import { basicFetch } from "@/helpers/basicFetch";
import { Post } from "@/types/entities";
import Image from "next/image";
import { FC } from "react";

interface IProps {
 params: Promise<{ id: string }>;
}

const PostPage: FC<IProps> = async ({ params }) => {
 const { id } = await params;

 const data = await basicFetch<Post>(`/posts/${id}`);

 if (!data) return null;
 const { _id, banner, title, content } = data;
 return (
  <>
   <Container>
    <article>
     <h1 className="text-4xl font-bold mb-6">{title}</h1>

     <div className="min-h-[400px] max-w-[700px] overflow-hidden relative rounded-2xl">
      <Image
       priority
       className="h-full w-full object-cover"
       fill
       src={createImageApiUrl(banner)}
       alt={title}
       sizes="30vw"
       quality={75}
      />
     </div>
    </article>
   </Container>
  </>
 );
};

export default PostPage;
