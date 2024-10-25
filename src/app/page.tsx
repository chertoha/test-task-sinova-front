import Container from "@/components/Container";
import PostList from "@/components/PostList";
import Paginator from "@/components/UIKit/Paginator";
import { API_REQUEST_DEFAULT_LIMIT, API_REQUEST_DEFAULT_PAGE } from "@/config/api";
import ROUTES from "@/config/routes";

import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import { Pageable } from "@/types/responses";
import { FC } from "react";

interface IProps {
  searchParams: Promise<{ page: string | undefined }>;
}

const Home: FC<IProps> = async ({ searchParams }) => {
  const page = (await searchParams)?.page || API_REQUEST_DEFAULT_PAGE;

  const response = await basicFetch<Pageable<PostType>>("/posts", {
    params: { page, limit: API_REQUEST_DEFAULT_LIMIT },
  });
  console.log(response);

  return (
    <>
      <Container>
        <h1 className="text-4xl mb-8">Posts</h1>

        {response?.data && (
          <>
            <PostList list={response.data} />

            <div className="mt-10">
              <Paginator
                route={ROUTES.HOME}
                currentPage={Number(page)}
                perPage={API_REQUEST_DEFAULT_LIMIT}
                totalItems={response.totalElements}
                nearbyQtyPages={1}
              />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
