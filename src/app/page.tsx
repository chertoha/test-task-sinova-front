import Container from "@/components/Container";
import PostList from "@/components/PostList";

import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import { Pageable } from "@/types/responses";

const Home = async () => {
 const response = await basicFetch<Pageable<PostType>>("/posts");
 console.log(response);

 return (
  <>
   <Container>
    <h1 className="text-4xl mb-8">Posts</h1>

    {response?.data && <PostList list={response.data} />}
   </Container>
  </>
 );
};

export default Home;
