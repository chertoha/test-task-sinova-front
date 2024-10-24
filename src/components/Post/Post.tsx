import Image from "next/image";
import parse from "html-react-parser";
import { FC } from "react";

import Container from "../Container";
import { PostType } from "@/types/entities";
import { createImageApiUrl } from "@/config/url";

interface IProps {
 data: PostType;
}

const Post: FC<IProps> = ({ data: { banner, title, content } }) => {
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
    </article>
   </Container>
  </>
 );
};

export default Post;
