import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import ROUTES from "@/config/routes";

import { createImageApiUrl } from "@/config/url";
import { basicFetch } from "@/helpers/basicFetch";
import { Post } from "@/types/entities";
import { Pageable } from "@/types/responses";

const Home = async () => {
 const response = await basicFetch<Pageable<Post>>("/posts");
 console.log(response);

 return (
  <>
   <Container>
    <h1 className="text-4xl mb-8">Posts</h1>

    {response?.data && (
     <ul className="grid grid-cols-[repeat(auto-fit,minmax(230px,2fr))] gap-[20px]">
      {response.data.map(({ _id: id, title, banner, shortDescription }) => (
       <li key={id} className="">
        <Link
         href={`${ROUTES.POSTS}/${id}`}
         className="block hover:scale-105 transition-transform ease-in-out duration-300"
        >
         <article className="p-3 rounded-xl border flex flex-col h-[430px] shadow-md bg-white">
          <div className="h-[250px] overflow-hidden relative rounded-md">
           <Image
            priority
            className="h-full w-full object-cover"
            fill
            src={createImageApiUrl(banner)}
            alt={title}
            sizes="(max-width: 768px) 800px, (max-width: 1440px) 500px, 800px"
            quality={75}
           />
          </div>

          <div className="flex flex-col flex-grow justify-between">
           <h2 className="trim-text-two-row mt-3 font-bold">{title}</h2>
           <p className="trim-text-three-row mt-4 ">{shortDescription}</p>
          </div>
         </article>
        </Link>
       </li>
      ))}
      <li></li>
     </ul>
    )}
   </Container>
  </>
 );
};

export default Home;
