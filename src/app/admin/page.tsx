import AdminPostList from "@/components/AdminPostList";
import Container from "@/components/Container";
import CreatePostForm from "@/components/CreatePostForm";
import Paginator from "@/components/UIKit/Paginator";
import { ADMIN_API_REQUEST_DEFAULT_LIMIT, ADMIN_API_REQUEST_DEFAULT_PAGE } from "@/config/api";
import ROUTES from "@/config/routes";
import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import { Pageable } from "@/types/responses";
import { FC } from "react";

interface IProps {
  searchParams: Promise<{ page: string | undefined }>;
}

const AdminPage: FC<IProps> = async ({ searchParams }) => {
  const page = (await searchParams)?.page || ADMIN_API_REQUEST_DEFAULT_PAGE;

  const response = await basicFetch<Pageable<PostType>>("/posts", {
    params: { page, limit: ADMIN_API_REQUEST_DEFAULT_LIMIT },
    next: { tags: ["posts"] },
  });

  return (
    <>
      <Container>
        {/* <CreatePostForm /> */}

        {response?.data && (
          <>
            <div className="mt-10">{response?.data && <AdminPostList list={response.data} />}</div>

            <div className="mt-10">
              <Paginator
                route={ROUTES.ADMIN}
                currentPage={Number(page)}
                perPage={ADMIN_API_REQUEST_DEFAULT_LIMIT}
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

export default AdminPage;
