import Container from "@/components/Container";
import { createImageApiUrl } from "@/config/url";
import { basicFetch } from "@/helpers/basicFetch";
import { Post } from "@/types/entities";
import Image from "next/image";
import { FC } from "react";
import parse from "html-react-parser";
import Link from "next/link";

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
     <div className="min-h-[400px] max-w-[700px] overflow-hidden relative rounded-2xl mb-6">
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
     {content && <div className="content">{parse(content)}</div>}
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad deleniti aperiam sunt dignissimos
     doloremque cumque nisi. Voluptates saepe consequuntur magni iure, nam odit optio, eum obcaecati
     ratione vero rerum. Totam autem porro fuga, veniam aut dignissimos nemo esse molestias corporis
     velit, deserunt rem qui est ab libero veritatis labore ad hic reprehenderit quos dolorem.
     Impedit a magni maxime saepe vitae porro fugiat. Sapiente animi at reiciendis sit temporibus
     consequuntur nobis voluptate porro nam vitae. Minima autem architecto consequuntur eum quo
     mollitia animi velit cum. Consectetur reprehenderit delectus nesciunt molestiae, ad ducimus est
     maiores vero, iusto atque corrupti, voluptatem quidem perspiciatis.
    </article>
   </Container>
  </>
 );
};

export default PostPage;
